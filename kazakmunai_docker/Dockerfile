FROM jupyter/scipy-notebook:6b49f3337709

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# RUN apt-get update \
#     && apt-get install -y build-essential \
#     && apt-get install -y libpq-dev \
#     && apt-get install -y gettext \
#     && apt-get -y install netcat gcc postgresql \
#     && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
#     && rm -rf /var/lib/apt/lists/*

RUN pip install openpyxl psycopg2-binary

COPY ./kazakmunai_docker/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint