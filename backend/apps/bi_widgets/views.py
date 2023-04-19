from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import bi_widget
from .serializers import WidgetSaveSerializer
import uuid
from apps.bi_widget_property.serializers import Widget_PropertySaveSerializer
from rest_framework.response import Response
from django.db import transaction
from apps.bi_dashbord.models import bi_dashboard
from rest_framework.exceptions import ValidationError
from apps.bi_layouts.serializers import LayoutsSerializer

# Create your views here.
class WidgetSaveView(generics.CreateAPIView):
    serializer_class = WidgetSaveSerializer
    permission_classes = [permissions.AllowAny]

    def _widgetSave(self, data):
        serializer = WidgetSaveSerializer(data=data)
        if serializer.is_valid():
            widget_prop = serializer.save(data)
            return widget_prop

    def _widgetPropertySave(self, data):
        for property in data:
            serializer = Widget_PropertySaveSerializer(data=property)
            serializer.is_valid()
            widget_prop = serializer.save(property)

    def _layoutSave(self, widget_id):
        l_types = ["lg", "md", "sm", "xs", "xxs"]
        layout = {"w": 6, "i": widget_id, "h": 6, "x": 0, "y": 0}
        for l_type in l_types:
            layout["l_type"] = l_type
            layout["ROW_ID"] = uuid.uuid4().hex
            serializer = LayoutsSerializer(data=layout)
            serializer.is_valid()
            serializer.save(layout)

    def _dashboardAdd(self, dashboardId, widgetId):
        dash = Dashboard.objects.filter(ROW_ID=dashboardId).first()
        if dash:
            dash.WIDGETS.add(widgetId)
            dash.save()
        else:
            raise ValidationError("Dashboard not founds")

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            widget = self._widgetSave(request.data["WIDGET"])
            try:
                widget_id = request.data["WIDGET"].get("WIDGET_ID")
                self._widgetPropertySave(request.data["PROPERTY"])
                self._dashboardAdd(
                    dashboardId=request.data["DASHBOARD_ID"], widgetId=widget_id
                )
                self._layoutSave(widget)

            except Exception as e:
                transaction.set_rollback(True)
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)


class WidgetDeleteiew(generics.CreateAPIView):
    serializer_class = WidgetSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = bi_widget.objects.filter(**request.data).first()
        if qs:
            qs.delete()
            return Response({"Message": "Succsesful"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Widget not found"}, status=status.HTTP_400_BAD_REQUEST
            )
