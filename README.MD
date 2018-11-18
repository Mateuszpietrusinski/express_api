# Simple Express API

Restful API based on Node.js / express. This project is still in development process. It may contains bugs, be careful to use it.

## /products endpoint 
###### Get Method 
Showing all the products stored in Database 

```json
{
    "count": 2,
    "products": [
        {
            "name": "ball",
            "price": 50,
            "_id": "5bf1d2160752f2098c00041e",
            "request": {
                "type": "GET",
                "url": "http:localhost:3000/products5bf1d2160752f2098c00041e"
            }
        },
        {
            "name": "ball",
            "price": 50,
            "_id": "5bf1d23068ad120ee8b4da9d",
            "request": {
                "type": "GET",
                "url": "http:localhost:3000/products5bf1d23068ad120ee8b4da9d"
            }
        }
    ]
}
```

###### Post Method
Adding new product. The payload should contain data like this:
```javascript
{
	"name": "ball",
	"price" : "50.00"
}
```
###### Patch Method
Updating product. To update the product you must transfer valid data e.g

```javascript
{
	"name": "book",
	"price" : "23.00"
}
```
or only one parameter:
```javascript
{
	"name": "ball"
}
```
###### Delete Method
Deleting product. To delete a product you mass pass id:
```javascript
{
	"_id": "5bf1d2160752f2098c00041e"
}
```
#### /products/_id Single Product
###### Get Method 
Showing requested product data

```json
{
    "_id": "5bf1d2160752f2098c00041e",
    "name": "ball",
    "price": 50
}
```