from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from services.notifications import consumer


class FaultsOrAlertView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        data = consumer.consumerData(request.data.get('EVENT_TYPE'),str(request.user))
        return Response({"Message": data}, status=status.HTTP_200_OK)