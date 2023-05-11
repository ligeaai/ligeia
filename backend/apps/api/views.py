from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response


class DjangoHealthView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        msg = create_database(NAME="FUNC_DB")
        return Response({"Message": msg}, status=status.HTTP_200_OK)


from django.db import connection, connections
from django.db.utils import ProgrammingError
import environ
from django.core.management import call_command
from django.conf import settings

env = environ.Env(DEBUG=(bool, False))


# def create_database(**kwargs):
#     # Configure database settings for the new database
#     user_db_settings = {
#         "ENGINE": env("PG_ENGINE"),
#         "NAME": kwargs["NAME"].lower(),
#         "USER": env("PG_USER"),
#         "PASSWORD": env("PG_PASS"),
#         "HOST": env("PG_HOST"),
#         "PORT": env("PG_PORT"),
#     }

#     try:
#         with connection.cursor() as cursor:
#             cursor.execute(
#                 "DROP DATABASE IF EXISTS {}".format(user_db_settings["NAME"])
#             )
#             cursor.execute(
#                 "CREATE DATABASE {} WITH OWNER = {} ENCODING = 'UTF8'".format(
#                     user_db_settings["NAME"], user_db_settings["USER"]
#                 )
#             )

#         # Reconnect to the newly created database
#         connection.close()
#         connection.settings_dict["NAME"] = user_db_settings["NAME"]
#         connection.connect()

#         # Create the table
#         # with connection.cursor() as cursor:
#         #     call_command("migrate", database=user_db_settings["NAME"])

#     except ProgrammingError as e:
#         return str(e)
#     # Save user_db_settings to the database or somewhere else
#     # ...

#     return "Database created successfully"

#     # Save user_db_settings to the database or somewhere else
#     # ...


def create_database(**kwargs):
    # Configure database settings for the new database
    user_db_settings = settings.DATABASES["default"].copy()
    kwargs["NAME"] = kwargs["NAME"].lower()
    user_db_settings.update(kwargs)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "DROP DATABASE IF EXISTS {}".format(user_db_settings["NAME"])
            )
            cursor.execute(
                "CREATE DATABASE {} WITH OWNER = {} ENCODING = 'UTF8'".format(
                    user_db_settings["NAME"], user_db_settings["USER"]
                )
            )
    except ProgrammingError as e:
        return str(e)

    # # Update the default database connection settings
    # settings.DATABASES["default"] = user_db_settings

    # # Update the connections information for the default database
    # connections["default"].settings_dict = settings.DATABASES["default"]

    # # Run the migrations on the new database
    # call_command("makemigrations")
    # call_command("migrate")

    return "Database created successfully"
