# PARTY API

1. Get All Party

` https://${url}/api/party/`

> ### Method

    GET

> ### Request Body

```

```

> ### Success Response

```
{
    "parties": [
        {
            "party_id": UUID,
            "party_name": String,
            "passcode": String,
            "party_type": enum "PRIVATE", "PUBLIC",
            "interested_topic": String,
            "interested_tag": [ UUID<interest_tag_id> ],
            "max_member": int,
            "schedule_time": "2021-04-09T15:51:41.000Z",
            "created_at": "2021-04-17T11:47:17.000Z",
            "archived_at": "2021-04-17T11:47:17.000Z",
            "member": [ UUID<user_id>],
            "head_party_user_id": UUID
        }
    ]
}
```

> ### Error Response

```

```

> ### Notes

- wait jwt authen


2. Create Party

` https://${url}/party/`

> ### Method

    POST

> ### Request Body

```
{
    "head_party": UUID<user_id>,
    "party_name": String,
    "party_type": enum("PRIVATE", "PUBLIC"),
    "passcode": String length 6,
    "interested_topic": String,
    "interested_tag": [ UUID<interest_tag_id> ],
    "max_member": int,
    "schedule_time": "2021-04-09 22:51:41"
}
```

> ### Success Response

```
{
    "party": {
        "archived_at": null,
        "party_id": "c9120d19-27fe-46ee-931f-5c9847112af0",
        "party_name": "Hola test",
        "passcode": "123456",
        "party_type": "PRIVATE",
        "interested_topic": "test",
        "interested_tag": [],
        "max_member": 1,
        "schedule_time": "2021-04-09T15:51:41.000Z",
        "created_at": "2021-04-21T14:55:56.000Z",
        "member": null,
        "headPartyUserId": null
    }
}
```

> ### Error Response

```
{
    "message": "Invalid Request"
}

 {
     "message": {
        "message": [
            "Owner party invalid",
            "party type cannot be null",
            "party name cannot be null",
            "interest topic can not be null",
            "interest tag can not be null",
            "max maxber cannot be null",
            "schedule time cannot be null
        ]
    }
 }
```

> ### Notes

-

i. template

` https://${url}/api`

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
