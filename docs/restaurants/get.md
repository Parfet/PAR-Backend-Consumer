# RESTAURANT API METHOD GET

1. Get All Restaurant

` https://${url}/restaurant`

> ### Request Param

```
lat: float,
lng: float,
keyword: String<search_word>[optional]
```

> ### Success Response

```
{
    restaurants: [
        {
            "business_status": "OPERATIONAL",
            "geometry": {
                "location": {
                    "lat": 13.6581725,
                    "lng": 100.5054476
                },
                "viewport": {
                    "northeast": {
                        "lat": 13.65952232989272,
                        "lng": 100.5067974298927
                    },
                    "southwest": {
                        "lat": 13.65682267010728,
                        "lng": 100.5040977701073
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            "icon_background_color": "#FF9E67",
            "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
            "name": "ร้านเจ๊แดง'ข้าวแกงริมคลอง",
            "opening_hours": {
                "open_now": false
            },
            "photos": [
                {
                    "height": 2560,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/101690176866199820495\">A Google User</a>"
                    ],
                    "photo_reference": "Aap_uEBmeqZ2saylcnHQJRv-BbTbMqATQ-O74r_GAvwwqhOtSe0EtCkJ9adrNPGs0uBK2kQo6mifGNhx4DDrhu4_YUNdk9j6wddO7OIh3etXQSpny2mFK6QYdFDuDgMdOyTPXW9XJEc3GQenBUJ30-quNZh5HQThmstsLqnwMEb0V7tQFFGy",
                    "width": 1920
                }
            ],
            "place_id": "ChIJgY_Co0ei4jARSkI3irVniJ8",
            "plus_code": {
                "compound_code": "MG54+75 Bangkok",
                "global_code": "7P52MG54+75"
            },
            "rating": 4.4,
            "reference": "ChIJgY_Co0ei4jARSkI3irVniJ8",
            "scope": "GOOGLE",
            "types": [
                "restaurant",
                "food",
                "point_of_interest",
                "establishment"
            ],
            "user_ratings_total": 11,
            "vicinity": "141/687 Soi Pracha Uthit 33, Bang Mot, Thung Khru"
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
