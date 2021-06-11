# PARTY API METHOD DELETE

1. Leave Party

` https://${url}/party/:party_id`

> ### Request Body


> ### Success Response

```
status 200
{
    message: 'leave party success'
}
```

> ### Error Response

```
status 400
{
    message: 'party owner can not leave party'
}
{
    message: 'only member of this party can leave party'
}
status 500
{
    message: 'leave party failed'
}
{
    message: error message
}
```

> ### Notes

-
