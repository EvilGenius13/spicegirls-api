# Song Example Overview
Here are some song route examples to get you started.

## Demo API Key
> You can use this API key to make requests to the API without registering for an account.

<strong>05de2a10cde0aaf02727f41da2efedc9699887029d2c88fbca69fa7e8aed2611</strong>

### Song Route Examples
<div style='color: green'>
GET /api/v1/spicegirls/songs
</div>

```json
Response: 200 OK
[
    {
        "_id": "644fc748878b604a9db7b2b1",
        "name": "Wannabe"
    },
    {
        "_id": "644fc89dc11fcd81ec6d7cd4",
        "name": "Say You'll Be There"
    }, ...
]
```
<div style='color: green'>
GET /api/v1/spicegirls/songs/644fc748878b604a9db7b2b1
</div>

```json
Response: 200 OK
{
    "_id": "644fc748878b604a9db7b2b1",
    "name": "Wannabe",
    "length": "2:53",
    "album": {
        "_id": "644c1e2fddbf13d33a8c23b4",
        "name": "Spice",
        "releaseDate": "1996"
    },
    "__v": 0
}
```
<div style='color: orange'>
POST /api/v1/spicegirls/songs?apiKey="Your API Key"
</div>
<strong>You need an API key for this request.</strong>
<span>You need an album ID to create a song</span>

```json
Body:
{
    "name": "Wannabe",
    "length": "2:53",
    "album": "644c1e2fddbf13d33a8c23b4"
}
```

<div style='color: blue'>
PUT /api/v1/spicegirls/songs/644fc748878b604a9db7b2b1?apiKey="Your API Key
</div>
<strong>You need an API key for this request.</strong>

```json
Body:
{
    "name": "Wannabees"
}
```

<div style='color: red'>
DELETE /api/v1/spicegirls/songs/644fc748878b604a9db7b2b1?apiKey="Your API Key
</div>
<strong>You need an API key for this request.</strong>

```json
{
    "Success": "Song deleted successfully"
}
```