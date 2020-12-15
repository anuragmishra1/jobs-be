FROM node

WORKDIR /app
COPY . /app
RUN npm install --production

EXPOSE 3003

ENTRYPOINT ["npm", "start"]
