# A test task for ChatBot.Studio intership
## Simple school API

Use ```JSON``` file format for your requests' body

## Overwiev 
 - [Authentication](#authentication)
 - [Errors](#errors)
 - [Basic routes](#basic-routes)
 - [Entities' models](#entities-models)
    - [Lesson](#lesson)
    - [Group](#group)
    - [Student](#student)
    - [Teacher](#teacher)
 - [Restrictions](#restrictions)

## Authentication 
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

Than ```POST``` ```/auth/login``` with the same fields and you will get a token.

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

## Errors

Sample not found error

```javascript
data[property] = value;
return {
  message: `${entity} with such ${property} is not found`,
  data,
};
```

``` GET /student/some_id```

```json
{
    "message": "Student with such id is not found",
    "data": {
        "id": "some_id"
    }
}
```

Error handler

```javascript
const status = err.status || 500;
res.status(status);
res.json({
  status,
  error: {
    message: err.message,
  },
});
```


## Basic routes

For each entity there is at least 4 routes to interact with

| __Method__ | __Route__ | __Description__ |
| --- | --- | --- |
| ```GET``` | ```/{entityName}/search``` | Finds entities with parameters needed. All params have to be included in request query. ```limit``` and ```offset``` are optoinal. Default ones are 10 and 0 accordingly |  
| ```GET``` | ```/{entityName}/:id``` | Finds the entity by ```id``` and returns it|
| ```DELETE``` | ```/{entityName}/:id``` | Deletes the entity by ```id``` and returns it |
| ```PUT``` | ```/{entityName}/:id``` | Updates the entity by ```id``` and returns it. For each entity you can not update certain fields. More about it further |
| ```POST``` | ```/{entityName}/new``` | Create new entity |

Sample search example

```GET /student/search/?name=an```

```json
{
    "count": 1,
    "students": [
        {
            "group": "QAXzfRHb",
            "_id": "A5mca8tj",
            "name": "anrii koval"
        }
    ]
}
```

Sample getting group by id

```GET /group/GW_GzGea```

```json
{
    "group": {
        "students": [
            {
                "group": "GW_GzGea",
                "_id": "w2bTKGgI",
                "name": "newName"
            }
        ],
        "_id": "GW_GzGea",
        "name": "newName",
        "specialisationCode": 121
    }
}
```

## Entities models

__Note__ that required fields have to be submited in request for creating a new entity

### Lesson

| __Property__ | __Type__ | __Required__ |
| --- | --- | --- |
| name | ```String``` | + |
| teacher | ```String(id)``` |+|
| groups | ```String(id)[]``` | - |
| place | ```String``` | - |
| indexNumber | ```Int``` | - |

### Group

| __Property__ | __Type__ | __Required__ |
| --- | --- | --- |
| name | ```String``` | + |
| students |```String(id)[]``` | + |
| specialisationCode | ```Int``` | + |

__Note__ that ```name``` value shiuld be unique for each group

### Student

| __Property__ | __Type__ | __Required__ |
| --- | --- | --- |
| name | ```String``` | + |
| group |```String(id)``` | - |

### Teacher

| __Property__ | __Type__ | __Required__ |
| --- | --- | --- |
| name | ```String``` | + |
| salary |```Int``` | + |
| worksSince |```Date``` | - |


## Restrictions

Editing ```_id``` value for any entity is forbidden

Editing ```group``` property for student and ```students``` for group is foebidden. Use additional route for group. 

| __Method__ | __Route__ | __Description__ |
| --- | --- | --- |
| ```POST``` | ```/group/:id/addStudents``` | Add students to group |
| ```POST``` | ```/group/:id/removeStudents``` | Remove students from group |

In request body provide the list of students' ids than you want to add/remove 

| __Property__ | __Type__ | __Required__ |
| --- | --- | --- |
| students | ```String(id)[]``` | + |


