# Band-Member Example Overview
Here are some band-member route examples to get you started.

## Demo API Key
> You can use this API key to make requests to the API without registering for an account.

<strong>05de2a10cde0aaf02727f41da2efedc9699887029d2c88fbca69fa7e8aed2611</strong>

### Band Member Route Examples
<div style='color: green'>
GET /api/v1/spicegirls/band-members
</div>

```json
Response: 200 OK
[
    {
        "_id": "644c0e3ab948144751347168",
        "name": "Scary Spice"
    },
    {
        "_id": "644c1ce57e5905db07095e41",
        "name": "Baby Spice"
    }, ...
]
```
<div style='color: green'>
GET /api/v1/spicegirls/band-members/644c1ce57e5905db07095e41
</div>

```json
Response: 200 OK
{
    "_id": "644c1ce57e5905db07095e41",
    "name": "Baby Spice",
    "realName": "Emma Bunton",
    "dateOfBirth": "January 1 1976"
}
```
<div style='color: orange'>
POST /api/v1/spicegirls/band-members?apiKey="Your API Key"
</div>
<strong>You need an API key for this request.</strong>

```json
Body:
{
    "name": "Mage Spice",
    "realName": "Jaina Proudmoore",
    "dateOfBirth": "December 10 1987"
}
```

<div style='color: blue'>
PUT /api/v1/spicegirls/band-members/644c1ce57e5905db07095e41?apiKey="Your API Key
</div>
<strong>You need an API key for this request.</strong>

```json
Body:
{
    "name": "Magus Spice",
}
```

<div style='color: red'>
DELETE /api/v1/spicegirls/band-members/644c1ce57e5905db07095e41?apiKey="Your API Key
</div>
<strong>You need an API key for this request.</strong>

```json
{
    "Success": "Band member deleted successfully"
}
```