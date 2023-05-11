from django.shortcuts import render
from utils.models_utils import validate_find
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import workflows
from .serializers import WorkflowsSerializers, WorkflowsGetByIdSerializers
import json


class WorkFlowsCreateView(generics.CreateAPIView):
    serializer_class = WorkflowsSerializers
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        data["ITEM_ID"] = json.dumps(data["ITEM_ID"], ensure_ascii="utf-8")
        data["TAG_ID"] = json.dumps(data["TAG_ID"], ensure_ascii="utf-8")
        if serializer.is_valid():
            serializer.create(data)
            return Response(request.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkFlowsUpdateView(generics.CreateAPIView):
    serializer_class = WorkflowsSerializers
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        data["ITEM_ID"] = json.dumps(data["ITEM_ID"], ensure_ascii="utf-8")
        data["TAG_ID"] = json.dumps(data["TAG_ID"], ensure_ascii="utf-8")
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.update(data)
            return Response(request.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WorkFlowsDeleteView(generics.CreateAPIView):
    serializer_class = WorkflowsSerializers
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        row_id = request.data.get("ROW_ID")
        qs = workflows.objects.filter(ROW_ID=row_id).delete()

        return Response("Succsessful")


class WorkFlowsGetView(generics.ListAPIView):
    serializer_class = WorkflowsSerializers
    permission_classes = [permissions.AllowAny]
    queryset = workflows.objects.all().order_by("NAME").values("NAME", "ROW_ID")

    def get(self, request, *args, **kwargs):
        qs = self.get_queryset()
        return Response(qs)


class WorkFlowsGetByIdView(generics.CreateAPIView):
    serializer_class = WorkflowsGetByIdSerializers
    permission_classes = [permissions.AllowAny]
    queryset = workflows.objects.none()

    def get(self, request, *args, **kwargs):
        row_id = self.kwargs["row_id"]
        queryset = workflows.objects.filter(ROW_ID=row_id)
        serializer = WorkflowsGetByIdSerializers(queryset, many=True)
        return Response(serializer.data)
