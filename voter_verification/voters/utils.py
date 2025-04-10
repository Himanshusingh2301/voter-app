import qrcode
from io import BytesIO
from django.core.files.base import ContentFile

def generate_qr_code(data):
    qr = qrcode.make(data)
    qr_io = BytesIO()
    qr.save(qr_io, format='PNG')
    return ContentFile(qr_io.getvalue(), name=f"{data}.png")
