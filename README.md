### Calendar API

### Running the app
```bash
docker-compose up -d 
```

### Install the dependencies
```bash
docker-compose exec app npm install
```

### Running the migrations

```bash
docker-compose exec app npx typeorm-ts-node-commonjs migration:run -d ./src/db/data-source.ts``
```