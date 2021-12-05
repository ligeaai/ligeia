# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from db_oauth import models
from django import forms
from django.contrib.auth.admin import UserAdmin as ligeiaBaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField


class ligeiaUserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation',
                                widget=forms.PasswordInput)

    class Meta:
        model = models.ligeiaUser
        fields = ('username', 'email', 'first_name', 'last_name')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super(ligeiaUserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class ligeiaUserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(label=("Password"),
                                         help_text=("Raw passwords are not stored, so there is no way to see "  # Noqa
                                                    "this user's password, but you can change the password "  # Noqa
                                                    "using <a href=\"../password/\">this form</a>."))  # Noqa

    class Meta:
        model = models.ligeiaUser
        fields = ('email', 'password', 'username', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_admin')
    def clean_password(self):
        return self.initial["password"]


class ligeiaUserAdmin(ligeiaBaseUserAdmin):
    form = ligeiaUserChangeForm
    add_form = ligeiaUserCreationForm

    list_display = ('username','email', 'first_name', 'last_name', 'date_joined', 'last_login', )
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name',)}),
        ('Permissions', {'fields': ('is_superuser','is_active', 'is_admin', 'is_staff', 'is_employee', 'is_client', 'service_admin')}),
        ('Dates', {'fields': ('date_joined', 'last_login',)}
         ),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2',),
        }
         ),
    )
    search_fields = ('username', 'email')
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(models.ligeiaUser, ligeiaUserAdmin)
