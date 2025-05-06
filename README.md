# Bun-Node-AWS Comparison

This project compares the performance and features of Bun, Node.js, and AWS for various tasks.

## Requirements

- Node.js >= 22.0.0
- npm >= 10.2.0

## Installation

```bash
npm install
```

## Project Structure

This is a monorepo with the following packages:

- `packages/xml-parser`: XML parsing comparison
- `packages/image-resizer`: Image resizing comparison 
- `packages/dijsktra-solver`: Dijkstra's algorithm implementation comparison

## ESLint and Prettier

This project uses ESLint and Prettier to maintain code quality and consistent style.

### Available Scripts

- `npm run lint`: Run ESLint on all files
- `npm run lint:fix`: Run ESLint and automatically fix issues
- `npm run format`: Format all files with Prettier
- `npm run format:check`: Check if files are formatted correctly

### VS Code Integration

For the best development experience with VS Code:

1. Install the following extensions:
   - ESLint (`dbaeumer.vscode-eslint`)
   - Prettier (`esbenp.prettier-vscode`)

2. The repository includes VS Code settings that will:
   - Format files on save using Prettier
   - Run ESLint fix on save
   - Apply consistent settings across developers

## Steps to create bun layer in AWS

https://learnaws.io/blog/bun-aws-lambda

## License

ISC 