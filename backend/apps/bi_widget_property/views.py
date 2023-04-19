from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import bi_widget_property
from .serializers import (
    Widget_PropertySaveSerializer,
    Widget_PropertyGetSerializer,
    Widget_PropertyUpdateSerializer,
)
import uuid
from rest_framework.response import Response
from django.db import transaction

# Create your views here.
class WidgetPropertySaveView(generics.CreateAPIView):
    serializer_class = Widget_PropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = Widget_PropertySaveSerializer(data=request.data)
        if serializer.is_valid():
            widget_prop = serializer.save(request.data)
            message = Widget_PropertySaveSerializer(widget_prop).data
            return Response(message, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WidgetPropertyGetView(generics.CreateAPIView):
    serializer_class = Widget_PropertyGetSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = bi_widget_property.objects.filter(WIDGET_ID=request.data.get("WIDGET_ID"))
        serializer = Widget_PropertyGetSerializer(qs, many=True)
        new_dict = {}
        for item in serializer.data:
            key = item.get("PROPERTY_NAME")
            if item.get("PROPERTY_JSON"):
                new_dict[key] = item.get("PROPERTY_JSON")
            elif item.get("PROPERTY_TAG"):
                new_dict[key] = item.get("PROPERTY_TAG")
            elif item.get("PROPERTY_BOOLEAN"):
                new_dict[key] = item.get("PROPERTY_BOOLEAN")
            else:
                new_dict[key] = item.get("PROPERTY_STRING")
        return Response(new_dict, status=status.HTTP_201_CREATED)


class WidgetPropertyUpdateView(generics.CreateAPIView):
    serializer_class = Widget_PropertyUpdateSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            try:
                for property in request.data["UPDATE"]:
                    serializer = Widget_PropertyUpdateSerializer(data=property)
                    serializer.is_valid()
                    serializer.save(property)
                for deleteItem in request.data["DELETE"]:
                    widgetId = deleteItem.get("WIDGET_ID")
                    propertyName = deleteItem.get("PROPERTY_NAME")
                    qs = (
                        bi_widget_property.objects.filter(
                            WIDGET_ID=widgetId, PROPERTY_NAME=propertyName
                        )
                        .first()
                        .delete()
                    )
            except Exception as e:
                transaction.set_rollback(True)
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)
