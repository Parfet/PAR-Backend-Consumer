# PARTY API METHOD GET

1. Update Party Info

` https://${url}/party/info/:party_id`

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
      schedule_time: 2021-04-24T18:50:18.000Z,
    },
}
```

> ### Success Response

```
{
    message: update success
}
```

> ### Error Response

```
Status 403
{
    message: Permission Denied
}
Status 400
{
    message: Party not found
}
{
    message: User not found
}
{
    message: Party type invalid
}
{
    message: Private party must have passcode
}
Status 500 
{
    message: update failed
}
```

> ### Notes

-

2. Handle Member Request

` https://${url}/party/info/:party_id/join`

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
    message: update success
}
```

> ### Error Response

```
Status 400
{
    message: Status is invalid
}
{
    message: User is invalid
}
{
    message: User not found
}
{
    message: update failed
}
Status 500
{
    message: update failed
}

```

> ### Notes

-
