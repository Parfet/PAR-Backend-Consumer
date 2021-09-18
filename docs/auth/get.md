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
        "email": STRING
        "last_name": STRING
        "provider": STRING
        "username": STRING
        "display_name": STRING
        "first_name": STRING
        "image_url": STRING
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
