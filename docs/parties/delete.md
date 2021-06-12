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

2. Remove Party Member

` https://${url}/party/info/:party_id/member`

> ### Request Body

{
    user_id: UUID<user_id>
}
> ### Success Response

```
status 200
{
    message: 'remove member success'
}
```

> ### Error Response

```
status 400
{
    message: 'required user target'
}
{
    message: 'party not found'
}
{
    message: 'party owner can not remove own account from party'
}
{
    message: 'only member of this party can be remove'
}
status 403
{
    message: 'Permission Denied'
}
status 500
{
    message: 'remove member failed'
}
{
    message: error message
}
```

> ### Notes

-
