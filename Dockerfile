# syntax=docker/dockerfile:1
#
# Mappable folders:
# /app/config - for config file. Copy "/config/config.ini.sample" from git to your binded config folder e.g:"/home/xy/JapLog/conf/config.ini".
# /app/database - for sqlite db

# Build with "docker build -t japaneselog ."

FROM python:3.8.11-slim-buster
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl software-properties-common apt-utils python -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - 
RUN apt-get install nodejs 
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt && cd JapaneseLearningLogFrontend && npm install && npm run build
EXPOSE 5000
CMD ["python", "start.py"]