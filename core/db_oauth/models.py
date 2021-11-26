from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.core.exceptions import ValidationError
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
# from nordalclient.models import Site

class UserManager(BaseUserManager):
    """
    custom user manager for  user
    this user manager is responsible for all
    CRUD operation over custom user models
    """

    def create_user(self, username=None, email=None, password=None):
        if not username or username is None:
            raise ValidationError("User must have username")
        if not email or email is None:
            raise ValidationError("User must have email address")
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(username=username,
                                email=email,
                                password=password)
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class platform_User(AbstractBaseUser, PermissionsMixin):
    """
    parent class for all users in  application
    """
    email = models.EmailField(max_length=255, null=False, blank=False,
                              unique=True, db_index=True)
    username = models.CharField(max_length=255, null=False,
                                blank=False, unique=True, db_index=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    modified = models.DateTimeField(auto_now=True, null=True, blank=True)
    service_admin = models.BooleanField(null=True, blank=True, default=False)
    # sites = models.ManyToManyField(Site, related_name="nordal_users")
    objects = UserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']


    def __str__(self):
        if self.is_staff or self.is_superuser:
            return self.username
        return self.email or '<anonymous>'

    def get_username(self):
        return self.email

    def get_short_name(self):
        if self.first_name:
            return self.first_name
        else:
            return self.email

    def get_full_name(self):
        if self.first_name and self.last_name:
            return "%s %s" % (self.first_name, self.last_name)
        else:
            return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def display_name(self):
        if self.first_name:
            return self.first_name
        else:
            return self.email


    def validate_unique(self, exclude=None):
        """
        Since the email address is used as the primary identifier, we must ensure that it is
        unique. However, since this constraint only applies to active users, it can't be done
        through a field declaration via a database UNIQUE index.

        Inactive users can't login anyway, so we don't need a unique constraint for them.
        """
        super(platform_User, self).validate_unique(exclude)
        if self.email and get_user_model().objects.exclude(id=self.id).filter(is_active=True,
                                                                              email__exact=self.email).exists():
            msg = _("A customer with the e-mail address ‘{email}’ already exists.")
            raise ValidationError({'email': msg.format(email=self.email)})
    class Meta:
        db_table = 'db_oauth'
        app_label = 'db_oauth'
        verbose_name = 'platform User'
        verbose_name_plural = 'platform Users'
        swappable = 'AUTH_USER_MODEL'