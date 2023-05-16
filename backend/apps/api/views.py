from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response


class DjangoHealthView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"Message": str(status.HTTP_200_OK)}, status=status.HTTP_200_OK)
