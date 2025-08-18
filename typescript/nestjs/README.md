# Nest TypeScript Starter Repository

A comprehensive [NestJS](https://github.com/nestjs/nest) framework TypeScript starter repository with enhanced features and best practices.

Originally grabbed from:
https://github.com/nestjs/nest/tree/master/sample/01-cats-app

## Features

- 🚀 **Modern NestJS Setup** - Latest NestJS framework with TypeScript
- 🔒 **Security** - Helmet integration for security headers
- 📝 **Validation** - Class-validator with comprehensive validation pipes
- 🛡️ **Guards & Interceptors** - Role-based access control and logging
- 📊 **Monitoring** - Request/response logging and timeout handling
- 🧪 **Testing** - Comprehensive unit and e2e test setup
- 📚 **Documentation** - Auto-generated API documentation with Compodoc
- 🎯 **Code Quality** - ESLint, Prettier, and TypeScript strict mode

## Installation

```bash
# Install dependencies
$ npm install

# Install global dependencies (optional)
$ npm install -g @nestjs/cli
```

## Environment Setup

Create a `.env` file in the root directory:

```bash
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
```

## Running the Application

```bash
# Development mode with hot reload
$ npm run start:dev

# Development mode with HMR
$ npm run start:hmr

# Debug mode
$ npm run start:debug

# Production mode
$ npm run start:prod

# Build for production
$ npm run build:prod
```

## Testing

```bash
# Unit tests
$ npm run test

# Unit tests in watch mode
$ npm run test:watch

# E2E tests
$ npm run test:e2e

# E2E tests in watch mode
$ npm run test:e2e:watch

# Test coverage
$ npm run test:cov

# Debug tests
$ npm run test:debug
```

## Code Quality

```bash
# Lint code
$ npm run lint

# Check linting without fixing
$ npm run lint:check

# Format code
$ npm run format

# Check formatting
$ npm run format:check
```

## Documentation

```bash
# Generate and serve documentation
$ npm run docs

# Generate documentation with watch mode
$ npm run docs:serve
```

## API Endpoints

### Cats Resource

- `GET /cats` - Get all cats (supports `?limit=N` query parameter)
- `GET /cats/:id` - Get cat by ID
- `POST /cats` - Create new cat (requires admin role)
- `PUT /cats/:id` - Update cat (requires admin/moderator role)
- `DELETE /cats/:id` - Delete cat (requires admin role)

## Project Structure

```
src/
├── cats/                 # Cats module
│   ├── dto/             # Data Transfer Objects
│   ├── interfaces/      # TypeScript interfaces
│   └── ...
├── common/              # Shared utilities
│   ├── decorators/      # Custom decorators
│   ├── filters/         # Exception filters
│   ├── guards/          # Authentication guards
│   ├── interceptors/    # Request/response interceptors
│   ├── middleware/      # Custom middleware
│   └── pipes/           # Validation pipes
├── core/                # Core application modules
└── main.ts              # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

NestJS is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in Touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

This project is [MIT licensed](LICENSE).
