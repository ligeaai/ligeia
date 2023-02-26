from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Dashboard
from apps.layouts.models import Layout
from apps.layouts.serializers import LayoutsSerializer
from .serializers import DashBoardsSaveSerializer, DashBoardsAllFieldSerializer
import uuid
from rest_framework.response import Response

# Create your views here.
class DashBoardsView(generics.ListAPIView):
    serializer_class = DashBoardsAllFieldSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        pass

    def get(self, request):
        # layouts_type = ["lg", "md", "xs", "xss"]
        layouts_type = (
            Layout.objects.order_by().values_list("l_type", flat=True).distinct()
        )

        dashboards = Dashboard.objects.all()
        data = [
            {
                dashboard.NAME: {
                    **DashBoardsAllFieldSerializer(dashboard).data,
                    "layouts": {
                        item: LayoutsSerializer(
                            Layout.objects.filter(
                                i__in=DashBoardsAllFieldSerializer(dashboard).data[
                                    "WIDGETS"
                                ],
                                l_type=item,
                            ),
                            many=True,
                        ).data
                        for item in layouts_type
                    },
                }
            }
            for dashboard in dashboards
        ]

        return Response(data)


# Create your views here.
class DashBoardsSaveView(generics.CreateAPIView):
    serializer_class = DashBoardsSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = DashBoardsSaveSerializer(data=request.data)
        if serializer.is_valid():
            widget_prop = serializer.save()
            message = DashBoardsSaveSerializer(widget_prop).data
            return Response(message, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
