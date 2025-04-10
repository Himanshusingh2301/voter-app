from rest_framework import serializers
from .models import Voter

class VoterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voter
        fields = ['id', 'voter_id', 'name', 'birth_date', 'image', 'qr_data', 'has_voted']
        read_only_fields = ['voter_id', 'qr_data', 'has_voted']  # Prevent modification
