A book record management API backend for records and books

# Routes and endpoints

## /users
POST: to ceate a new user ✔
GET: to get list of users ✔

## /users/{id}
GET :  user by id ✔
PUT: to update user by id ✔
DELETE: delete user by id (check if user still has issued a book) & (if any fine to be paid) ✔

## /user/subscribtion_details/{id}
GET: to get user subscribtion details ✔
* date of subscribtion
* valid till
* fine

## /books
GET: all books ✔
POST: create a new book ✔

## /books/{id}
GET: book by id ✔
PUT: update book by id ✔

## /books/issued/books
GET: all issued books ✔

## /books/issued/withFine
GET: all boks with fine

# subscription types
basic - 3 months
standard - 6 months
premium - 12 months


if subscription date is 10/01/2023
and subscription type is standard
the valid till date will be 10/07/2023

if he has an issued book which is not returned brfore validdtae , a fine is added of rs 100

if he has issued book which is not retuenned before valid date and subscription also expires , then a total fine os 200 is added.




