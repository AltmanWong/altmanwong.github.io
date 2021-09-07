---
title: Redis 學習筆記
date: "2020-11-19T13:28:03.284Z"
description:
hashtag: Redis,技術隨筆
cover:  cover.png
---

以下內容為本人上網左抄右抄嘅

Reference:
https://medium.com/@mengchiang000/redis-cache%E6%B7%BA%E8%AB%87-%E6%87%89%E7%94%A8-7513a9f5f2dd


Redis cache flow

1. Request Redis, if key exist return directly
2. else, lock DB -> Get from Redis, if key exist return, else call DB and get the value, then write to Redis
3. return X

