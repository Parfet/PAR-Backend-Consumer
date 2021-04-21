# USER API

1. Get All User

` https://${url}/user/`

> ### Method

    GET

> ### Request Body

```

```

> ### Success Response

```
{
    "users": [
        {
            "user_id": UUID,
            "username": String,
            "email": String,
            "password": String,
            "first_name_th": String,
            "last_name_th": String,
            "first_name_en": String,
            "last_name_en": String,
            "tel_no": String,
            "verify_status": bool,
            "created_at": "2021-04-17T11:45:49.767Z",
            "updated_at": "2021-04-18T11:45:49.000Z",
            "archived_at": "2021-04-20T11:45:49.000Z",
            "deleted_at": "2021-04-20T11:45:49.000Z",
            "image_url": String
        },
    ]
}
```

> ### Error Response

```

```

> ### Notes

-

i. template

` https://${url}/user/`

> ### Method

    GET

> ### Request Body

```

```

> ### Success Response

```

```

> ### Error Response

```

```

> ### Notes

-
