# USER API METHOD PATCH

1. update user info

` https://${url}/user/me`

> ### Request Body

```
{
    "display_name": string [optional],
    "interested_tag" <string>[] [optional],
}
```

> ### Success Response

```
Status 200
```

> ### Error Response

```
Status 500
{
    message: string
}
```

> ### Notes

-
