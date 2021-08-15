# AUTH API METHOD GET

1. Check Is User Existed

` https://${url}/auth/check`

> ### Method

    GET

> ### Success Response

```
{
    is_user_existed: true || false,
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
