# Getting Started

> This is a guide to get started with the Spice Girls API

!> **Please Note** You will need to register an account and get an API key to use this API.
  - Open up postman 
  - Go to /api/v1/spicegirls/signup
  - In the body of the request, enter a username, password, and email
  - Click send
  - You will receive an API Key in the response
  ```json
  {
    "message": "User created successfully",
    "apiKey": "1234567890"
  }
  ```


## API KEY
> You need an API key to access any edit endpoints.

You can authenticate your requests by passing your API key in the `query parameter`.

<div style='color: green'>
Example: POST /api/v1/spicegirls/albums&api_key=YOUR_API_KEY
</div>

You can also authenticate your requests by passing your API key in the `header`.

```json
{
  "x-api-key": "YOUR_API_KEY"
}
```

## What do the methods mean?
- <strong>GET</strong> - Read (Get data from the server)
- <strong>POST</strong> - Create (create new data)
- <strong>PUT</strong> - Update (update existing data)
- <strong>DELETE</strong> - Delete (delete existing data)

## Fun
> If you look up a specific band member, you will also get a random GIF from the tenor API