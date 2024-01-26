
# Authentication and Authorization

## Basic terms

- Identification: "I'm John." (Proving you exist)
- Authentication: "Is John on the guest list?" (Proving you are who you say you are)
- Authorization: "John is a VIP. Give him a gold wristband." (Proving you are allowed to do something)
- Access Control: "Gold wristband only! Sorry, John, you can't enter the casino."(Restricting access to certain resources) 

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

## Types of Authentication

- Session-based authentication:
  - The server creates a session for the user and stores it in the database.
  - The session id is sent to the client as a cookie.
  - The client sends the session id along with every request.
  - The server verifies the session id and sends the response.
  
- Token-based authentication:
  - The server creates a JWT and sends it to the client.
  - The client sends the JWT along with every request.
  - The server verifies the JWT and sends the response.
  
- Session-based authentication is stateful, while token-based authentication is stateless.
- Session-based authentication is more secure than token-based authentication.

- Session-id amd JWTs can be stored in cookies or local storage.
- Session-id and JWTs can be transferred using cookies or authorization headers or body
- Cookies are more secure than local storage.
- Cookies are automatically sent by the browser, while local storage is not.

