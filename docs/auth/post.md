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

3. Register by Firebase Authentication

` https://${url}/auth/register`

> ### HEADER
```
{
    Authorization: JWT Token,
}
```

> ### Request Body

```
{
    username: String,
    email: String,
    provider: String,
    display_name: String,
    first_name: String,
    last_name: String,
    image_url: String<URL>,
    accept_term_of_use: boolean
    interested_tag: <INTEREST_TAG:UUID>[] [optional]
}
```

> ### Success Response

```
Status 204
```

> ### Error Response

```
Status 400
{
    message: "you have already register"
}
{
    message: "accept my term of use for happy with my system :)"
}
{
    message: "username already use"
}
{
    message: "display name already use"
}
Status 500
{
    message: String
}
```

> ### Notes

-
