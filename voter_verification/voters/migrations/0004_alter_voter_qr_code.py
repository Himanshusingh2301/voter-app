# Generated by Django 5.1.1 on 2025-04-04 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voters', '0003_voter_qr_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='voter',
            name='qr_code',
            field=models.ImageField(blank=True, null=True, upload_to='qrcodes/'),
        ),
    ]
