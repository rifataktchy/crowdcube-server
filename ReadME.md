# Crowdcube Backend

This is the backend server for the CrowdCube crowdfunding application.
Built with Node.js, TypeScript, Express, MongoDB, and structured using Controller-Service architecture.

# Features

1. Campaign Management

Create, read, update, delete campaigns

Get campaigns by user email or ID

2. User Management

Add new users

Store user information in MongoDB

3. Donation Management

Add donations

Get donations by user email

4. Professional Architecture

TypeScript with typed collections and request parameters

Controller-Service structure

MongoDB connection via MongoClient

Vercel ready for serverless deployment

# Technologies Used

Node.js

TypeScript

Express

MongoDB / MongoClient

Vercel for deployment

CORS middleware

# Project Structure
src/
 ├── controllers/
 │    ├── campaign.controller.ts
 │    ├── user.controller.ts
 │    └── donation.controller.ts
 │
 ├── services/
 │    ├── campaign.service.ts
 │    ├── user.service.ts
 │    └── donation.service.ts
 │
 ├── db/
 │    └── mongo.ts
 │
 ├── types/
 │    ├── Campaign.ts
 │    ├── User.ts
 │    └── Donation.ts
 │
 └── index.ts


controllers/ → Handles HTTP requests (req, res)

services/ → Business logic and database operations

db/ → MongoDB connection setup

types/ → TypeScript interfaces for Campaign, User, Donation

index.ts → Entry point