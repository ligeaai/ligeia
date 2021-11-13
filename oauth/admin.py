# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from oauth import models
from django import forms
from django.contrib.auth.admin import UserAdmin as BaseNordalUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField


class NordalUserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation',
                                widget=forms.PasswordInput)

    class Meta:
        model = models.IEFPPUser
        fields = ('username', 'email')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super(NordalUserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class NordalUserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(label=("Password"),
                                         help_text=("Raw passwords are not stored, so there is no way to see "  # Noqa
                                                    "this user's password, but you can change the password "  # Noqa
                                                    "using <a href=\"../password/\">this form</a>."))  # Noqa

    class Meta:
        model = models.IEFPPUser
        fields = ('email', 'password', 'username', 'is_active', 'is_staff', 'is_admin')
    def clean_password(self):
        return self.initial["password"]


class NordalUserAdmin(BaseNordalUserAdmin):
    form = NordalUserChangeForm
    add_form = NordalUserCreationForm

    list_display = ('email', 'first_name', 'date_joined', 'last_login', )
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name',)}),
        ('Permissions', {'fields': ('is_active', 'service_admin', 'is_employee')}),
        ('Dates', {'fields': ('date_joined', 'last_login',)}
         ),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2',),
        }
         ),
    )
    search_fields = ('username', 'email')
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(models.IEFPPUser, NordalUserAdmin)
