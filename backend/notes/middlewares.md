 
# Middlewares

- Middlewares are functions that execute when a request is made to the server.
- Common Middlewares used :
  - express.json() : Parses incoming request bodies that are in JSON format.
  - express.urlencoded() : Parses incoming request bodies that are URL-encoded (key-value pairs).
  -  express.static(): Serves static files (HTML, CSS, images, etc.) directly from a specified directory.
  -  cors(): Enables Cross-Origin Resource Sharing (CORS), allowing requests from specified origins.
  -   cookieParser(): Parses cookies from incoming requests and populates req.cookies with them.
  -   ('/route',router) : Mounts the specified router at the specified path.
  -   app.all() : Mounts the specified middleware function or functions at the specified path for all HTTP request methods.
 
 ## next() function in middlewares

- next() function is used to pass control to the next middleware function.
- when ApiError is thrown in a middleware, next() function is used to pass control to the asyncHandler middleware.
- The asyncHandler middleware calls the next() function with the error as an argument.
- The error is then handled by the global error handler middleware.
- The global error handler middleware sends the error response to the client.
 
 ## Error Handling

- Error handling is done by using the global error handler middleware.
- The global error handler middleware is the last middleware in the middleware stack.

