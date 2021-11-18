# AUTH API METHOD GET

1. Check Is User Existed

` https://${url}/auth/check`

> ### Method

    GET

> ### Success Response

```
{
    is_user_existed: false,
}
{
    user: {
        "email": String,
        "last_name": String,
        "provider": String,
        "username": String,
        "display_name": String,
        "first_name": String,
        "image_url": String,
    }
}
```

> ### Error Response

```
Status 500
{
    message: "token is expire"
}
{
    message: "invalid signature token"
}
```

> ### Notes

-
