# AUTH API METHOD POST

1. Request Register Token

` https://${url}/auth/token`

> ### Request Body

```
{
    user_id: UUID<user_id>
}
```

> ### Success Response

```
{
    access_token: String,
    refresh_token: String
}
```

> ### Error Response

```
Status 400
{
    "message": "jwt must be provided"
}
{
    "message": "jwt expired"
}
```

> ### Notes

-

2. Refresh Token

` https://${url}/auth/refresh`

> ### Header
```
{
    Authorization: Bearer ${token}
}
```

> ### Request Body

```
{
    refresh_token: Bearer token
}
```

> ### Success Response

```
{
    access_token: String,
    refresh_token: String
}
```

> ### Error Response

```
Status 400
{
{
    "message": "jwt must be provided"
}
{
    "message": "jwt expired"
}
}
```

> ### Notes

-
