# pull official base image
FROM python:3.9.6-alpine

# set work directory
WORKDIR /usr/src/app
RUN apk update && apk add build-base gcc jpeg-dev zlib-dev python3-dev musl-dev postgresql-dev
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN cat requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/app/entrypoint.sh
RUN chmod 777 /usr/src/app/entrypoint.sh

COPY . .
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
