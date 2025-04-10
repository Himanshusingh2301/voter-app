import qrcode
from io import BytesIO
import base64
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Voter
from .serializers import VoterSerializer

# ✅ Voter Registration View (with QR Code Generation)
class VoterCreateView(generics.CreateAPIView):
    queryset = Voter.objects.all()
    serializer_class = VoterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            voter = serializer.save()

            # Generate QR data (voter ID, name, birth date)
            qr_data = f"{voter.voter_id},{voter.name},{voter.birth_date}"

            # Generate QR Code
            qr = qrcode.make(qr_data)
            buffer = BytesIO()
            qr.save(buffer, format="PNG")
            qr_base64 = base64.b64encode(buffer.getvalue()).decode()

            return Response({
                "message": "Voter registered successfully",
                "voter_id": voter.voter_id,
                "qr_code": qr_base64  # Base64 encoded QR code
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ Admin View to List All Voters
class VoterListView(generics.ListAPIView):
    queryset = Voter.objects.all()
    serializer_class = VoterSerializer


# ✅ Verify Voter via QR Code and return full details
@api_view(['POST'])
def verify_voter(request):
    qr_data = request.data.get('qr_data')

    if not qr_data:
        return Response({'error': 'QR data is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        qr_parts = qr_data.split(',')
        voter_id = qr_parts[0]  # Extract voter ID

        voter = Voter.objects.get(voter_id=voter_id)

        already_voted = voter.has_voted

        if not already_voted:
            voter.has_voted = True
            voter.save()

        return Response({
            "name": voter.name,
            "birth_date": voter.birth_date,
            "voter_id": voter.voter_id,
            "has_voted": already_voted,
            "image": voter.image.url if voter.image else None
        }, status=status.HTTP_200_OK)

    except Voter.DoesNotExist:
        return Response({'error': 'Voter not found'}, status=status.HTTP_404_NOT_FOUND)
    except IndexError:
        return Response({'error': 'Invalid QR data format'}, status=status.HTTP_400_BAD_REQUEST)


# ✅ Voter Login using Voter ID (returns full info + QR as base64)
@api_view(['POST'])
def voter_login(request):
    voter_id = request.data.get('voter_id')

    if not voter_id:
        return Response({'error': 'Voter ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        voter = Voter.objects.get(voter_id=voter_id)

        # Generate QR Code again for display
        qr_data = f"{voter.voter_id},{voter.name},{voter.birth_date}"
        qr = qrcode.make(qr_data)
        buffer = BytesIO()
        qr.save(buffer, format="PNG")
        qr_base64 = base64.b64encode(buffer.getvalue()).decode()

        return Response({
            "name": voter.name,
            "birth_date": voter.birth_date,
            "voter_id": voter.voter_id,
            "has_voted": voter.has_voted,
            "image": voter.image.url if voter.image else None,
            "qr_code": qr_base64
        }, status=status.HTTP_200_OK)

    except Voter.DoesNotExist:
        return Response({'error': 'Voter not found'}, status=status.HTTP_404_NOT_FOUND)
