# A test task for ChatBot.Studio intership
## Simple school API

Use ```JSON``` file format for your requests' body

### Overwiev 
 - [Auth](#auth)
 - [Basic routes](#basic-routes)

### Auth 
To authenricate this use JSON web token.   
Simply add this to your headers and you will be able to use any routes.

```Authorization : Bearer {TOKEN}```

To get the token you need to make a ```POST``` request on ```/auth/register``` with fields

| __Name__ | __Type__ | __Required__ |
| --- | --- | --- |
| login | string | + |
| password | string | + |

__Be aware__ that login mist be unique

Sample response 
```json
{
    "message": "You are succesfully registered. Please login to get your JWT"
}
```

than ```POST``` ```/auth/login``` with the same fields and you will get a token.

Sample response 
```json
{
    "token": "TOKEN",
    "user": {
        "user_id": "ID",
        "iat": 1580301086,
        "exp": 1582893086
    }
}
```

### Basic routes

For each entity there is at least 4 routes to interact with

| __Method__ | __Route__ | __Description__ |
| --- | --- | --- |
| ```GET``` | ```/{entityName}/:id``` | Finds the entity by ```id``` |
| ```DELETE``` | ```/{entityName}/:id``` | Deletes the entity by ```id``` |
| ```PUT``` | ```/{entityName}/:id``` | Updates the entity by ```id```. For each entity you can not update certain fields. More about it further |
| ```POST``` | ```/{entityName}/new``` | Create new entity |
