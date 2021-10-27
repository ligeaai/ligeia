############
# BUILDER #
###########

# pull official base image
FROM python:3 

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# RUN mkdir -p /home/application
# ENV HOME=/home/application
# ENV APP_HOME=/home/application/web
# RUN mkdir $APP_HOME
# RUN mkdir $APP_HOME/staticfiles
# WORKDIR $APP_HOME

# install psycopg2 dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
# RUN apk update \
#     && apk add postgresql-dev gcc python3-dev musl-dev

# lint
RUN pip install --upgrade pip flake8 django-polymorphic
# COPY Pipfile* ./
# RUN pipenv install --system --ignore-pipfile
# COPY . /usr/src/app/
RUN flake8 --ignore=E501,F401 .
RUN whoami



# install dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
# copy entrypoint-prod.sh
# COPY ./entrypoint.sh $APP_HOME

# # copy project
# COPY . $APP_HOME

# # # chown all the files to the app user
# # RUN chown -R app:app $APP_HOME

# # # change to the app user
# # USER app

# # run entrypoint.sh
# ENTRYPOINT ["/home/application/web/entrypoint.sh"]

#########
# FINAL #
#########

# pull official base image
# FROM python:3

# # create directory for the app user
# RUN mkdir -p /home/application

# # create the app user
# # RUN addgroup -S app && adduser -S app -G app


# # create the appropriate directories
# ENV HOME=/home/application
# ENV APP_HOME=/home/application/web
# RUN mkdir $APP_HOME
# RUN mkdir $APP_HOME/staticfiles
# WORKDIR $APP_HOME


# # install dependencies
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libpq-dev \
#     && rm -rf /var/lib/apt/lists/*
# # RUN apk update \
# #         && apk add postgresql-dev libpq gcc python3-dev musl-dev libffi-dev

# COPY --from=builder /usr/src/app/wheels/ wheels
# COPY --from=builder /usr/src/app/requirements.txt .
# RUN pip install --upgrade pip
# RUN pip install --no-cache ./wheels/*

# # copy entrypoint-prod.sh
# COPY ./entrypoint.sh $APP_HOME

# # copy project
# COPY . $APP_HOME

# # # chown all the files to the app user
# # RUN chown -R app:app $APP_HOME

# # # change to the app user
# # USER app

# # run entrypoint.sh
# ENTRYPOINT ["/home/application/web/entrypoint.sh"]