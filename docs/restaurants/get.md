# RESTAURANT API METHOD GET

1. Get All Restaurant

` https://${url}/restaurant`

> ### Request Param

```

```

> ### Success Response

```
{
    restaurants: [
        {
            restaurant_id: UUID<restaurant_id>,
            restaurant_name: String,
            email: String,
            password: String,
            tel_no: String,
            verify_status: bool,
            status: ENUM<RESTAURANT_AVAILABLE>,
            opened_time: Time,
            closed_time: Time,
            created_at: DateTime,
            updated_at: DateTime,
            deleted_at: DateTime
        },
    ]
}
```

> ### Error Response

```

```

> ### Notes

-
