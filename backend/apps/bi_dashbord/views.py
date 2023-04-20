from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import bi_dashboard
from apps.bi_layouts.models import bi_layout
from apps.bi_layouts.serializers import LayoutsSerializer
from .serializers import DashBoardsSaveSerializer, DashBoardsAllFieldSerializer
import uuid
from rest_framework.response import Response

# Create your views here.
class DashBoardsView(generics.CreateAPIView):
    serializer_class = DashBoardsAllFieldSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        pass

    def post(self, request):
        # layouts_type = ["lg", "md", "xs", "xss"]
        layouts_type = (
            bi_layout.objects.order_by().values_list("l_type", flat=True).distinct()
        )

        dashboards = bi_dashboard.objects.filter(ITEM_ID=request.data.get("ITEM_ID")).order_by("START_DATETIME")
        result = {}
        for dashboard in dashboards:
            tempt = {
                **DashBoardsAllFieldSerializer(dashboard).data,
                "layouts": {
                    item: LayoutsSerializer(
                        bi_layout.objects.filter(
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
            result[dashboard.NAME] = tempt
        return Response(result)


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


class DashBoardsDeleteView(generics.CreateAPIView):
    serializer_class = DashBoardsSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = bi_dashboard.objects.filter(ROW_ID=request.data.get("ROW_ID"))
        if qs:
            qs.delete()
        return Response({"Message": "Delete Succsessfull"})
