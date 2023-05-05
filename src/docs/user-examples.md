# User Example Overview
You will find information to navigate user routes here.

## User JWT Token
Logging in and getting information as a user is slightly different than using an API key for other routes. You will need to use a JWT token to access your user dashboard. You can get a JWT token by logging in as a user.

Your first step should be to register for an account. You can do this by sending a POST request to the `/api/v1/spicegirls/users/signup` route. You will need to provide a username, email, and password in the body of the request.

### User Route Examples
<div style='color: orange'>
POST /api/v1/spicegirls/users/signup"
</div>
<em>This is where you will register for an account</em>

```json
Body:
{
    "username": "Jaina",
    "password": "alliance",
    "email": "mage@easternkingdoms.com"
}
```

```json
Response: 201 Created
{
    "message": "User created successfully",
    "apiKey": "YOUR KEY WILL APPEAR HERE"
}
```

<div style='color: orange'>
POST /api/v1/spicegirls/users/login
</div>
<em>This is where you will login to get the JWT token necessary to see your dashboard</em>
<br>
<strong>Make sure you copy your JWT Token</strong>

```json
Body:
{
    "email": "mage@easternkingdoms.com",
    "password": "alliance"
}
```

```json
Response: 200 OK
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDUyODIyOGQ3ZjkwZWZiYWZkYzUyOTkiLCJlbWFpbCI6Im1hZ2VAZWFzdGVybmtpbmdkb21zLmNvbSIsImlhdCI6MTY4MzEyOTI0MiwiZXhwIjoxNjgzMTMyODQyfQ._6qBl_-HE2bfHRe34Dx4j7_RhzbVS52TA1dB7ouDuoA",
}
```

<div style='color: green'>
GET /api/v1/spicegirls/users/dashboard
</div>
<em>This is where you can find your information and API key if you need it again.</em>
<strong>You need your JWT token for this request.</strong>

```json
Body:
{
    "email": "mage@easternkingdoms.com",
    "password": "alliance"
}
```

```json
Response: 200 OK
{
    "username": "Jaina",
    "email": "mage@easternkingdoms.com",
    "apiKey": "API KEY WILL APPEAR HERE"
}
```

<div style='color: green'>
GET /api/v1/spicegirls/users/metrics
</div>
<em>This is where you can see how many times each route has been visited.</em>
<strong>You need your JWT token for this request.</strong>

```json
Response: 200 OK
[
    {
        "_id": "6453d2abe48fb9599be3330d",
        "route": "/api/v1/spicegirls/songs",
        "count": 4
    },
    {
        "_id": "6453d33925375efae1e9c5b1",
        "route": "/api/v1/spicegirls/albums",
        "count": 0
    },
    {
        "_id": "6453d34125375efae1e9c5b8",
        "route": "/api/v1/spicegirls/songs/6452ae5efdb6251a7c90d367",
        "count": 4
    }, ...
]
```