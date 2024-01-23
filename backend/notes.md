# Data modelling

- Data modelling is the process of creating a data model for the data to be stored in a database.
- First, start with the data points that you want to store in your database.
- How you will store them,interact and so on.
- Tools : ERD, UML, ORM, SQL, NoSQL, Graphs, etc.
- Example : Moongoose, Prisma, TypeORM, etc.
- Include models in separate folder and name the files as file.models.ts
- MongoDB stores data in BSON format which is similar to JSON but it has some additional data types like ObjectId, Date, etc. and it is stored in binary format.
- MongoDB automatically creates an _id field for each document.

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
- Connect to DB in seperate file and export the connection.
- Use async/await and try/catch while connecting to DB.
- The connect method returns a promise , so we can use async/await or then/catch.
  
# Middlewares

- Middlewares are functions that execute when a request is made to the server.
- Common Middlewares used :
  - express.json() : Parses incoming request bodies that are in JSON format.
  - express.urlencoded() : Parses incoming request bodies that are URL-encoded (key-value pairs).
  -  express.static(): Serves static files (HTML, CSS, images, etc.) directly from a specified directory.
  -  cors(): Enables Cross-Origin Resource Sharing (CORS), allowing requests from specified origins.
  -   cookieParser(): Parses cookies from incoming requests and populates req.cookies with them.
  
# Custom Error Handling, Async Handling and Api Response Handling

- Create a new folder called utils and create respective files for error handling, async handling and api response handling.
- Check the code for more details.

# JWT 

- JWT stands for JSON Web Token, it is a bearer token which means it allows access to those who bear the token.
- It is quite secure.
- Cookies and Sessions:
  - Cookies are stored in the browser and are sent along with every request.
  - Sessions are stored in the server and are not sent along with every request.
- Refresh Tokens:
  - Refresh tokens are used to get new access tokens.
  - They are stored in the database.
  - They are long-lived and can be used to get new access tokens when the old ones expire.
- Access Tokens:
  - Access tokens are used to access protected resources.
  - They are short-lived and expire after a certain time.
  - They are stored in the browser.
- Both access tokens and refresh tokens are JWTs.

# HTTP 

## HTTP Headers

- HTTP headers are key-value pairs that are sent along with HTTP requests and responses.(metadata)
- Application of headers : Authentication, Caching, Content Negotiation, etc.
- Headers format : {X-Header-Name: Header Value} or {Header-Name: Header Value}
- Headers are case-insensitive.
- Headers are separated by a colon. eg: Content-Type: application/json
- Types of headers:
  - Request headers: Apply only to requests.
  - Response headers: Apply only to responses.
  - Representation headers: encoding,compression, 
  - Payload headers: Content-Type, Content-Length(data)
- Most Common Headers:
  - Accept: Specifies the media types that are acceptable for the response.
  eg: Accept: application/json
  - User-Agent: Specifies the user agent string of the client.
  - Content-Type: Specifies the media type of the request body.
  - Authorization: Specifies the authentication credentials for HTTP authentication.
  - Cache-Control: Specifies directives for caching mechanisms in both requests and responses. 
  - Cookie: Specifies cookies that are sent to the server.
- CORS Headers:
  - Access-Control-Allow-Origin: Specifies the origins that are allowed to access the resource.
  - Access-Control-Allow-Methods: Specifies the HTTP methods that are allowed to access the resource.
  - Access-Control-Allow-Headers: Specifies the headers that are allowed to access the resource.
  - Access-Control-Allow-Credentials: Specifies whether credentials are allowed to be sent with requests.
  - Access-Control-Max-Age: Specifies the maximum amount of time that a preflight request can be cached.
- Security Headers:
  - X-XSS-Protection: Enables cross-site scripting (XSS) filtering.
  - Content-Security-Policy: Specifies the content security policy for the resource.
  - Server: Specifies information about the server.
- HTTP Status Codes:
  - 1xx: Informational
  - 2xx: Success
  - 3xx: Redirection
  - 4xx: Client Error
  - 5xx: Server Error
- Common status codes:
  - 100 Continue, 101 Switching Protocols, 102 Processing
  - 200 OK, 201 Created, 202 Accepted,
  - 301 Moved Permanently, 307 Temporary Redirect, 308 Permanent Redirect
  - 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 409 Conflict, 429 Too Many Requests, 402 Payment Required
  - 500 Internal Server Error, 501 Not Implemented, 502 Bad Gateway
- HTTP Methods:
  - GET: Retrieves a resource.
  - HEAD: Retrieves the headers for a resource.
  - POST: Creates a resource.
  - PUT: replace a resource.
  - DELETE: Deletes a resource.
  - PATCH: Partially updates a resource.
  - OPTIONS: Returns the HTTP methods that the server supports.
  - TRACE: Returns the full HTTP request received by the server.