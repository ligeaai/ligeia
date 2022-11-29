FROM grafana/grafana

ADD ./config.ini /etc/grafana/config.ini
ADD ./provisioning/datasources/prometheus.yaml /etc/grafana/provisioning/datasources/prometheus.yaml

EXPOSE 3005

ADD grafana.ini /etc/grafana