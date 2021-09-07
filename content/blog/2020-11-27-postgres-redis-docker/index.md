---
title: Postgres x Redis x Docker 起機懶人包
date: "2020-11-27T13:28:03.284Z"
description:
hashtag: Redis,Postgres,Docker,技術隨筆
cover:  cover.jpg
---

```yaml
version '3'

service:
  db:
    container_name: 'postgres'
    image: 'postgres:13'
    ports:
      - `${ip}:5432:5432'
    volumes:
      - 'pgdata:/var/lib/postgresql/data/'
    environment:
      - POSTGRES_USER=USER
      - POSTGRES_PASSWORD=PASSWORD
      - POSRGRES_DB=db

  redis:
    container_name: 'redis'
    image: 'redis:6.0.9'
    ports:
      - '7000:7000'
    volume:
      - 'redisdata:/var/lib/redis/data/'

volumes:
  pgdata:
  redisdata:
```