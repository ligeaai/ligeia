from rest_framework.permissions import BasePermission


class IsEmployeeUser(BasePermission):
    def has_permission(self, request, view):
        return (
            (request.user and request.user.is_employee)
            or (request.user and request.user.is_admin)
            or ((request.user and request.user.is_superuser))
        )
