from django.shortcuts import render
from .serializers import Widget_TypeSaveSerializer
from rest_framework import permissions, generics, status
from rest_framework.response import Response
from .models import bi_widget_type
from utils.utils import import_data


# Create your views here.
class WidgetTypeSaveView(generics.CreateAPIView):
    serializer_class = Widget_TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = Widget_TypeSaveSerializer(data=request.data)
        if serializer.is_valid():
            widget_prop = serializer.save(request.data)
            message = Widget_TypeSaveSerializer(widget_prop).data
            return Response(message, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WidgetTypeGetView(generics.CreateAPIView):
    serializer_class = Widget_TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = bi_widget_type.objects.filter(**request.data).values()
        return Response(qs, status=status.HTTP_200_OK)


class WidgetTypeScriptView(generics.ListAPIView):
    serializer_class = Widget_TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        import_data(bi_widget_type, "bi_widget_type")
        return Response({"Message": "Successful"}, status=status.HTTP_201_CREATED)
