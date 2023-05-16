from rest_framework.authentication import TokenAuthentication
from apps.users.models import User
from apps.layer.helpers import change_db, to_layerDb


class ChangeDBMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        layers = self.getActiveLayer(request.user)
        self.changeDbConnections(layers)
        self.request = request
        response = self.get_response(request)
        return response

    def getActiveLayer(self, user):
        change_db("default")
        layers = User.objects.filter(email=user).values("active_layer").first()
        if layers:
            return layers.get("active_layer")
        else:
            return "STD"

    def changeDbConnections(self, layers):
        try:
            to_layerDb(layers)
        except Exception as e:
            change_db("default")
