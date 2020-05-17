FROM arm32v7/node:10-buster-slim
COPY . .
RUN npm install
CMD ["node", "index.js"]