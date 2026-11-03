# CMS API List

Base URL: `/api/v1` · `/admin/*`: admin login required · Proposed API contract.

## 1. GET `/admin/website/sections/brand`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "brand", "revision": 8, "content": {"name": "Kaffen", "tagline": "Coffee & conversation", "logo": "/uploads/logo.png", "favicon": "/uploads/favicon.png"}}}
```

## 2. PUT `/admin/website/sections/brand`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Kaffen", "tagline": "Coffee & conversation", "logo": "/uploads/logo.png", "favicon": "/uploads/favicon.png"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "brand", "revision": 8, "content": {"name": "Kaffen", "tagline": "Coffee & conversation", "logo": "/uploads/logo.png", "favicon": "/uploads/favicon.png"}}}
```

## 3. PATCH `/admin/website/sections/brand`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Kaffen"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "brand", "revision": 8, "content": {"name": "Kaffen", "tagline": "Coffee & conversation", "logo": "/uploads/logo.png", "favicon": "/uploads/favicon.png"}}}
```

## 4. GET `/admin/website/sections/header`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "header", "revision": 8, "content": {"announcement": "Slow moments. Exceptional coffee.", "reserveLabel": "Reserve a table", "accountLabel": "Account", "mobileEyebrow": "Discover Kaffen"}}}
```

## 5. PUT `/admin/website/sections/header`

Request:

```json
{"expectedRevision": 7, "data": {"announcement": "Slow moments. Exceptional coffee.", "reserveLabel": "Reserve a table", "accountLabel": "Account", "mobileEyebrow": "Discover Kaffen"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "header", "revision": 8, "content": {"announcement": "Slow moments. Exceptional coffee.", "reserveLabel": "Reserve a table", "accountLabel": "Account", "mobileEyebrow": "Discover Kaffen"}}}
```

## 6. PATCH `/admin/website/sections/header`

Request:

```json
{"expectedRevision": 7, "data": {"announcement": "Slow moments. Exceptional coffee."}}
```

Response `200`:

```json
{"success": true, "data": {"section": "header", "revision": 8, "content": {"announcement": "Slow moments. Exceptional coffee.", "reserveLabel": "Reserve a table", "accountLabel": "Account", "mobileEyebrow": "Discover Kaffen"}}}
```

## 7. GET `/admin/website/sections/hero`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "hero", "revision": 8, "content": {"eyebrow": "The after-dark collection", "title": "Midnight Roast", "description": "Crafted in the shadows, brewed for the bold.", "primaryLabel": "Explore the Brew", "primaryUrl": "#menu", "secondaryLabel": "Get delivery", "image": "/uploads/midnight-hero.webp", "mobileImage": "/uploads/midnight-mobile.webp", "imageAlt": "Midnight Roast coffee", "discoverLabel": "Scroll to Discover", "discoverUrl": "#about"}}}
```

## 8. PUT `/admin/website/sections/hero`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "The after-dark collection", "title": "Midnight Roast", "description": "Crafted in the shadows, brewed for the bold.", "primaryLabel": "Explore the Brew", "primaryUrl": "#menu", "secondaryLabel": "Get delivery", "image": "/uploads/midnight-hero.webp", "mobileImage": "/uploads/midnight-mobile.webp", "imageAlt": "Midnight Roast coffee", "discoverLabel": "Scroll to Discover", "discoverUrl": "#about"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "hero", "revision": 8, "content": {"eyebrow": "The after-dark collection", "title": "Midnight Roast", "description": "Crafted in the shadows, brewed for the bold.", "primaryLabel": "Explore the Brew", "primaryUrl": "#menu", "secondaryLabel": "Get delivery", "image": "/uploads/midnight-hero.webp", "mobileImage": "/uploads/midnight-mobile.webp", "imageAlt": "Midnight Roast coffee", "discoverLabel": "Scroll to Discover", "discoverUrl": "#about"}}}
```

## 9. PATCH `/admin/website/sections/hero`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "The after-dark collection"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "hero", "revision": 8, "content": {"eyebrow": "The after-dark collection", "title": "Midnight Roast", "description": "Crafted in the shadows, brewed for the bold.", "primaryLabel": "Explore the Brew", "primaryUrl": "#menu", "secondaryLabel": "Get delivery", "image": "/uploads/midnight-hero.webp", "mobileImage": "/uploads/midnight-mobile.webp", "imageAlt": "Midnight Roast coffee", "discoverLabel": "Scroll to Discover", "discoverUrl": "#about"}}}
```

## 10. GET `/admin/website/sections/about`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "about", "revision": 8, "content": {"eyebrow": "About us", "title": "Organic & Fresh Coffee Provider Center", "description": "Coffee, conversation, and memorable moments.", "quote": "A carefully made cup makes a difference.", "quoteImage": "/uploads/founder.png", "image": "/uploads/about.png", "imageAlt": "Fresh coffee beans pouring into a cup"}}}
```

## 11. PUT `/admin/website/sections/about`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "About us", "title": "Organic & Fresh Coffee Provider Center", "description": "Coffee, conversation, and memorable moments.", "quote": "A carefully made cup makes a difference.", "quoteImage": "/uploads/founder.png", "image": "/uploads/about.png", "imageAlt": "Fresh coffee beans pouring into a cup"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "about", "revision": 8, "content": {"eyebrow": "About us", "title": "Organic & Fresh Coffee Provider Center", "description": "Coffee, conversation, and memorable moments.", "quote": "A carefully made cup makes a difference.", "quoteImage": "/uploads/founder.png", "image": "/uploads/about.png", "imageAlt": "Fresh coffee beans pouring into a cup"}}}
```

## 12. PATCH `/admin/website/sections/about`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "About us"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "about", "revision": 8, "content": {"eyebrow": "About us", "title": "Organic & Fresh Coffee Provider Center", "description": "Coffee, conversation, and memorable moments.", "quote": "A carefully made cup makes a difference.", "quoteImage": "/uploads/founder.png", "image": "/uploads/about.png", "imageAlt": "Fresh coffee beans pouring into a cup"}}}
```

## 13. GET `/admin/website/sections/menu`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "menu", "revision": 8, "content": {"eyebrow": "Choose best coffee", "title": "Popular Coffee Menu", "description": "Espresso, filter and signature coffee.", "currency": "USD"}}}
```

## 14. PUT `/admin/website/sections/menu`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "Choose best coffee", "title": "Popular Coffee Menu", "description": "Espresso, filter and signature coffee.", "currency": "USD"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "menu", "revision": 8, "content": {"eyebrow": "Choose best coffee", "title": "Popular Coffee Menu", "description": "Espresso, filter and signature coffee.", "currency": "USD"}}}
```

## 15. PATCH `/admin/website/sections/menu`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "Choose best coffee"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "menu", "revision": 8, "content": {"eyebrow": "Choose best coffee", "title": "Popular Coffee Menu", "description": "Espresso, filter and signature coffee.", "currency": "USD"}}}
```

## 16. GET `/admin/website/sections/journey`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "journey", "revision": 8, "content": {"eyebrow": "From bean to cup", "title": "The coffee journey", "description": "Selection, roasting and the final pour."}}}
```

## 17. PUT `/admin/website/sections/journey`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "From bean to cup", "title": "The coffee journey", "description": "Selection, roasting and the final pour."}}
```

Response `200`:

```json
{"success": true, "data": {"section": "journey", "revision": 8, "content": {"eyebrow": "From bean to cup", "title": "The coffee journey", "description": "Selection, roasting and the final pour."}}}
```

## 18. PATCH `/admin/website/sections/journey`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "From bean to cup"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "journey", "revision": 8, "content": {"eyebrow": "From bean to cup", "title": "The coffee journey", "description": "Selection, roasting and the final pour."}}}
```

## 19. GET `/admin/website/sections/whyUs`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "whyUs", "revision": 8, "content": {"eyebrow": "Why choose us", "title": "Coffee made for extraordinary moments", "description": "Thoughtful sourcing and warm hospitality.", "image": "/uploads/choose.jpg", "imageAlt": "Barista preparing coffee", "buttonLabel": "Explore more", "buttonUrl": "#menu"}}}
```

## 20. PUT `/admin/website/sections/whyUs`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "Why choose us", "title": "Coffee made for extraordinary moments", "description": "Thoughtful sourcing and warm hospitality.", "image": "/uploads/choose.jpg", "imageAlt": "Barista preparing coffee", "buttonLabel": "Explore more", "buttonUrl": "#menu"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "whyUs", "revision": 8, "content": {"eyebrow": "Why choose us", "title": "Coffee made for extraordinary moments", "description": "Thoughtful sourcing and warm hospitality.", "image": "/uploads/choose.jpg", "imageAlt": "Barista preparing coffee", "buttonLabel": "Explore more", "buttonUrl": "#menu"}}}
```

## 21. PATCH `/admin/website/sections/whyUs`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "Why choose us"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "whyUs", "revision": 8, "content": {"eyebrow": "Why choose us", "title": "Coffee made for extraordinary moments", "description": "Thoughtful sourcing and warm hospitality.", "image": "/uploads/choose.jpg", "imageAlt": "Barista preparing coffee", "buttonLabel": "Explore more", "buttonUrl": "#menu"}}}
```

## 22. GET `/admin/website/sections/gallery`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "gallery", "revision": 8, "content": {"eyebrow": "Inside Kaffen", "title": "Coffee gallery", "description": "Our cups, craft and community."}}}
```

## 23. PUT `/admin/website/sections/gallery`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "Inside Kaffen", "title": "Coffee gallery", "description": "Our cups, craft and community."}}
```

Response `200`:

```json
{"success": true, "data": {"section": "gallery", "revision": 8, "content": {"eyebrow": "Inside Kaffen", "title": "Coffee gallery", "description": "Our cups, craft and community."}}}
```

## 24. PATCH `/admin/website/sections/gallery`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "Inside Kaffen"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "gallery", "revision": 8, "content": {"eyebrow": "Inside Kaffen", "title": "Coffee gallery", "description": "Our cups, craft and community."}}}
```

## 25. GET `/admin/website/sections/testimonials`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "testimonials", "revision": 8, "content": {"eyebrow": "Customer feedback", "title": "What Our Clients Say", "description": "Stories from our guests."}}}
```

## 26. PUT `/admin/website/sections/testimonials`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "Customer feedback", "title": "What Our Clients Say", "description": "Stories from our guests."}}
```

Response `200`:

```json
{"success": true, "data": {"section": "testimonials", "revision": 8, "content": {"eyebrow": "Customer feedback", "title": "What Our Clients Say", "description": "Stories from our guests."}}}
```

## 27. PATCH `/admin/website/sections/testimonials`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "Customer feedback"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "testimonials", "revision": 8, "content": {"eyebrow": "Customer feedback", "title": "What Our Clients Say", "description": "Stories from our guests."}}}
```

## 28. GET `/admin/website/sections/statistics`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "statistics", "revision": 8, "content": {"ariaLabel": "Coffee house statistics"}}}
```

## 29. PUT `/admin/website/sections/statistics`

Request:

```json
{"expectedRevision": 7, "data": {"ariaLabel": "Coffee house statistics"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "statistics", "revision": 8, "content": {"ariaLabel": "Coffee house statistics"}}}
```

## 30. PATCH `/admin/website/sections/statistics`

Request:

```json
{"expectedRevision": 7, "data": {"ariaLabel": "Coffee house statistics"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "statistics", "revision": 8, "content": {"ariaLabel": "Coffee house statistics"}}}
```

## 31. GET `/admin/website/sections/booking`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "booking", "revision": 8, "content": {"eyebrow": "A seat for every occasion", "title": "Good company. A table waiting.", "description": "Make a little time for each other.", "buttonLabel": "Plan an Adda Meeting", "background": "/uploads/cta.jpg", "modalTitle": "Adda Meeting", "modalDescription": "Choose your date, time and meeting length.", "submitLabel": "Confirm reservation", "successTitle": "Your Adda Meeting is reserved", "successMessage": "We look forward to welcoming you.", "availabilityNote": "Availability reflects your selected meeting length.", "depositNote": "Deposit online or in person"}}}
```

## 32. PUT `/admin/website/sections/booking`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "A seat for every occasion", "title": "Good company. A table waiting.", "description": "Make a little time for each other.", "buttonLabel": "Plan an Adda Meeting", "background": "/uploads/cta.jpg", "modalTitle": "Adda Meeting", "modalDescription": "Choose your date, time and meeting length.", "submitLabel": "Confirm reservation", "successTitle": "Your Adda Meeting is reserved", "successMessage": "We look forward to welcoming you.", "availabilityNote": "Availability reflects your selected meeting length.", "depositNote": "Deposit online or in person"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "booking", "revision": 8, "content": {"eyebrow": "A seat for every occasion", "title": "Good company. A table waiting.", "description": "Make a little time for each other.", "buttonLabel": "Plan an Adda Meeting", "background": "/uploads/cta.jpg", "modalTitle": "Adda Meeting", "modalDescription": "Choose your date, time and meeting length.", "submitLabel": "Confirm reservation", "successTitle": "Your Adda Meeting is reserved", "successMessage": "We look forward to welcoming you.", "availabilityNote": "Availability reflects your selected meeting length.", "depositNote": "Deposit online or in person"}}}
```

## 33. PATCH `/admin/website/sections/booking`

Request:

```json
{"expectedRevision": 7, "data": {"eyebrow": "A seat for every occasion"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "booking", "revision": 8, "content": {"eyebrow": "A seat for every occasion", "title": "Good company. A table waiting.", "description": "Make a little time for each other.", "buttonLabel": "Plan an Adda Meeting", "background": "/uploads/cta.jpg", "modalTitle": "Adda Meeting", "modalDescription": "Choose your date, time and meeting length.", "submitLabel": "Confirm reservation", "successTitle": "Your Adda Meeting is reserved", "successMessage": "We look forward to welcoming you.", "availabilityNote": "Availability reflects your selected meeting length.", "depositNote": "Deposit online or in person"}}}
```

## 34. GET `/admin/website/sections/contact`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "contact", "revision": 8, "content": {"title": "Let's make time for good conversation.", "description": "Drop in, call, or send us a note.", "address": "55 Main Street, New York", "phone": "+012 (345) 678 99", "email": "info@kaffen.com", "hours": "08:00 am - 09:00 pm", "mapUrl": "https://maps.google.com/", "eyebrow": "Come say hello", "formEyebrow": "Send a note", "formTitle": "What's on your mind?", "responseNote": "We usually reply within one business day.", "consentLabel": "I agree that Kaffen may use these details to reply to my enquiry.", "submitLabel": "Send message", "successTitle": "Your note is on its way.", "successMessage": "Thanks for reaching out.", "visitImage": "/uploads/seating.jpg", "visitImageAlt": "Warm seating inside Kaffen", "hoursNote": "Kitchen closes 30 minutes before the coffee bar.", "topics": ["General enquiry", "Private event", "Reservation", "Wholesale coffee", "Press & partnerships"]}}}
```

## 35. PUT `/admin/website/sections/contact`

Request:

```json
{"expectedRevision": 7, "data": {"title": "Let's make time for good conversation.", "description": "Drop in, call, or send us a note.", "address": "55 Main Street, New York", "phone": "+012 (345) 678 99", "email": "info@kaffen.com", "hours": "08:00 am - 09:00 pm", "mapUrl": "https://maps.google.com/", "eyebrow": "Come say hello", "formEyebrow": "Send a note", "formTitle": "What's on your mind?", "responseNote": "We usually reply within one business day.", "consentLabel": "I agree that Kaffen may use these details to reply to my enquiry.", "submitLabel": "Send message", "successTitle": "Your note is on its way.", "successMessage": "Thanks for reaching out.", "visitImage": "/uploads/seating.jpg", "visitImageAlt": "Warm seating inside Kaffen", "hoursNote": "Kitchen closes 30 minutes before the coffee bar.", "topics": ["General enquiry", "Private event", "Reservation", "Wholesale coffee", "Press & partnerships"]}}
```

Response `200`:

```json
{"success": true, "data": {"section": "contact", "revision": 8, "content": {"title": "Let's make time for good conversation.", "description": "Drop in, call, or send us a note.", "address": "55 Main Street, New York", "phone": "+012 (345) 678 99", "email": "info@kaffen.com", "hours": "08:00 am - 09:00 pm", "mapUrl": "https://maps.google.com/", "eyebrow": "Come say hello", "formEyebrow": "Send a note", "formTitle": "What's on your mind?", "responseNote": "We usually reply within one business day.", "consentLabel": "I agree that Kaffen may use these details to reply to my enquiry.", "submitLabel": "Send message", "successTitle": "Your note is on its way.", "successMessage": "Thanks for reaching out.", "visitImage": "/uploads/seating.jpg", "visitImageAlt": "Warm seating inside Kaffen", "hoursNote": "Kitchen closes 30 minutes before the coffee bar.", "topics": ["General enquiry", "Private event", "Reservation", "Wholesale coffee", "Press & partnerships"]}}}
```

## 36. PATCH `/admin/website/sections/contact`

Request:

```json
{"expectedRevision": 7, "data": {"title": "Let's make time for good conversation."}}
```

Response `200`:

```json
{"success": true, "data": {"section": "contact", "revision": 8, "content": {"title": "Let's make time for good conversation.", "description": "Drop in, call, or send us a note.", "address": "55 Main Street, New York", "phone": "+012 (345) 678 99", "email": "info@kaffen.com", "hours": "08:00 am - 09:00 pm", "mapUrl": "https://maps.google.com/", "eyebrow": "Come say hello", "formEyebrow": "Send a note", "formTitle": "What's on your mind?", "responseNote": "We usually reply within one business day.", "consentLabel": "I agree that Kaffen may use these details to reply to my enquiry.", "submitLabel": "Send message", "successTitle": "Your note is on its way.", "successMessage": "Thanks for reaching out.", "visitImage": "/uploads/seating.jpg", "visitImageAlt": "Warm seating inside Kaffen", "hoursNote": "Kitchen closes 30 minutes before the coffee bar.", "topics": ["General enquiry", "Private event", "Reservation", "Wholesale coffee", "Press & partnerships"]}}}
```

## 37. GET `/admin/website/sections/footer`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "footer", "revision": 8, "content": {"description": "Exceptional coffee and good conversation.", "copyright": "Copyright © 2026 Kaffen", "facebook": "https://facebook.com/", "instagram": "https://instagram.com/", "twitter": "https://twitter.com/", "youtube": "https://youtube.com/", "hoursTitle": "Working Hours", "contactTitle": "Contact Us", "instagramTitle": "Follow Instagram"}}}
```

## 38. PUT `/admin/website/sections/footer`

Request:

```json
{"expectedRevision": 7, "data": {"description": "Exceptional coffee and good conversation.", "copyright": "Copyright © 2026 Kaffen", "facebook": "https://facebook.com/", "instagram": "https://instagram.com/", "twitter": "https://twitter.com/", "youtube": "https://youtube.com/", "hoursTitle": "Working Hours", "contactTitle": "Contact Us", "instagramTitle": "Follow Instagram"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "footer", "revision": 8, "content": {"description": "Exceptional coffee and good conversation.", "copyright": "Copyright © 2026 Kaffen", "facebook": "https://facebook.com/", "instagram": "https://instagram.com/", "twitter": "https://twitter.com/", "youtube": "https://youtube.com/", "hoursTitle": "Working Hours", "contactTitle": "Contact Us", "instagramTitle": "Follow Instagram"}}}
```

## 39. PATCH `/admin/website/sections/footer`

Request:

```json
{"expectedRevision": 7, "data": {"description": "Exceptional coffee and good conversation."}}
```

Response `200`:

```json
{"success": true, "data": {"section": "footer", "revision": 8, "content": {"description": "Exceptional coffee and good conversation.", "copyright": "Copyright © 2026 Kaffen", "facebook": "https://facebook.com/", "instagram": "https://instagram.com/", "twitter": "https://twitter.com/", "youtube": "https://youtube.com/", "hoursTitle": "Working Hours", "contactTitle": "Contact Us", "instagramTitle": "Follow Instagram"}}}
```

## 40. GET `/admin/website/sections/seo`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "seo", "revision": 8, "content": {"title": "Kaffen — Coffee & Conversation", "description": "Specialty coffee and a welcoming place for conversation.", "keywords": "coffee, cafe, reservations", "canonicalUrl": "https://example.com/", "ogImage": "/uploads/midnight-hero.webp", "robots": "index, follow"}}}
```

## 41. PUT `/admin/website/sections/seo`

Request:

```json
{"expectedRevision": 7, "data": {"title": "Kaffen — Coffee & Conversation", "description": "Specialty coffee and a welcoming place for conversation.", "keywords": "coffee, cafe, reservations", "canonicalUrl": "https://example.com/", "ogImage": "/uploads/midnight-hero.webp", "robots": "index, follow"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "seo", "revision": 8, "content": {"title": "Kaffen — Coffee & Conversation", "description": "Specialty coffee and a welcoming place for conversation.", "keywords": "coffee, cafe, reservations", "canonicalUrl": "https://example.com/", "ogImage": "/uploads/midnight-hero.webp", "robots": "index, follow"}}}
```

## 42. PATCH `/admin/website/sections/seo`

Request:

```json
{"expectedRevision": 7, "data": {"title": "Kaffen — Coffee & Conversation"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "seo", "revision": 8, "content": {"title": "Kaffen — Coffee & Conversation", "description": "Specialty coffee and a welcoming place for conversation.", "keywords": "coffee, cafe, reservations", "canonicalUrl": "https://example.com/", "ogImage": "/uploads/midnight-hero.webp", "robots": "index, follow"}}}
```

## 43. GET `/admin/website/sections/delivery`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "delivery", "revision": 8, "content": {"title": "Coffee, wherever you are", "description": "Explore our coffee selection.", "buttonLabel": "Browse coffee menu", "buttonUrl": "#menu"}}}
```

## 44. PUT `/admin/website/sections/delivery`

Request:

```json
{"expectedRevision": 7, "data": {"title": "Coffee, wherever you are", "description": "Explore our coffee selection.", "buttonLabel": "Browse coffee menu", "buttonUrl": "#menu"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "delivery", "revision": 8, "content": {"title": "Coffee, wherever you are", "description": "Explore our coffee selection.", "buttonLabel": "Browse coffee menu", "buttonUrl": "#menu"}}}
```

## 45. PATCH `/admin/website/sections/delivery`

Request:

```json
{"expectedRevision": 7, "data": {"title": "Coffee, wherever you are"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "delivery", "revision": 8, "content": {"title": "Coffee, wherever you are", "description": "Explore our coffee selection.", "buttonLabel": "Browse coffee menu", "buttonUrl": "#menu"}}}
```

## 46. GET `/admin/website/sections/reservationPolicy`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"section": "reservationPolicy", "revision": 8, "content": {"timeZone": "America/New_York", "timeZoneLabel": "New York time", "capacity": 24, "maxGuests": 8, "advanceDays": 90, "duration": 90, "minDuration": 1, "maxDuration": 180, "startTimes": ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]}}}
```

## 47. PUT `/admin/website/sections/reservationPolicy`

Request:

```json
{"expectedRevision": 7, "data": {"timeZone": "America/New_York", "timeZoneLabel": "New York time", "capacity": 24, "maxGuests": 8, "advanceDays": 90, "duration": 90, "minDuration": 1, "maxDuration": 180, "startTimes": ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]}}
```

Response `200`:

```json
{"success": true, "data": {"section": "reservationPolicy", "revision": 8, "content": {"timeZone": "America/New_York", "timeZoneLabel": "New York time", "capacity": 24, "maxGuests": 8, "advanceDays": 90, "duration": 90, "minDuration": 1, "maxDuration": 180, "startTimes": ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]}}}
```

## 48. PATCH `/admin/website/sections/reservationPolicy`

Request:

```json
{"expectedRevision": 7, "data": {"timeZone": "America/New_York"}}
```

Response `200`:

```json
{"success": true, "data": {"section": "reservationPolicy", "revision": 8, "content": {"timeZone": "America/New_York", "timeZoneLabel": "New York time", "capacity": 24, "maxGuests": 8, "advanceDays": 90, "duration": 90, "minDuration": 1, "maxDuration": 180, "startTimes": ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]}}}
```

## 49. GET `/admin/website/navigation?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "navigation-101", "label": "Menu", "href": "#menu", "enabled": true, "sortOrder": 3}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 50. GET `/admin/website/navigation/navigation-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "navigation-101", "label": "Menu", "href": "#menu", "enabled": true, "sortOrder": 3}}
```

## 51. POST `/admin/website/navigation`

Request:

```json
{"expectedRevision": 7, "data": {"label": "Menu", "href": "#menu", "enabled": true, "sortOrder": 3}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "navigation-101", "label": "Menu", "href": "#menu", "enabled": true, "sortOrder": 3}}}
```

## 52. PATCH `/admin/website/navigation/navigation-101`

Request:

```json
{"expectedRevision": 7, "data": {"label": "Menu"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "navigation-101", "label": "Menu", "href": "#menu", "enabled": true, "sortOrder": 3}}}
```

## 53. DELETE `/admin/website/navigation/navigation-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 54. PUT `/admin/website/navigation/order`

Request:

```json
{"expectedRevision": 7, "ids": ["navigation-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["navigation-101"]}}
```

## 55. GET `/admin/website/services?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "services-101", "name": "Coffee Menu", "image": "/uploads/service.jpg", "imageAlt": "Fresh coffee", "icon": "coffee", "href": "#menu", "enabled": true, "sortOrder": 1}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 56. GET `/admin/website/services/services-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "services-101", "name": "Coffee Menu", "image": "/uploads/service.jpg", "imageAlt": "Fresh coffee", "icon": "coffee", "href": "#menu", "enabled": true, "sortOrder": 1}}
```

## 57. POST `/admin/website/services`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Coffee Menu", "image": "/uploads/service.jpg", "imageAlt": "Fresh coffee", "icon": "coffee", "href": "#menu", "enabled": true, "sortOrder": 1}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "services-101", "name": "Coffee Menu", "image": "/uploads/service.jpg", "imageAlt": "Fresh coffee", "icon": "coffee", "href": "#menu", "enabled": true, "sortOrder": 1}}}
```

## 58. PATCH `/admin/website/services/services-101`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Coffee Menu"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "services-101", "name": "Coffee Menu", "image": "/uploads/service.jpg", "imageAlt": "Fresh coffee", "icon": "coffee", "href": "#menu", "enabled": true, "sortOrder": 1}}}
```

## 59. DELETE `/admin/website/services/services-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 60. PUT `/admin/website/services/order`

Request:

```json
{"expectedRevision": 7, "ids": ["services-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["services-101"]}}
```

## 61. GET `/admin/website/menu-items?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "menu-items-101", "name": "Cappuccino", "description": "Espresso and steamed milk", "image": "/uploads/cappuccino.jpg", "imageAlt": "Cappuccino", "price": 4.9, "enabled": true, "sortOrder": 1}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 62. GET `/admin/website/menu-items/menu-items-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "menu-items-101", "name": "Cappuccino", "description": "Espresso and steamed milk", "image": "/uploads/cappuccino.jpg", "imageAlt": "Cappuccino", "price": 4.9, "enabled": true, "sortOrder": 1}}
```

## 63. POST `/admin/website/menu-items`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Cappuccino", "description": "Espresso and steamed milk", "image": "/uploads/cappuccino.jpg", "imageAlt": "Cappuccino", "price": 4.9, "enabled": true, "sortOrder": 1}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "menu-items-101", "name": "Cappuccino", "description": "Espresso and steamed milk", "image": "/uploads/cappuccino.jpg", "imageAlt": "Cappuccino", "price": 4.9, "enabled": true, "sortOrder": 1}}}
```

## 64. PATCH `/admin/website/menu-items/menu-items-101`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Cappuccino"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "menu-items-101", "name": "Cappuccino", "description": "Espresso and steamed milk", "image": "/uploads/cappuccino.jpg", "imageAlt": "Cappuccino", "price": 4.9, "enabled": true, "sortOrder": 1}}}
```

## 65. DELETE `/admin/website/menu-items/menu-items-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 66. PUT `/admin/website/menu-items/order`

Request:

```json
{"expectedRevision": 7, "ids": ["menu-items-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["menu-items-101"]}}
```

## 67. GET `/admin/website/journey-steps?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "journey-steps-101", "step": "01", "title": "The Selection", "subtitle": "", "description": "We source specialty Arabica beans.", "image": "/uploads/selection.webp", "imageAlt": "Green coffee beans", "color": "#5a7a28", "glow": "rgba(90,122,40,0.6)", "stats": [{"label": "Origin", "value": "Ethiopia", "icon": "map-pin"}], "tags": ["Hand-Picked", "Single Origin"], "enabled": true, "sortOrder": 1}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 68. GET `/admin/website/journey-steps/journey-steps-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "journey-steps-101", "step": "01", "title": "The Selection", "subtitle": "", "description": "We source specialty Arabica beans.", "image": "/uploads/selection.webp", "imageAlt": "Green coffee beans", "color": "#5a7a28", "glow": "rgba(90,122,40,0.6)", "stats": [{"label": "Origin", "value": "Ethiopia", "icon": "map-pin"}], "tags": ["Hand-Picked", "Single Origin"], "enabled": true, "sortOrder": 1}}
```

## 69. POST `/admin/website/journey-steps`

Request:

```json
{"expectedRevision": 7, "data": {"step": "01", "title": "The Selection", "subtitle": "", "description": "We source specialty Arabica beans.", "image": "/uploads/selection.webp", "imageAlt": "Green coffee beans", "color": "#5a7a28", "glow": "rgba(90,122,40,0.6)", "stats": [{"label": "Origin", "value": "Ethiopia", "icon": "map-pin"}], "tags": ["Hand-Picked", "Single Origin"], "enabled": true, "sortOrder": 1}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "journey-steps-101", "step": "01", "title": "The Selection", "subtitle": "", "description": "We source specialty Arabica beans.", "image": "/uploads/selection.webp", "imageAlt": "Green coffee beans", "color": "#5a7a28", "glow": "rgba(90,122,40,0.6)", "stats": [{"label": "Origin", "value": "Ethiopia", "icon": "map-pin"}], "tags": ["Hand-Picked", "Single Origin"], "enabled": true, "sortOrder": 1}}}
```

## 70. PATCH `/admin/website/journey-steps/journey-steps-101`

Request:

```json
{"expectedRevision": 7, "data": {"step": "01"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "journey-steps-101", "step": "01", "title": "The Selection", "subtitle": "", "description": "We source specialty Arabica beans.", "image": "/uploads/selection.webp", "imageAlt": "Green coffee beans", "color": "#5a7a28", "glow": "rgba(90,122,40,0.6)", "stats": [{"label": "Origin", "value": "Ethiopia", "icon": "map-pin"}], "tags": ["Hand-Picked", "Single Origin"], "enabled": true, "sortOrder": 1}}}
```

## 71. DELETE `/admin/website/journey-steps/journey-steps-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 72. PUT `/admin/website/journey-steps/order`

Request:

```json
{"expectedRevision": 7, "ids": ["journey-steps-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["journey-steps-101"]}}
```

## 73. GET `/admin/website/features?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "features-101", "title": "Natural Coffee Beans", "description": "Carefully sourced coffee.", "image": "/uploads/beans.png", "imageAlt": "Coffee beans", "enabled": true, "sortOrder": 1}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 74. GET `/admin/website/features/features-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "features-101", "title": "Natural Coffee Beans", "description": "Carefully sourced coffee.", "image": "/uploads/beans.png", "imageAlt": "Coffee beans", "enabled": true, "sortOrder": 1}}
```

## 75. POST `/admin/website/features`

Request:

```json
{"expectedRevision": 7, "data": {"title": "Natural Coffee Beans", "description": "Carefully sourced coffee.", "image": "/uploads/beans.png", "imageAlt": "Coffee beans", "enabled": true, "sortOrder": 1}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "features-101", "title": "Natural Coffee Beans", "description": "Carefully sourced coffee.", "image": "/uploads/beans.png", "imageAlt": "Coffee beans", "enabled": true, "sortOrder": 1}}}
```

## 76. PATCH `/admin/website/features/features-101`

Request:

```json
{"expectedRevision": 7, "data": {"title": "Natural Coffee Beans"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "features-101", "title": "Natural Coffee Beans", "description": "Carefully sourced coffee.", "image": "/uploads/beans.png", "imageAlt": "Coffee beans", "enabled": true, "sortOrder": 1}}}
```

## 77. DELETE `/admin/website/features/features-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 78. PUT `/admin/website/features/order`

Request:

```json
{"expectedRevision": 7, "ids": ["features-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["features-101"]}}
```

## 79. GET `/admin/website/gallery-items?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "gallery-items-101", "name": "Latte", "image": "/uploads/latte.jpg", "imageAlt": "Latte art", "link": "https://instagram.com/", "showInFooter": true, "enabled": true, "sortOrder": 1}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 80. GET `/admin/website/gallery-items/gallery-items-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "gallery-items-101", "name": "Latte", "image": "/uploads/latte.jpg", "imageAlt": "Latte art", "link": "https://instagram.com/", "showInFooter": true, "enabled": true, "sortOrder": 1}}
```

## 81. POST `/admin/website/gallery-items`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Latte", "image": "/uploads/latte.jpg", "imageAlt": "Latte art", "link": "https://instagram.com/", "showInFooter": true, "enabled": true, "sortOrder": 1}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "gallery-items-101", "name": "Latte", "image": "/uploads/latte.jpg", "imageAlt": "Latte art", "link": "https://instagram.com/", "showInFooter": true, "enabled": true, "sortOrder": 1}}}
```

## 82. PATCH `/admin/website/gallery-items/gallery-items-101`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Latte"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "gallery-items-101", "name": "Latte", "image": "/uploads/latte.jpg", "imageAlt": "Latte art", "link": "https://instagram.com/", "showInFooter": true, "enabled": true, "sortOrder": 1}}}
```

## 83. DELETE `/admin/website/gallery-items/gallery-items-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 84. PUT `/admin/website/gallery-items/order`

Request:

```json
{"expectedRevision": 7, "ids": ["gallery-items-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["gallery-items-101"]}}
```

## 85. GET `/admin/website/reviews?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "reviews-101", "name": "Sadia Rahman", "role": "Designer", "image": "/uploads/sadia.jpg", "imageAlt": "Sadia Rahman", "rating": 5, "message": "Great coffee and a welcoming atmosphere.", "enabled": true, "sortOrder": 1}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 86. GET `/admin/website/reviews/reviews-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "reviews-101", "name": "Sadia Rahman", "role": "Designer", "image": "/uploads/sadia.jpg", "imageAlt": "Sadia Rahman", "rating": 5, "message": "Great coffee and a welcoming atmosphere.", "enabled": true, "sortOrder": 1}}
```

## 87. POST `/admin/website/reviews`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Sadia Rahman", "role": "Designer", "image": "/uploads/sadia.jpg", "imageAlt": "Sadia Rahman", "rating": 5, "message": "Great coffee and a welcoming atmosphere.", "enabled": true, "sortOrder": 1}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "reviews-101", "name": "Sadia Rahman", "role": "Designer", "image": "/uploads/sadia.jpg", "imageAlt": "Sadia Rahman", "rating": 5, "message": "Great coffee and a welcoming atmosphere.", "enabled": true, "sortOrder": 1}}}
```

## 88. PATCH `/admin/website/reviews/reviews-101`

Request:

```json
{"expectedRevision": 7, "data": {"name": "Sadia Rahman"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "reviews-101", "name": "Sadia Rahman", "role": "Designer", "image": "/uploads/sadia.jpg", "imageAlt": "Sadia Rahman", "rating": 5, "message": "Great coffee and a welcoming atmosphere.", "enabled": true, "sortOrder": 1}}}
```

## 89. DELETE `/admin/website/reviews/reviews-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 90. PUT `/admin/website/reviews/order`

Request:

```json
{"expectedRevision": 7, "ids": ["reviews-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["reviews-101"]}}
```

## 91. GET `/admin/website/statistics?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "statistics-101", "value": "256+", "title": "Premium Clients", "description": "Our growing community", "enabled": true, "sortOrder": 1}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 92. GET `/admin/website/statistics/statistics-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "statistics-101", "value": "256+", "title": "Premium Clients", "description": "Our growing community", "enabled": true, "sortOrder": 1}}
```

## 93. POST `/admin/website/statistics`

Request:

```json
{"expectedRevision": 7, "data": {"value": "256+", "title": "Premium Clients", "description": "Our growing community", "enabled": true, "sortOrder": 1}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "statistics-101", "value": "256+", "title": "Premium Clients", "description": "Our growing community", "enabled": true, "sortOrder": 1}}}
```

## 94. PATCH `/admin/website/statistics/statistics-101`

Request:

```json
{"expectedRevision": 7, "data": {"value": "256+"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "statistics-101", "value": "256+", "title": "Premium Clients", "description": "Our growing community", "enabled": true, "sortOrder": 1}}}
```

## 95. DELETE `/admin/website/statistics/statistics-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 96. PUT `/admin/website/statistics/order`

Request:

```json
{"expectedRevision": 7, "ids": ["statistics-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["statistics-101"]}}
```

## 97. GET `/admin/website/opening-hours?page=1&limit=20&q=&enabled=true`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "opening-hours-101", "label": "Sunday — Thursday", "days": [0, 1, 2, 3, 4], "opensAt": "08:00", "closesAt": "21:00", "closed": false, "enabled": true, "sortOrder": 1}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 98. GET `/admin/website/opening-hours/opening-hours-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "opening-hours-101", "label": "Sunday — Thursday", "days": [0, 1, 2, 3, 4], "opensAt": "08:00", "closesAt": "21:00", "closed": false, "enabled": true, "sortOrder": 1}}
```

## 99. POST `/admin/website/opening-hours`

Request:

```json
{"expectedRevision": 7, "data": {"label": "Sunday — Thursday", "days": [0, 1, 2, 3, 4], "opensAt": "08:00", "closesAt": "21:00", "closed": false, "enabled": true, "sortOrder": 1}}
```

Response `201`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "opening-hours-101", "label": "Sunday — Thursday", "days": [0, 1, 2, 3, 4], "opensAt": "08:00", "closesAt": "21:00", "closed": false, "enabled": true, "sortOrder": 1}}}
```

## 100. PATCH `/admin/website/opening-hours/opening-hours-101`

Request:

```json
{"expectedRevision": 7, "data": {"label": "Sunday — Thursday"}}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "item": {"id": "opening-hours-101", "label": "Sunday — Thursday", "days": [0, 1, 2, 3, 4], "opensAt": "08:00", "closesAt": "21:00", "closed": false, "enabled": true, "sortOrder": 1}}}
```

## 101. DELETE `/admin/website/opening-hours/opening-hours-101?expectedRevision=7`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 102. PUT `/admin/website/opening-hours/order`

Request:

```json
{"expectedRevision": 7, "ids": ["opening-hours-101"]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "ids": ["opening-hours-101"]}}
```

## 103. GET `/admin/website`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"revision": 8, "publishedRevision": 7, "hasUnpublishedChanges": true, "updatedAt": "2026-11-03T10:00:00.000Z", "publishedAt": "2026-11-02T10:00:00.000Z", "content": {"brand": {"name": "Kaffen", "tagline": "Coffee & conversation", "logo": "/uploads/logo.png", "favicon": "/uploads/favicon.png"}, "header": {"announcement": "Slow moments. Exceptional coffee.", "reserveLabel": "Reserve a table", "accountLabel": "Account", "mobileEyebrow": "Discover Kaffen"}, "hero": {"eyebrow": "The after-dark collection", "title": "Midnight Roast", "description": "Crafted in the shadows, brewed for the bold.", "primaryLabel": "Explore the Brew", "primaryUrl": "#menu", "secondaryLabel": "Get delivery", "image": "/uploads/midnight-hero.webp", "mobileImage": "/uploads/midnight-mobile.webp", "imageAlt": "Midnight Roast coffee", "discoverLabel": "Scroll to Discover", "discoverUrl": "#about"}, "about": {"eyebrow": "About us", "title": "Organic & Fresh Coffee Provider Center", "description": "Coffee, conversation, and memorable moments.", "quote": "A carefully made cup makes a difference.", "quoteImage": "/uploads/founder.png", "image": "/uploads/about.png", "imageAlt": "Fresh coffee beans pouring into a cup"}, "menu": {"eyebrow": "Choose best coffee", "title": "Popular Coffee Menu", "description": "Espresso, filter and signature coffee.", "currency": "USD"}, "journey": {"eyebrow": "From bean to cup", "title": "The coffee journey", "description": "Selection, roasting and the final pour."}, "whyUs": {"eyebrow": "Why choose us", "title": "Coffee made for extraordinary moments", "description": "Thoughtful sourcing and warm hospitality.", "image": "/uploads/choose.jpg", "imageAlt": "Barista preparing coffee", "buttonLabel": "Explore more", "buttonUrl": "#menu"}, "gallery": {"eyebrow": "Inside Kaffen", "title": "Coffee gallery", "description": "Our cups, craft and community."}, "testimonials": {"eyebrow": "Customer feedback", "title": "What Our Clients Say", "description": "Stories from our guests."}, "statistics": {"ariaLabel": "Coffee house statistics"}, "booking": {"eyebrow": "A seat for every occasion", "title": "Good company. A table waiting.", "description": "Make a little time for each other.", "buttonLabel": "Plan an Adda Meeting", "background": "/uploads/cta.jpg", "modalTitle": "Adda Meeting", "modalDescription": "Choose your date, time and meeting length.", "submitLabel": "Confirm reservation", "successTitle": "Your Adda Meeting is reserved", "successMessage": "We look forward to welcoming you.", "availabilityNote": "Availability reflects your selected meeting length.", "depositNote": "Deposit online or in person"}, "contact": {"title": "Let's make time for good conversation.", "description": "Drop in, call, or send us a note.", "address": "55 Main Street, New York", "phone": "+012 (345) 678 99", "email": "info@kaffen.com", "hours": "08:00 am - 09:00 pm", "mapUrl": "https://maps.google.com/", "eyebrow": "Come say hello", "formEyebrow": "Send a note", "formTitle": "What's on your mind?", "responseNote": "We usually reply within one business day.", "consentLabel": "I agree that Kaffen may use these details to reply to my enquiry.", "submitLabel": "Send message", "successTitle": "Your note is on its way.", "successMessage": "Thanks for reaching out.", "visitImage": "/uploads/seating.jpg", "visitImageAlt": "Warm seating inside Kaffen", "hoursNote": "Kitchen closes 30 minutes before the coffee bar.", "topics": ["General enquiry", "Private event", "Reservation", "Wholesale coffee", "Press & partnerships"]}, "footer": {"description": "Exceptional coffee and good conversation.", "copyright": "Copyright © 2026 Kaffen", "facebook": "https://facebook.com/", "instagram": "https://instagram.com/", "twitter": "https://twitter.com/", "youtube": "https://youtube.com/", "hoursTitle": "Working Hours", "contactTitle": "Contact Us", "instagramTitle": "Follow Instagram"}, "seo": {"title": "Kaffen — Coffee & Conversation", "description": "Specialty coffee and a welcoming place for conversation.", "keywords": "coffee, cafe, reservations", "canonicalUrl": "https://example.com/", "ogImage": "/uploads/midnight-hero.webp", "robots": "index, follow"}, "delivery": {"title": "Coffee, wherever you are", "description": "Explore our coffee selection.", "buttonLabel": "Browse coffee menu", "buttonUrl": "#menu"}, "sectionSettings": [{"key": "hero", "enabled": true, "sortOrder": 1}, {"key": "about", "enabled": true, "sortOrder": 2}, {"key": "menu", "enabled": true, "sortOrder": 3}, {"key": "journey", "enabled": true, "sortOrder": 4}, {"key": "whyUs", "enabled": true, "sortOrder": 5}, {"key": "gallery", "enabled": true, "sortOrder": 6}, {"key": "testimonials", "enabled": true, "sortOrder": 7}, {"key": "statistics", "enabled": true, "sortOrder": 8}, {"key": "booking", "enabled": true, "sortOrder": 9}], "reservationPolicy": {"timeZone": "America/New_York", "timeZoneLabel": "New York time", "capacity": 24, "maxGuests": 8, "advanceDays": 90, "duration": 90, "minDuration": 1, "maxDuration": 180, "startTimes": ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]}, "navigation": [], "services": [], "menuItems": [], "journeySteps": [], "features": [], "galleryItems": [], "reviews": [], "statisticItems": [], "openingHours": []}}}
```

## 104. POST `/admin/website/publish`

Request:

```json
{"expectedRevision": 8}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "publishedRevision": 8, "hasUnpublishedChanges": false, "publishedAt": "2026-11-03T10:00:00.000Z"}}
```

## 105. POST `/admin/website/reset`

Request:

```json
{"expectedRevision": 8, "source": "published"}
```

Response `200`:

```json
{"success": true, "data": {"revision": 9, "publishedRevision": 8, "hasUnpublishedChanges": false}}
```

`source`: `published` অথবা `defaults`। Reset শুধু draft বদলাবে।

## 106. PUT `/admin/website/section-order`

Request:

```json
{"expectedRevision": 7, "sections": [{"key": "hero", "enabled": true, "sortOrder": 1}, {"key": "about", "enabled": true, "sortOrder": 2}, {"key": "menu", "enabled": true, "sortOrder": 3}, {"key": "journey", "enabled": true, "sortOrder": 4}, {"key": "whyUs", "enabled": true, "sortOrder": 5}, {"key": "gallery", "enabled": true, "sortOrder": 6}, {"key": "testimonials", "enabled": true, "sortOrder": 7}, {"key": "statistics", "enabled": true, "sortOrder": 8}, {"key": "booking", "enabled": true, "sortOrder": 9}]}
```

Response `200`:

```json
{"success": true, "data": {"revision": 8, "sections": [{"key": "hero", "enabled": true, "sortOrder": 1}, {"key": "about", "enabled": true, "sortOrder": 2}, {"key": "menu", "enabled": true, "sortOrder": 3}, {"key": "journey", "enabled": true, "sortOrder": 4}, {"key": "whyUs", "enabled": true, "sortOrder": 5}, {"key": "gallery", "enabled": true, "sortOrder": 6}, {"key": "testimonials", "enabled": true, "sortOrder": 7}, {"key": "statistics", "enabled": true, "sortOrder": 8}, {"key": "booking", "enabled": true, "sortOrder": 9}]}}
```

## 107. GET `/website`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"revision": 8, "publishedAt": "2026-11-03T10:00:00.000Z", "content": {"brand": {"name": "Kaffen", "tagline": "Coffee & conversation", "logo": "/uploads/logo.png", "favicon": "/uploads/favicon.png"}, "header": {"announcement": "Slow moments. Exceptional coffee.", "reserveLabel": "Reserve a table", "accountLabel": "Account", "mobileEyebrow": "Discover Kaffen"}, "hero": {"eyebrow": "The after-dark collection", "title": "Midnight Roast", "description": "Crafted in the shadows, brewed for the bold.", "primaryLabel": "Explore the Brew", "primaryUrl": "#menu", "secondaryLabel": "Get delivery", "image": "/uploads/midnight-hero.webp", "mobileImage": "/uploads/midnight-mobile.webp", "imageAlt": "Midnight Roast coffee", "discoverLabel": "Scroll to Discover", "discoverUrl": "#about"}, "about": {"eyebrow": "About us", "title": "Organic & Fresh Coffee Provider Center", "description": "Coffee, conversation, and memorable moments.", "quote": "A carefully made cup makes a difference.", "quoteImage": "/uploads/founder.png", "image": "/uploads/about.png", "imageAlt": "Fresh coffee beans pouring into a cup"}, "menu": {"eyebrow": "Choose best coffee", "title": "Popular Coffee Menu", "description": "Espresso, filter and signature coffee.", "currency": "USD"}, "journey": {"eyebrow": "From bean to cup", "title": "The coffee journey", "description": "Selection, roasting and the final pour."}, "whyUs": {"eyebrow": "Why choose us", "title": "Coffee made for extraordinary moments", "description": "Thoughtful sourcing and warm hospitality.", "image": "/uploads/choose.jpg", "imageAlt": "Barista preparing coffee", "buttonLabel": "Explore more", "buttonUrl": "#menu"}, "gallery": {"eyebrow": "Inside Kaffen", "title": "Coffee gallery", "description": "Our cups, craft and community."}, "testimonials": {"eyebrow": "Customer feedback", "title": "What Our Clients Say", "description": "Stories from our guests."}, "statistics": {"ariaLabel": "Coffee house statistics"}, "booking": {"eyebrow": "A seat for every occasion", "title": "Good company. A table waiting.", "description": "Make a little time for each other.", "buttonLabel": "Plan an Adda Meeting", "background": "/uploads/cta.jpg", "modalTitle": "Adda Meeting", "modalDescription": "Choose your date, time and meeting length.", "submitLabel": "Confirm reservation", "successTitle": "Your Adda Meeting is reserved", "successMessage": "We look forward to welcoming you.", "availabilityNote": "Availability reflects your selected meeting length.", "depositNote": "Deposit online or in person"}, "contact": {"title": "Let's make time for good conversation.", "description": "Drop in, call, or send us a note.", "address": "55 Main Street, New York", "phone": "+012 (345) 678 99", "email": "info@kaffen.com", "hours": "08:00 am - 09:00 pm", "mapUrl": "https://maps.google.com/", "eyebrow": "Come say hello", "formEyebrow": "Send a note", "formTitle": "What's on your mind?", "responseNote": "We usually reply within one business day.", "consentLabel": "I agree that Kaffen may use these details to reply to my enquiry.", "submitLabel": "Send message", "successTitle": "Your note is on its way.", "successMessage": "Thanks for reaching out.", "visitImage": "/uploads/seating.jpg", "visitImageAlt": "Warm seating inside Kaffen", "hoursNote": "Kitchen closes 30 minutes before the coffee bar.", "topics": ["General enquiry", "Private event", "Reservation", "Wholesale coffee", "Press & partnerships"]}, "footer": {"description": "Exceptional coffee and good conversation.", "copyright": "Copyright © 2026 Kaffen", "facebook": "https://facebook.com/", "instagram": "https://instagram.com/", "twitter": "https://twitter.com/", "youtube": "https://youtube.com/", "hoursTitle": "Working Hours", "contactTitle": "Contact Us", "instagramTitle": "Follow Instagram"}, "seo": {"title": "Kaffen — Coffee & Conversation", "description": "Specialty coffee and a welcoming place for conversation.", "keywords": "coffee, cafe, reservations", "canonicalUrl": "https://example.com/", "ogImage": "/uploads/midnight-hero.webp", "robots": "index, follow"}, "delivery": {"title": "Coffee, wherever you are", "description": "Explore our coffee selection.", "buttonLabel": "Browse coffee menu", "buttonUrl": "#menu"}, "sectionSettings": [{"key": "hero", "enabled": true, "sortOrder": 1}, {"key": "about", "enabled": true, "sortOrder": 2}, {"key": "menu", "enabled": true, "sortOrder": 3}, {"key": "journey", "enabled": true, "sortOrder": 4}, {"key": "whyUs", "enabled": true, "sortOrder": 5}, {"key": "gallery", "enabled": true, "sortOrder": 6}, {"key": "testimonials", "enabled": true, "sortOrder": 7}, {"key": "statistics", "enabled": true, "sortOrder": 8}, {"key": "booking", "enabled": true, "sortOrder": 9}], "reservationPolicy": {"timeZone": "America/New_York", "timeZoneLabel": "New York time", "capacity": 24, "maxGuests": 8, "advanceDays": 90, "duration": 90, "minDuration": 1, "maxDuration": 180, "startTimes": ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]}, "navigation": [], "services": [], "menuItems": [], "journeySteps": [], "features": [], "galleryItems": [], "reviews": [], "statisticItems": [], "openingHours": []}}}
```

## 108. POST `/admin/media`

Request:

```json
{"file": "<binary image file>", "alt": "Coffee beans"}
```

Response `201`:

```json
{"success": true, "data": {"id": "media-101", "url": "/uploads/coffee.webp", "filename": "coffee.webp", "mimeType": "image/webp", "size": 184300, "width": 1600, "height": 1067, "alt": "Coffee beans", "createdAt": "2026-11-03T10:00:00.000Z"}}
```

Request Content-Type: `multipart/form-data`। বাকি JSON API-তে `application/json`।

## 109. GET `/admin/media?page=1&limit=20&q=`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "media-101", "url": "/uploads/coffee.webp", "filename": "coffee.webp", "mimeType": "image/webp", "size": 184300, "width": 1600, "height": 1067, "alt": "Coffee beans", "createdAt": "2026-11-03T10:00:00.000Z"}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 110. PATCH `/admin/media/media-101`

Request:

```json
{"alt": "Coffee beans"}
```

Response `200`:

```json
{"success": true, "data": {"id": "media-101", "url": "/uploads/coffee.webp", "filename": "coffee.webp", "mimeType": "image/webp", "size": 184300, "width": 1600, "height": 1067, "alt": "Coffee beans", "createdAt": "2026-11-03T10:00:00.000Z"}}
```

## 111. DELETE `/admin/media/media-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

## 112. POST `/contact`

Request:

```json
{"name": "Rahim Ahmed", "email": "rahim@example.com", "topic": "General enquiry", "message": "I would like to know about private event booking.", "consent": true}
```

Response `201`:

```json
{"success": true, "data": {"id": "msg-1003", "message": "Your message has been received.", "createdAt": "2026-11-03T10:00:00.000Z"}}
```

## 113. GET `/admin/contact-messages?page=1&limit=20&status=new&q=`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "msg-1003", "name": "Rahim Ahmed", "email": "rahim@example.com", "topic": "General enquiry", "message": "I would like to know about private event booking.", "consent": true, "consentAt": "2026-11-03T10:00:00.000Z", "status": "new", "createdAt": "2026-11-03T10:00:00.000Z", "updatedAt": "2026-11-03T10:00:00.000Z"}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 114. GET `/admin/contact-messages/stats`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"active": 12, "unread": 4, "replied": 3}}
```

## 115. GET `/admin/contact-messages/msg-1003`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "msg-1003", "name": "Rahim Ahmed", "email": "rahim@example.com", "topic": "General enquiry", "message": "I would like to know about private event booking.", "consent": true, "consentAt": "2026-11-03T10:00:00.000Z", "status": "new", "createdAt": "2026-11-03T10:00:00.000Z", "updatedAt": "2026-11-03T10:00:00.000Z"}}
```

## 116. PATCH `/admin/contact-messages/msg-1003/status`

Request:

```json
{"status": "read"}
```

Response `200`:

```json
{"success": true, "data": {"id": "msg-1003", "name": "Rahim Ahmed", "email": "rahim@example.com", "topic": "General enquiry", "message": "I would like to know about private event booking.", "consent": true, "consentAt": "2026-11-03T10:00:00.000Z", "status": "read", "createdAt": "2026-11-03T10:00:00.000Z", "updatedAt": "2026-11-03T10:00:00.000Z"}}
```

`status`: `new`, `read`, `replied`, `archived`।

## 117. GET `/reservations/availability?date=2026-11-10&guests=4&duration=75`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"date": "2026-11-10", "guests": 4, "duration": 75, "timeZone": "America/New_York", "times": ["09:00", "09:30", "10:00"]}}
```

## 118. GET `/reservations/availability?month=2026-11&guests=4&duration=75`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"month": "2026-11", "guests": 4, "duration": 75, "timeZone": "America/New_York", "availability": {"2026-11-10": 24, "2026-11-11": 0}}}
```

## 119. POST `/reservations`

Request:

```json
{"requestId": "b6a845b2-6719-4ab4-9dc2-2e9932d0b3a8", "name": "Rahim Ahmed", "phone": "01712345678", "guests": 4, "duration": 75, "date": "2026-11-10", "time": "12:00"}
```

Response `201`:

```json
{"success": true, "data": {"reference": "KF-A1B2C3D4", "name": "Rahim Ahmed", "guests": 4, "duration": 75, "date": "2026-11-10", "time": "12:00", "timeZone": "America/New_York"}}
```

## 120. GET `/admin/reservations?page=1&limit=20&dateFrom=2026-11-01&dateTo=2026-11-30&status=booked&q=`

Request: body নেই।

Response `200`:

```json
{"success": true, "data": [{"id": "reservation-101", "reference": "KF-A1B2C3D4", "requestId": "b6a845b2-6719-4ab4-9dc2-2e9932d0b3a8", "name": "Rahim Ahmed", "phone": "01712345678", "guests": 4, "duration": 75, "date": "2026-11-10", "time": "12:00", "timeZone": "America/New_York", "status": "booked", "notes": "", "source": "website", "createdAt": "2026-11-03T10:00:00.000Z", "updatedAt": "2026-11-03T10:00:00.000Z"}], "meta": {"page": 1, "limit": 20, "total": 1, "totalPages": 1}}
```

## 121. GET `/admin/reservations/stats?dateFrom=2026-11-01&dateTo=2026-11-30`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"total": 20, "booked": 12, "cancelled": 3, "paid": 5}}
```

## 122. GET `/admin/reservations/reservation-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `200`:

```json
{"success": true, "data": {"id": "reservation-101", "reference": "KF-A1B2C3D4", "requestId": "b6a845b2-6719-4ab4-9dc2-2e9932d0b3a8", "name": "Rahim Ahmed", "phone": "01712345678", "guests": 4, "duration": 75, "date": "2026-11-10", "time": "12:00", "timeZone": "America/New_York", "status": "booked", "notes": "", "source": "website", "createdAt": "2026-11-03T10:00:00.000Z", "updatedAt": "2026-11-03T10:00:00.000Z"}}
```

## 123. POST `/admin/reservations`

Request:

```json
{"requestId": "b6a845b2-6719-4ab4-9dc2-2e9932d0b3a8", "name": "Rahim Ahmed", "phone": "01712345678", "guests": 4, "duration": 75, "date": "2026-11-10", "time": "12:00", "status": "booked", "notes": ""}
```

Response `201`:

```json
{"success": true, "data": {"id": "reservation-101", "reference": "KF-A1B2C3D4", "requestId": "b6a845b2-6719-4ab4-9dc2-2e9932d0b3a8", "name": "Rahim Ahmed", "phone": "01712345678", "guests": 4, "duration": 75, "date": "2026-11-10", "time": "12:00", "timeZone": "America/New_York", "status": "booked", "notes": "", "source": "admin", "createdAt": "2026-11-03T10:00:00.000Z", "updatedAt": "2026-11-03T10:00:00.000Z"}}
```

## 124. PATCH `/admin/reservations/reservation-101`

Request:

```json
{"guests": 3, "duration": 90}
```

Response `200`:

```json
{"success": true, "data": {"id": "reservation-101", "reference": "KF-A1B2C3D4", "requestId": "b6a845b2-6719-4ab4-9dc2-2e9932d0b3a8", "name": "Rahim Ahmed", "phone": "01712345678", "guests": 3, "duration": 90, "date": "2026-11-10", "time": "12:00", "timeZone": "America/New_York", "status": "booked", "notes": "", "source": "website", "createdAt": "2026-11-03T10:00:00.000Z", "updatedAt": "2026-11-03T10:00:00.000Z"}}
```

## 125. PATCH `/admin/reservations/reservation-101/status`

Request:

```json
{"status": "cancelled"}
```

Response `200`:

```json
{"success": true, "data": {"id": "reservation-101", "reference": "KF-A1B2C3D4", "requestId": "b6a845b2-6719-4ab4-9dc2-2e9932d0b3a8", "name": "Rahim Ahmed", "phone": "01712345678", "guests": 4, "duration": 75, "date": "2026-11-10", "time": "12:00", "timeZone": "America/New_York", "status": "cancelled", "notes": "", "source": "website", "createdAt": "2026-11-03T10:00:00.000Z", "updatedAt": "2026-11-03T10:00:00.000Z"}}
```

## 126. DELETE `/admin/reservations/reservation-101`

Request:

Body নেই। Query/path parameter URL-এ দেওয়া আছে।

Response `204`:

Body নেই।

`status`: `booked`, `cancelled`, `paid`।

## Common error response

```json
{"success": false, "error": {"code": "VALIDATION_ERROR", "message": "Please check the submitted fields.", "fields": {"name": ["Name is required."]}}}
```

HTTP status: `400` invalid request, `401` login required, `403` forbidden, `404` not found, `409` revision/capacity conflict, `422` validation error, `503` service unavailable.

`expectedRevision` আগের GET response থেকে নিতে হবে। PUT সম্পূর্ণ section save করে; PATCH শুধু পাঠানো field বদলায়। Save draft-এর পর publish করলে website-এ live হবে।
