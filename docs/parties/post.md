# PARTY API METHOD POST

1. Create Party

` https://${url}/party/:restaurant_id`

> ### Request Body

```
{
    party_name: String,
    party_type: enum(PRIVATE, PUBLIC),
    passcode: String length 6,
    interested_topic: String,
    interest_tags: [ UUID<interest_tag_id> ],
    max_member: int,
    schedule_time: DateTime
}
```

> ### Success Response

```
Status 200
{
    party_id: UUID<party_id>
}
```

> ### Error Response

```
Status 400
{
    message: Invalid Request
}
{
    message: Owner party invalid,
}
{
    message: party type cannot be null,
}
{
    message: party name cannot be null,
}
{
    message: interest topic can not be null
},
{
    message: interest tag can not be null
},
{
    message: max maxber cannot be null,
}
{
    message: schedule time cannot be null
}
Status 500
{
    message: User not found
}
```

> ### Notes

-

2. Join Party

` https://${url}/party/info/:party_id/join`

> ### Request Body

```
{
    user_id: UUID<user_id>,
    passcode: String
}
```

> ### Success Response

```
{
    message: Request Success
}
```

> ### Error Response

```
Status 400
{
    message: User not found
}
{
    message: Party not found
}
{
    message: Passcode incorrect
}
{
    message: You already request to join this party
}
{
    message: Party Member Limit
}
Status 500
{
    message: Cannot join party
}
```

> ### Notes

-

3. Archived Party

` https://${url}/party/info/:party_id`

> ### Request Body

```
{
    user_id: UUID<user_id>
}
```

> ### Success Response

```
{
    message: archive success
}
```

> ### Error Response

```
Status 403
{
    message: Permission Denied
}
Status 500
{
    message: archive failed
}
```

> ### Notes

-

4. Quick Join

` https://${url}/party/quick-join`

> ### Request Body

```

```

> ### Success Response

```
Status 204,
Status 200
{
    "party_id": UUID<PARTY>,
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
    "created_at": String,
    "updated_at": null,
    "member_amount": int,
    "interest_tags": [
        {
            "value": String,
            "label": String"
        },
    ],
    "restaurant": {
        "restaurant_name": String
        "restaurant_photo_ref": String
    }
}
```

> ### Error Response

```
Status 400
{
    message: 'bad request'
}
Status 500
{
    message: string
}
```

> ### Notes

-

5. Check Status

` https://${url}/party/check`

> ### Request Body

```
{
    party_id: UUID<Party>
}
```

> ### Success Response

```
Status 204,
Status 200
{
    status: "ACCEPT" || "DECLINE" || "WAITING"
}
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
