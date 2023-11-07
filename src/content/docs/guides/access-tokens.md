---
title: Access Tokens
description: The different types of access tokens
---

SearchAnything currently has two types of access tokens for API access. Each access token is made up of two
parts. The access key itself used for part of authenticated access and an ID part used for identifying unique
access tokens in use.

```txt
 ________________________ ___________________
| Key                    | ID                |
sal_aaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaa
```

### Admin

**Admin** access tokens are prefixed with `sal`, short for SearchAnything live. It is intended for server side usage as it allows full access to all endpoints.

`sal_aaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaa`

### Read

**Read** access tokens are prefixed with `sar`, short for SearchAnything read. It is intended for search queries on `/api/collections/search` endpoint.

It can be used on both front end or server side.

`sar_aaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaa`
