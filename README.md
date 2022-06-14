### Calendar API

### Running the app
docker-compose up -d 

### Running the migrations
docker-compose exec app npx typeorm-ts-node-commonjs migration:run -d ./src/db/data-source.ts
