FROM node

WORKDIR /app
COPY . /app
RUN npm install --production

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
