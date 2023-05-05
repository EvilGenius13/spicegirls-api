## Models

| Model | Description |
| :--- | :--- |
| Users | A user of the API
| Band-Members | Members of the group
| Albums | All albums released by the group
| Songs | All songs released by the group


## Model Attributes


### User Model
| Attribute | Type | Description |
| :--- | :--- | :--- |
id | Integer | Unique identifier for the user
username | String | Username of the user
password | String | Password of the user
email | String | Email of the user
apiKey | String | Users unique API Key

### Band-Member Model
| Attribute | Type | Description |
| :--- | :--- | :--- |
| id | Integer | Unique identifier for the band member
| name | String | Nickname of the band member
| realName | String | Real name of the band member
| dateOfBirth | String | Band members date of birth
| albums | Array | Array of albums the band member has been on

### Album Model
| Attribute | Type | Description |
| :--- | :--- | :--- |
| id | Integer | Unique identifier for the album
| name | String | Name of the album
| releaseDate | String | Date the album was released
| songs | Array | Array of songs on the album
| bandMembers | Array | Array of band members on the album


### Song Model
| Attribute | Type | Description |
| :--- | :--- | :--- |
| id | Integer | Unique identifier for the song
| name | String | Name of the song
| length | String | Length of the song
| album | Object | Album the song is on