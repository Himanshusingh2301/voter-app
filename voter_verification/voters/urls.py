from django.urls import path
from .views import VoterCreateView, VoterListView, verify_voter,voter_login

urlpatterns = [
    path('add-voter/', VoterCreateView.as_view(), name='add-voter'),
    path('voters/', VoterListView.as_view(), name='voter-list'),
    path('verify-voter/', verify_voter, name='verify-voter'),
    path('voter-login/', voter_login, name='voter-login'), 
]
