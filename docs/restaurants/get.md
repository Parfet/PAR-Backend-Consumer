# RESTAURANT API METHOD GET

1. Get All Restaurant

` https://${url}/restaurant`

> ### Request Param

```
lat: float[optional],
lng: float[optional],
keyword: String<search_word>[optional]
```

> ### Success Response

```
Status 204
Status 200
{
    restaurants: [
        {
            "business_status": String,
            "geometry": {
                "location": {
                    "lat": float,
                    "lng": float
                },
                "viewport": {
                    "northeast": {
                        "lat": float,
                        "lng": float
                    },
                    "southwest": {
                        "lat": float,
                        "lng": float
                    }
                }
            },
            "icon": String,
            "icon_background_color": String,
            "icon_mask_base_uri": String,
            "name": String,
            "opening_hours": {
                "open_now": bool
            },
            "photos": [
                {
                    "height": int,
                    "html_attributions": [
                        String html tag
                    ],
                    "photo_reference": String,
                    "width": int
                },
            ],
            "place_id": String,
            "plus_code": {
                "compound_code": String,
                "global_code": String
            },
            "rating": float,
            "reference": String,
            "scope": String,
            "types": <String>[],
            "user_ratings_total": float,
            "vicinity": String,
            "map_url": String
        },
    ]
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
    "restaurant": {
        "restaurant_id": String,
        "restaurant_name": String,
        "created_at": datetime with timezone,
        "lat": float,
        "lng": float,
        "restaurant_photo_ref": String,
    }
}
```

> ### Error Response

```

```

> ### Notes

-
