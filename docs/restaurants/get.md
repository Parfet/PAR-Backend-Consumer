# RESTAURANT API METHOD GET

1. Get All Restaurant

` https://${url}/restaurant`

> ### Request Param

```
status: ENUM<RESTAURANT_AVAILABLE>,
promotions: true 
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
            deleted_at: DateTime,
            promotions: [
                {
                    promotion_id: UUID<promotion_id>,
                    promotion_title: String,
                    promotion_description: String,
                    promotion_condition: String
                }
            ]
        },
    ]
}
```

> ### Error Response

```

```

> ### Notes

-

2. Get Restaurant By Restaurant ID

` https://${url}/restaurant/:restaurant_id/info`

> ### Method

    GET

> ### Request Param

```

```

> ### Success Response

```
Status 204,
Status 200
{
    restaurants: {
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
        deleted_at: DateTime,
        promotions: [
            {
                promotion_id: UUID<promotion_id>,
                promotion_title: String,
                promotion_description: String,
                promotion_condition: String
            }
        ]
    },
}
```

> ### Error Response

```

```

> ### Notes

-

3. Get Promotion By Restaurant ID

` https://${url}/restaurant/:restaurant_id/promotions`

> ### Method

    GET

> ### Request Param

```

```

> ### Success Response

```
Status 204,
Status 200
{
    promotions: [
        {
            promotion_id: UUID<promotion_id>,
            promotion_title: String,
            promotion_description: String,
            promotion_condition: String
        }
    ]
}
```

> ### Error Response

```

```

> ### Notes

-
