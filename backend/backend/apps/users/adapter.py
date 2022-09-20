
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.core.exceptions import FieldDoesNotExist,ValidationError
from django.contrib.auth import get_user_model
from allauth.account import app_settings, signals
from allauth.account.utils import user_email, user_field, user_username
class SocialAdapter(DefaultSocialAccountAdapter):

    def populate_user(self,
                  request,
                  sociallogin,
                  data):
       
        
        first_name = data.get("first_name")
        last_name = data.get("last_name")
       
        name = data.get("name")
        username = name
        email = name
        user = sociallogin.user
        
        user_username(user, username)
        user_email(user, (email))
        name_parts = (name or "").partition(" ")
        user_field(user, "first_name", first_name or name_parts[0])
        user_field(user, "last_name", last_name or name_parts[2])
        return user
    