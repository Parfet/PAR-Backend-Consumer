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
            passcode: String,
            party_type: ENUM<PARTY_TYPE>,
            interested_topic: String,
            max_member: int,
            schedule_time: 2021-04-09T15:51:41.000Z,
            created_at: 2021-04-17T11:47:17.000Z,
            archived_at: 2021-04-17T11:47:17.000Z,
            members: [
                {
                    user_id: UUID<user_id>,
                    username: String,
                    email: Strin,
                    first_name_th: String,
                    last_name_th: String,
                    first_name_en: String
                    last_name_en: String,
                    tel_no: String,
                    verify_status: bool,
                    created_at: DateTime,
                    updated_at: DateTime,
                    archived_at: DateTime,
                    deleted_at: DateTime,
                    image_url: String,
                },
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
            party_id: UUID<party_id>,
            user_id: UUID<user_id>,
            status: ENUM<PARTY_STATUS>,
            rating: float
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
        passcode: String,
        party_type: ENUM<PARTY_TYPE>,
        interested_topic: String,
        interested_tag: UUID<tag_id>[],
        max_member: int,
        schedule_time: 2021-04-09T15:51:41.000Z,
        created_at: 2021-04-29T19:18:42.000Z,
        archived_at: null,
        updated_at: null,
        members: [
            {
                user_id: UUID<user_id>,
                username: String,
                email: String,
                password: String,
                first_name_th: String,
                last_name_th: String,
                first_name_en: String,
                last_name_en: String,
                tel_no: String,
                verify_status: bool,
                created_at: 2021-04-24T18:50:18.000Z,
                updated_at: 2021-07-29T18:50:18.000Z,
                archived_at: 2021-08-29T18:50:18.000Z,
                deleted_at: null,
                image_url: null
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
    parties: [
        {
            party_id: UUID<party_id>,
            party_name: String,
            head_party: {
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
            passcode: String,
            party_type: ENUM<PARTY_TYPE>,
            interested_topic: String,
            max_member: int,
            schedule_time: DateTime,
            created_at: DateTime,
            archived_at: DateTime,
            updated_at: DateTime,
            members: [
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
                }
            ],
            interest_tags: [
                {
                    value: UUID<tag_id>,
                    label: String
                },
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
