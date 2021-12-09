#!/bin/bash

echo "Running collectstatic"
python backend/manage.py collectstatic --noinput
echo "Running migrations"
python backend/manage.py migrate --noinput

/usr/bin/supervisord
