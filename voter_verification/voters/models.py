import uuid
import qrcode
from io import BytesIO
from django.db import models
from django.core.files.base import ContentFile

class Voter(models.Model):
    voter_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)  # Unique voter ID
    name = models.CharField(max_length=255)
    birth_date = models.DateField()
    image = models.ImageField(upload_to='voter_images/', blank=True, null=True)  # Store voter image
    qr_data = models.CharField(max_length=500, unique=True, blank=True, null=True)  # QR code data
    qr_code = models.ImageField(upload_to='qrcodes/', blank=True, null=True)  # Store QR code image
    has_voted = models.BooleanField(default=False)  # Track if voter has voted

    def generate_qr_code(self):
        """Generate and store the QR code image."""
        qr = qrcode.make(self.qr_data)
        qr_io = BytesIO()
        qr.save(qr_io, format="PNG")
        filename = f"qr_{self.voter_id}.png"
        self.qr_code.save(filename, ContentFile(qr_io.getvalue()), save=False)

    def save(self, *args, **kwargs):
        """Generate QR data and QR code if missing before saving."""
        if not self.qr_data:
            self.qr_data = f"{self.voter_id}|{self.name}|{self.birth_date}"

        if not self.qr_code:  # Generate QR only if missing
            self.generate_qr_code()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.voter_id}"
