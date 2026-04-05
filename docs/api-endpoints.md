Regisert Tenant:
===============

POST: http://localhost:5000/api/v1/auth/register

Tenant 1
=========
Payload: {
  "email": "admin1@amazon.com",
  "password": "123456",
  "tenantId": "tenant_1"
}

Response: {
    "email": "admin1@amazon.com",
    "password": "123456",
    "tenantId": "tenant_1",
    "_id": "69d2098a14d5bba5079fec8f",
    "__v": 0
}

=============================================================================================
Login Tenant: 
-------------

POST: 

==============================================================================================
Create User:
==============
POST: http://localhost:5000/api/v1/auth/users

HEADER: Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWQyMDk4YTE0ZDViYmE1MDc5ZmVjOGYiLCJ0ZW5hbnRJZCI6InRlbmFudF8xIiwiaWF0IjoxNzc1MzcyODUxfQ.0xsr-iWFNYoAjVt6x1jqmyOF2H5oYmGdwmr-ZuUEqGI

PAYLOAD: {
  "email": "user1@amazon_customer.com",
  "password": "123456"
}
or

[
  { "email": "user1@test.com", "password": "123456" },
  { "email": "user2@test.com", "password": "123456" },
  { "email": "user3@test.com", "password": "123456" }
]

RESPONSE: {
    "email": "user1@amazon_customer.com",
    "password": "123456",
    "tenantId": "tenant_1",
    "_id": "69d20c47addcc31a73fed583",
    "__v": 0
}

==========================================

GET USER:
========
GET: http://localhost:5000/api/v1/auth/users?tenantId=tenant_1

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWQyMDk4YTE0ZDViYmE1MDc5ZmVjOGYiLCJ0ZW5hbnRJZCI6InRlbmFudF8xIiwiaWF0IjoxNzc1MzcyODUxfQ.0xsr-iWFNYoAjVt6x1jqmyOF2H5oYmGdwmr-ZuUEqGI

RESPONSE: [
    {
        "_id": "69d2098a14d5bba5079fec8f",
        "email": "admin1@amazon.com",
        "password": "123456",
        "tenantId": "tenant_1",
        "__v": 0
    },
    {
        "_id": "69d20c47addcc31a73fed583",
        "email": "user1@amazon_customer.com",
        "password": "123456",
        "tenantId": "tenant_1",
        "__v": 0
    }
]

===========================================

CREATE ORDER: 
============

POST: http://localhost:5000/api/v1/auth/orders

AUTHORIZATION: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWQyMTVjMDVlMTJjOTY0MDkzNjI5NjciLCJ0ZW5hbnRJZCI6InRlbmFudF8wOTQ0NjM2ZC0zYTUyLTQwYWItYThhMS0wY2ZiZTE1YmMwNzMiLCJpYXQiOjE3NzUzNzU4MTN9.qN7nr-0w86YNQwG3WnveuAPG1mLDgcy0amekFkCyiGw

PAYLOAD: {
    "item": "sku-1234",
    "price": 100
}
or
[
  {
    "email": "user1@test.com",
    "item": "Laptop",
    "price": 50000
  },
  {
    "email": "user2@test.com",
    "item": "Mobile",
    "price": 20000
  },
  {
    "email": "user1@test.com",
    "item": "Headphones",
    "price": 3000
  }
]

RESPONSE: {
    "item": "sku-1234",
    "price": 100,
    "userId": "69d215c05e12c96409362967",
    "tenantId": "tenant_0944636d-3a52-40ab-a8a1-0cfbe15bc073",
    "_id": "69d217c7de3830158ec38fcd",
    "__v": 0
}

===============================

get orders: 
============

GET: http://localhost:5000/api/v1/auth/orders\

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWQyMTVjMDVlMTJjOTY0MDkzNjI5NjciLCJ0ZW5hbnRJZCI6InRlbmFudF8wOTQ0NjM2ZC0zYTUyLTQwYWItYThhMS0wY2ZiZTE1YmMwNzMiLCJpYXQiOjE3NzUzNzU4MTN9.qN7nr-0w86YNQwG3WnveuAPG1mLDgcy0amekFkCyiGw~


===========================================================

Tenant: 1
-----------
{
  "email": "admin1@amazon.com",
  "password": "123456"
}

Tenant: 2
-----------
{
  "email": "admin2@flipkart.com",
  "password": "123456"
}

Tenant: 3
-----------
{
  "email": "admin3@kovaion.com",
  "password": "123456"
}
==============================================


[
  { "email": "user11@kovaion.com", "password": "123456" },
  { "email": "user12@kovaion.com", "password": "123456" },
  { "email": "user13@kovaion.com", "password": "123456" },
  { "email": "user14@kovaion.com", "password": "123456" },
  { "email": "user15@kovaion.com", "password": "123456" }
]

[
  { "email": "user11@kovaion.com", "item": "co_Laptop", "price": 52000 },
  { "email": "user12@kovaion.com", "item": "co_Mobile", "price": 18000 },
  { "email": "user13@kovaion.com", "item": "co_Headphones", "price": 2500 },
  { "email": "user14@kovaion.com", "item": "co_Keyboard", "price": 1500 },
  { "email": "user15@kovaion.com", "item": "co_Monitor", "price": 12000 },
  { "email": "user13@kovaion.com", "item": "co_Mouse", "price": 800 },
  { "email": "user14@kovaion.com", "item": "co_Tablet", "price": 22000 },
  { "email": "user15@kovaion.com", "item": "co_Smartwatch", "price": 7000 },
  { "email": "user15@kovaion.com", "item": "co_Speaker", "price": 3500 },
  { "email": "user14@kovaion.com", "item": "co_External HDD", "price": 6000 }
]