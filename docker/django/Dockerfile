FROM python:3.9

ENV PYTHONUNBUFFERED 1

COPY ./docker/django/django-entrypoint.sh /
COPY ./py-requirements /django/py-requirements

WORKDIR /django

RUN apt-get update
RUN apt-get install -y build-essential git
RUN pip install pip==21.3.1
RUN pip install -r py-requirements/base.txt
