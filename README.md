# Billing System Node.js Server

This is a Node.js server implementation for a billing system

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Postman Collection](#postman-collection)

## Features

- User account creation
- Adding and removing items from the cart
- Calculating total bill with taxes
- Confirming orders
- Admin access to view all orders

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Make sure MongoDB server is running)

### Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/SaiSwarup27/BillingSystem.git
   cd BillingSystem

2. Install Dependencies
    ```sh
    npm install

### Database Setup

- Ensure that your MongoDB server is running.
- Update the database connection URL in config/database.js to match your MongoDB configuration.

### Running the Server

- Start the server using the following command:
  ```sh
  npm start

## API Documentation
- The API endpoints are documented in the [API Documentation](https://github.com/SaiSwarup27/BillingSystem/blob/main/BillingSystem.postman_collection.json) file.

## Postman Collection
- Import the [Postman Collection](https://github.com/SaiSwarup27/BillingSystem/blob/main/BillingSystem.postman_collection.json) JSON file to test the APIs using Postman.
