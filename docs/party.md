# PARTY API

1. Get All Party By Restaurant ID

` https://${url}/party/:restaurant_id`

> ### Method

    GET

> ### Request Body

```

```

> ### Success Response

```
Status 204,
Status 200
{
    "parties": [
        {
            "party_id": UUID,
            "party_name": String,
            "passcode": String,
            "party_type": ENUM<PARTY_TYPE>,
            "interested_topic": String,
            "interested_tag": [ UUID<interest_tag_id> ],
            "max_member": int,
            "schedule_time": "2021-04-09T15:51:41.000Z",
            "created_at": "2021-04-17T11:47:17.000Z",
            "archived_at": "2021-04-17T11:47:17.000Z",
            "members": [ UUID<user_id>],
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

` https://${url}/party/:restaurant_id`

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
Status 200
{
    "party_id": UUID<party_id>
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

3. Get Request Join Party List

` https://${url}/party/info/:party_id/join`

> ### Method

    GET

> ### Request Body

```

```

> ### Success Response

```
Status 204,
Status 200
{
    "request": [
        {
            "party_id": UUID<party_id>,
            "user_id": UUID<user_id>,
            "status": ENUM<PARTY_STATUS>,
            "rating": float
        }
    ]
}
```

> ### Error Response

```
Status 400
{
    "message": "Party not found"
}
Status 403
{
    "message": "Permission Denied"
}
```

> ### Notes

-

4. Join Party

` https://${url}/party/info/:party_id/join`

> ### Method

    POST

> ### Request Body

```
{
    "user_id": UUID<user_id>,
    "passcode": String
}
```

> ### Success Response

```
{
    "message": "Request Success"
}
```

> ### Error Response

```
Status 400
{
    "message": [
        "User not found",
        "Party not found",
        "Passcode incorrect"
    ]
}
Status 500
{
    "message": "Cannot join party"
}
```

> ### Notes

-

5. Archived Party

` https://${url}/party/info/:party_id`

> ### Method

    POST

> ### Request Body

```
{
    "user_id": UUID<user_id>
}
```

> ### Success Response

```
{
    "message": "archive success"
}
```

> ### Error Response

```
Status 403
{
    "message": "Only party owner can close party."
}
Status 500
{
    "message": "archive failed"
}
```

> ### Notes

-

6. Get Party By Party Id

` https://${url}/party/info/:party_id`

> ### Method

    GET

> ### Request Body

```

```

> ### Success Response

```
{
    "party": {
        "party_id": UUID<party_id>,
        "party_name": String,
        "head_party": UUID<user_id>,
        "passcode": String,
        "party_type": ENUM<PARTY_TYPE>,
        "interested_topic": String,
        "interested_tag": UUID<tag_id>[],
        "max_member": int,
        "schedule_time": "2021-04-09T15:51:41.000Z",
        "created_at": "2021-04-29T19:18:42.000Z",
        "archived_at": null,
        "updated_at": null,
        "members": [
            {
                "user_id": UUID<user_id>,
                "username": String,
                "email": String,
                "password": String,
                "first_name_th": String,
                "last_name_th": String,
                "first_name_en": String,
                "last_name_en": String,
                "tel_no": String,
                "verify_status": bool,
                "created_at": "2021-04-24T18:50:18.000Z",
                "updated_at": "2021-07-29T18:50:18.000Z",
                "archived_at": "2021-08-29T18:50:18.000Z",
                "deleted_at": null,
                "image_url": null
            }
        ]
    }
}
```

> ### Error Response

```

```

> ### Notes

-

7. Update Party Info

` https://${url}/party/info/:party_id`

> ### Method

    PUT

> ### Request Body

```
{
    {
      party_name: String,
      head_party: UUID<user_id>,
      passcode: String,
      party_type: ENUM<PARTY_TYPE>,
      interested_topic: String,
      interested_tag: UUID<tag_id>[],
      max_member: int,
      schedule_time: "2021-04-24T18:50:18.000Z",
    },
}
```

> ### Success Response

```
{
    "message": "update success"
}
```

> ### Error Response

```
Status 403
{
    "message": "Party not found"
{
    "message": "User not found"
}
{
    "message": "Only member can assign to be party owner."
}
{
    "message": "Party type invalid"
}
{
    "message": "Private party must have passcode"
}
Status 500 
{
    "message": "update failed"
}
```

> ### Notes

-

8. Handle Member Request

` https://${url}/party/info/:party_id/join`

> ### Method

    PUT

> ### Request Body

```
{
    user_id: UUID<user_id>,
    status: ENUM<REQUEST_STATUS>
}
```

> ### Success Response

```
{
    message: "update success"
}
```

> ### Error Response

```
Status 400
{
    message: "Status is invalid"
}
{
    message: "User is invalid"
}
{
    message: "User not found"
}
{
    message: "update failed"
}
Status 500
{
    message: "update failed"
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
