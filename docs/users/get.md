# USER API METHOD GET

1. Get  User Detail

` https://${url}/user/me`

> ### Request Body

```

```

> ### Success Response

```
{
    "user": {
        "user_id": String,
        "provider": String,
        "display_name": String,
        "email": String,
        "last_name": String,
        "image_url": String,
        "first_name": String,
        "username": String,
    },
    "interested_tag": [
        {
            "tag_id": String,
            "tag_name": String
        }
    ]
}
```

> ### Error Response

```

```

> ### Notes

-
