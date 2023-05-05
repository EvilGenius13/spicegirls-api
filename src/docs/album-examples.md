# Album Example Overview
Here are some album route examples to get you started.

## Demo API Key
> You can use this API key to make requests to the API without registering for an account.

<strong>05de2a10cde0aaf02727f41da2efedc9699887029d2c88fbca69fa7e8aed2611</strong>

### Album Route Examples
<div style='color: green'>
GET /api/v1/spicegirls/albums
</div>

```json
Response: 200 OK
[
    {
        "_id": "644c1e2fddbf13d33a8c23b4",
        "name": "Spice",
        "releaseDate": "1996"
    },
    {
        "_id": "644c1e47ddbf13d33a8c23b6",
        "name": "Spiceworld",
        "releaseDate": "1997"
    }, ...
]
```
<div style='color: green'>
GET /api/v1/spicegirls/albums/644c1e2fddbf13d33a8c23b4
</div>

```json
Response: 200 OK
{
    "_id": "644c1e2fddbf13d33a8c23b4",
    "name": "Spice",
    "releaseDate": "1996",
    "__v": 15,
    "songs": [
        {
            "_id": "644fc748878b604a9db7b2b1",
            "name": "Wannabe",
            "length": "2:53"
        },
        {
            "_id": "644fc89dc11fcd81ec6d7cd4",
            "name": "Say You'll Be There",
            "length": "3:55"
        }, ...

    ], "bandMembers": [
        {
            "_id": "644c0e3ab948144751347168",
            "name": "Scary Spice"
        },
        {
            "_id": "644c1ce57e5905db07095e41",
            "name": "Baby Spice"
        }, ...
    ] 
}
```
<div style='color: orange'>
POST /api/v1/spicegirls/albyms?apiKey="Your API Key"
</div>
<strong>You need an API key for this request.</strong>

```json
Body:
{
    "name": "Spice Girls Reunion",
    "releaseDate": "2023"
}
```

<div style='color: blue'>
PUT /api/v1/spicegirls/songs/644fc748878b604a9db7b2b1?apiKey="Your API Key
</div>
<strong>You need an API key for this request.</strong>
<br>
<span>On top of regular changes like name/release date, you can also add band members by ID. This is done in an array. You can pass in 1 or more at a time.</span>

```json
Body:
{
    "bandMembers": ["644c0e3ab948144751347168"]
}
OR
{
    "bandMembers": ["644c0e3ab948144751347168", "644c1ce57e5905db07095e41"]
}
```

<div style='color: red'>
DELETE /api/v1/spicegirls/songs/644fc748878b604a9db7b2b1?apiKey="Your API Key
</div>
<strong>You need an API key for this request.</strong>

```json
Response: 200 OK
{
    "Success": "Album deleted successfully"
}
```