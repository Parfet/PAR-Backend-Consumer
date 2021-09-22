# USER API METHOD GET

1. Get  User Detail

` https://${url}/user/me`

> ### Request Body

```

```

> ### Success Response

```
{
    users: [
        {
            user_id: UUID<user_id>,
            username: String,
            email: String,
            first_name_th: String,
            last_name_th: String,
            first_name_en: String,
            last_name_en: String,
            tel_no: String,
            verify_status: bool,
            created_at: DateTime,
            updated_at: DateTime,
            archived_at: DateTime,
            deleted_at: DateTime,
            image_url: String
        },
    ]
}
```

> ### Error Response

```

```

> ### Notes

-
