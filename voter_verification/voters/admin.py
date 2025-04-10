from django.contrib import admin
from .models import Voter

class VoterAdmin(admin.ModelAdmin):
    list_display = ('name', 'voter_id', 'birth_date', 'has_voted')
    search_fields = ('name', 'voter_id')

admin.site.register(Voter, VoterAdmin)
