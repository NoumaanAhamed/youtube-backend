# Data modelling

- Data modelling is the process of creating a data model for the data to be stored in a database.
- First, start with the data points that you want to store in your database.
- How you will store them,interact and so on.
- Tools : ERD, UML, ORM, SQL, NoSQL, Graphs, etc.
- Example : Moongoose, Prisma, TypeORM, etc.
- Include models in separate folder and name the files as file.models.ts

# Notes and Syntax for Data Modeling with Mongoose:

## General Schema Structure:

- Use `new mongoose.Schema` to define a new schema.
- Inside the schema object, define properties as key-value pairs.
- Each property defines a single field in the documents stored in the collection.

## Field Types:

- Use basic types like `String`, `Number`, `Boolean`, etc. for simple data.
- Use `mongoose.Schema.Types.ObjectId` for references to other collections.
- Use arrays of nested sub-documents for embedded data structures.

## Validation & Constraints:

- Use `required: true` to mark mandatory fields.
- Use `unique: true` to ensure no duplicate values for the specified field.
- Use `default: 'value'` to set a default value for optional fields.
- Use enums like `type: String, enum: ['option1', 'option2']` to restrict allowed values.

## Relationships:

- Use references with `ref: 'ModelName'` to link documents across collections.
  - Example: `productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }` refers to documents in the "Product" collection.

## Timestamps:

- Use `timestamps: true` to automatically add `createdAt` and `updatedAt` fields to documents.

# MongoDb Atlas Setup

- Create a new project in MongoDb Atlas.
- Create a new cluster.
- Create a new user and give it read and write access.
- Whitelist your IP address , so that you can access the database from your local machine.
- CAUTION ! 
- Give Global IP Access : 0.0.0.0/0 
- Connect to your cluster using the connection string provided by MongoDb Atlas.
- Issues will be there when password contains special characters.