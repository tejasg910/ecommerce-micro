# E-commerce Microservices Installation Guide

This repository contains a microservices-based e-commerce application built with Next.js (frontend) and Nest.js (backend). Follow these instructions to set up the project locally.

## Prerequisites

- Node.js (Latest LTS version recommended)
- Git

## Repository Setup

1. Clone the repository:
```bash
git clone https://github.com/tejasg910/ecommerce-micro.git
cd ecommerce-micro
```

## Project Structure

The project consists of four main directories:
- `customer-management-panel` (Nest.js backend)
- `customer-management-panel-client` (Next.js frontend)
- `product-order-service` (Nest.js backend)
- `product-order-service-client` (Next.js frontend)

## Installation Steps

You'll need to open four separate terminal windows/tabs to run all services.

### Customer Management Panel (Backend)

```bash
# Terminal 1
cd customer-management-panel
npm install

# Create .env file
cp example.env .env
# Update the .env file with your configuration

# Start the server
npm run start

# Server will run on port 9000
```

### Customer Management Panel Client (Frontend)

```bash
# Terminal 2
cd customer-management-panel-client
npm install

# Create .env file
cp example.env .env
# Update the .env file with your configuration

# Start the development server
npm run dev

# Client will run on port 3000
```

### Product Order Service (Backend)

```bash
# Terminal 3
cd product-order-service
npm install

# Create .env file
cp example.env .env
# Update the .env file with your configuration

# Start the server
npm run start

# Server will run on port 8000
```

### Product Order Service Client (Frontend)

```bash
# Terminal 4
cd product-order-service-client
npm install

# Create .env file
cp example.env .env
# Update the .env file with your configuration

# Start the development server
npm run dev

# Client will run on port 3001
```

## Accessing the Application

Once all services are running, you can access the applications at:

- Customer Management Panel: `http://localhost:3000`
- Product Order Service: `http://localhost:3001`
- Customer Management Backend: `http://localhost:9000`
- Product Order Backend: `http://localhost:8000`

## Environment Variables

Make sure to create `.env` files in each directory using the provided `example.env` files as templates. Update the values according to your local setup.

## Troubleshooting

If you encounter any issues:

1. Ensure all required ports (3000, 3001, 8000, 9000) are available
2. Verify that Node.js is properly installed
3. Check if all environment variables are correctly set
4. Make sure all dependencies are installed in each directory

## Support

If you encounter any problems, please open an issue in the GitHub repository.
