# PARTY API METHOD GET

1. Get All Party By Restaurant ID

` https://${url}/party/:restaurant_id`

> ### Request Param

```
{
    status: ENUM<RESTAURANT_AVAILABLE>
}
```

> ### Success Response

```
Status 204,
Status 200
{
    parties: [
        {
            party_id: UUID<party_id>,
            party_name: String,
            head_party: {
                "provider": String,
                "display_name": String,
                "email": String,
                "last_name": String,
                "image_url": String,
                "first_name": String,
                "username": String
            },
            party_type: ENUM<PARTY_TYPE>,
            interested_topic: String,
            max_member: int,
            schedule_time: 2021-04-09T15:51:41.000Z,
            created_at: 2021-04-17T11:47:17.000Z,
            updated_at: 2021-04-17T11:47:17.000Z,
            members: [
                {
                    "provider": String,
                    "display_name": String,
                    "email": String,
                    "last_name": String,
                    "image_url": String,
                    "first_name": String,
                    "username": String
                }
            ],
            interest_tags: [
                {
                    value: UUID<tag_id>,
                    label: String,
                },
            ],
        }
    ]
}
```

> ### Error Response

```
Status 500
{
    message: "User not found"
}
```

> ### Notes

- wait jwt authen

2. Get Request Join Party List

` https://${url}/party/info/:party_id/join`

> ### Request Param

```

```

> ### Success Response

```
Status 204,
Status 200
{
    request: [
        {
            "party_id": UUID<party_id>,
            "user_id": UUID<user_id>,
            "display_name": String,
            "rating": int,
            "image_url": String,
            "status": ENUM<>
        }
    ]
}
```

> ### Error Response

```
Status 400
{
    message: Party not found
}
Status 403
{
    message: Permission Denied
}
Status 500
{
    message: User not found
}
```

> ### Notes

-

3. Get Party By Party Id

` https://${url}/party/info/:party_id`

> ### Request Param

```

```

> ### Success Response

```
{
    party: {
        party_id: UUID<party_id>,
        party_name: String,
        head_party: {
            "provider": String,
            "display_name": String,
            "email": String,
            "last_name": String,
            "image_url": String,
            "first_name": String,
            "username": String
        },
        party_type: ENUM<PARTY_TYPE>,
        interested_topic: String,
        max_member: int,
        schedule_time: 2021-04-09T15:51:41.000Z,
        created_at: 2021-04-17T11:47:17.000Z,
        updated_at: 2021-04-17T11:47:17.000Z,
        members: [
            {
                "provider": String,
                "display_name": String,
                "email": String,
                "last_name": String,
                "image_url": String,
                "first_name": String,
                "username": String
            }
        ],
        interest_tags: [
            {
                value: UUID<tag_id>,
                label: String,
            },
        ],
    }
}
```

> ### Error Response

```
Status 500
{
    message: "User not found"
}
```

> ### Notes

-

4. Get All Tags

` https://${url}/party/tags`

> ### Request Param

```

```

> ### Success Response

```
{
    tags: [
        {
            value: UUID<tag_id>,
            label: String
        }
    ]
}
```

> ### Error Response

```

```

> ### Notes

-

5. Get All Party By user id

` https://${url}/party/me`

> ### Request Param

```

```

> ### Success Response

```
Status 204,
Status 200
{
    "parties": [
        {
            "party_id": String,
            "party_name": String,
            "head_party": {
                "provider": String,
                "display_name": String,
                "email": String,
                "last_name": String,
                "image_url": String,
                "first_name": String,
                "username": String"
            },
            "party_type": String,
            "interested_topic": String,
            "max_member": int,
            "schedule_time": String,
            "created_at": datetime,
            "updated_at": datetime,
            "archived_at": datetime,
            "members": [
                {
                    "provider": String,
                    "display_name": String,
                    "email": String,
                    "last_name": String,
                    "image_url": String,
                    "first_name": String,
                    "username": String"
                }
            ],
            "interested_tags": [
                {
                    value: UUID<tag_id>,
                    label: String
                }
            ],
            "restaurant": {
                "restaurant_name": String,
                "restaurant_photo_ref": String
            },
        }
    ]
}
```

> ### Error Response

```
Status 500
{
    message: User not found
}
```

> ### Notes

-
