from rest_framework.permissions import BasePermission
from .helper import PermissionsHelper

class CreatePermission(BasePermission):
    def __init__(self, model_type=""):
        self.model_type = model_type  # yanlışlıkla model_type = model_type="" yazmışsınız
    
    def __call__(self):
        return self
    
    def has_permission(self, request, view):
        print(self.model_type)
        data = request.role
        return PermissionsHelper(data=data, model_type=self.model_type, model_method="CREATE")


class ReadPermission(BasePermission):
    def __init__(self, model_type=""):
        self.model_type = model_type  # yanlışlıkla model_type = model_type="" yazmışsınız
    
    def __call__(self):
        return self
    
    def has_permission(self, request, view):
        data = request.role
        return PermissionsHelper(data=data, model_type=self.model_type, model_method="READ")

class UpdatePermission(BasePermission):
    def __init__(self, model_type=""):
        self.model_type = model_type  # yanlışlıkla model_type = model_type="" yazmışsınız
    
    def __call__(self):
        return self
    
    def has_permission(self, request, view):
        data = request.role
        return PermissionsHelper(data=data, model_type=self.model_type, model_method="UPDATE")

class DeletePermission(BasePermission):
    def __init__(self, model_type=""):
        self.model_type = model_type  # yanlışlıkla model_type = model_type="" yazmışsınız
    
    def __call__(self):
        return self
    
    def has_permission(self, request, view):
        data = request.role
        return PermissionsHelper(data=data, model_type=self.model_type, model_method="DELETE")
