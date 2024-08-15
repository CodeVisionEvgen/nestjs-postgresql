# NestJS Users API

This project implements a simple API for managing users with a PostgreSQL database using NestJS.

## Installation

1. Clone the Repository

```bash
git clone https://github.com/codevisionevgen/nestjs-postgresql.git
cd nestjs-postgresql
```

2. Install Dependencies

```bash
npm install
```

3. Configure the Database

## Create a PostgreSQL database and configure your environment variables in the .env file:

Environment Variables
.env

```env
POSTGRESQL_HOST=localhost
POSTGRESQL_PORT=5432
POSTGRESQL_USERNAME=admin
POSTGRESQL_PASSWORD=testpwd
POSTGRESQL_DATABASE=crud

    POSTGRESQL_HOST: The address of your PostgreSQL server (e.g., localhost or the server's IP address).
    POSTGRESQL_PORT: The port on which PostgreSQL is running (default is 5432).
    POSTGRESQL_USERNAME: The username for connecting to the database.
    POSTGRESQL_PASSWORD: The password for the database user.
    POSTGRESQL_DATABASE: The name of the database to connect to.
```

4. Start the Server

```bash
npm run start
```

## API Endpoints

1. Create a User

   Method: POST
   URL: /users
   Request Body:

   ```json

   {
   "name": "John Doe",
   }
   ```

2. Retrieve All Users

   Method: GET
   URL: /users

3. Retrieve a User by ID

   Method: GET
   URL: /users/:id
   URL Parameters: id (numeric ID of the user)

4. Update a User

   Method: PUT
   URL: /users/:id
   URL Parameters: id (numeric ID of the user)
   Request Body:

   ```json
   {
   "name": "Jane Doe"
   }
   ```

5. Delete a User

   Method: DELETE
   URL: /users/:id
   URL Parameters: id (numeric ID of the user)

## TypeORM Configuration

TypeORM configuration for automatic table creation based on entities:
```typescript
// app.module.ts
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: PostgreSQLConfig,
      inject: [ConfigService],
    }),



// postgresql.config.ts
export const PostgreSQLConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRESQL_HOST'),
    port: configService.get('POSTGRESQL_PORT'),
    username: configService.get('POSTGRESQL_USERNAME'),
    password: configService.get('POSTGRESQL_PASSWORD'),
    database: configService.get('POSTGRESQL_DATABASE'),
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
  };
};

```

## Additional Information

Use tools like pgAdmin or DBeaver for database management.
Ensure your PostgreSQL server is running and accessible with the provided credentials.

Feel free to customize the content according to your project's specific needs!
