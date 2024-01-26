# Custom Error Handling, Async Handling and Api Response Handling

- Create a new folder called utils and create respective files for error handling, async handling and api response handling.
- Check the code for more details.

## `ApiError` Class

### Properties:
- `statusCode`: The HTTP status code indicating the type of error.
- `errors`: An array of error messages or objects with a `message` property.
- `data`: Optional data associated with the error.
- `success`: A boolean indicating whether the operation was successful (default is `false`).

### Constructor:
- `statusCode`: HTTP status code (default is `500`).
- `message`: Error message (default is "Something went wrong").
- `errors`: Array of error messages or objects (default is an empty array).
- `stack`: Stack trace for the error (optional).

### Example Usage:
```javascript
  throw new ApiError(404, "User not found");
  throw new Error("Server Error");
```

## `ApiResponse` Class

### Properties:
- `statusCode`: The HTTP status code indicating the success or failure of the operation.
- `message`: A message describing the result of the operation.
- `data`: Optional data associated with the response.
- `success`: A boolean indicating whether the operation was successful (default is `true` if `statusCode` is less than 400).

### Constructor:
- `statusCode`: HTTP status code.
- `message`: Response message (default is "Success").
- `data`: Optional data to be included in the response (default is `null`).

### Example Usage:
```javascript
  const successApiResponse = new ApiResponse(200, "Operation successful", { key: 'value' });
  console.log(successApiResponse);
```

## `asyncHandler` Middleware

### Overview:
- This middleware wraps an asynchronous route handler function and handles any errors that occur.
- It catches any errors thrown by the handler function and passes them to the `next()` function.

### Usage:
```javascript
  router.get('/', asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.json(new ApiResponse(200, "Operation successful", users));
  }));
```

## Cloudinary Utility

### Overview:
The provided code is a utility for uploading files to Cloudinary. It uses the Cloudinary v2 API and handles the configuration of Cloudinary credentials.

### Configuration:
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name retrieved from environment variables.
- `CLOUDINARY_API_KEY`: Cloudinary API key retrieved from environment variables.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret retrieved from environment variables.

### Function:
#### `uploadOnCloudinary`
- **Input**: Local file path (`localFilePath`) of the file to be uploaded.
- **Output**: Returns a Cloudinary upload result.
- **Process**:
  - Checks for a valid file path.
  - Uses Cloudinary's `uploader.upload` method to upload the file.
  - Deletes the file from local storage after successful upload.
  - Logs the Cloudinary URL and returns the upload result.
  - In case of an error, logs the error, deletes the file, and throws the error.

### Example Usage:
```javascript
const localFilePath = "path/to/local/file.jpg";
try {
  const uploadResult = await uploadOnCloudinary(localFilePath);
  console.log(uploadResult);
} catch (error) {
  console.error(error);
}
```

