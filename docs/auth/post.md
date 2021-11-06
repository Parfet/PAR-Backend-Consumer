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
    username: STRING,
    email: STRING,
    provider: STRING,
    display_name: STRING,
    first_name: STRING,
    last_name: STRING,
    image_url: STRING<URL>,
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
Status 500
{
    message: ${err_message}
}
```

> ### Notes

-
