### NASA API adapter

The project is intended to practice skills in working with a third-party API and writing documentation in Swagger.

---

### Stack

node.js (express) - provides server functionality and route handling

axios - used to send requests to the NASA api and receive responses

---

### Functionality

The server accepts a request with parameters from the user, checks for an access key, if the key is invalid, returns an access error response, if it is valid, processes the sent data and makes a corresponding request to the NASA API, then accepts the response, processes it if necessary, and sends a response to the user.

### Swagger documentation

https://app.swaggerhub.com/apis/VITENKOARTEM7_1/NASA/1.0.0
