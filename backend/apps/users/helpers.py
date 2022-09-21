from django.core.mail import send_mail

from django.conf import settings

def send_forget_password_mail(email, token):
    subject = 'Your forget password link'
    message = f'Hi, click on the link to reset your password and http://localhost:8000/login/securecode/{token}/'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email,settings.EMAIL_HOST_USER]
    send_mail(subject, message, email_from, recipient_list)
    return True
