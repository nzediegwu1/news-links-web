FROM node:latest
RUN mkdir -p /usr/myapp
COPY . /usr/myapp

WORKDIR /usr/myapp
RUN yarn install
RUN yarn run build

EXPOSE 3000
CMD yarn run start:prod
