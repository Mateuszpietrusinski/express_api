# Simple Express API

Restful API based on Node.js / express. This project is still in development process. It may contains bugs, be careful to use it.

##/Products endpoint <br />
######Get Method
Showing all the products stored in Database 
######Post Method
Adding new product. The payload should contain data like this:
```
{
	"name": "ball",
	"price" : "50.00"
}
```
######Patch Method
Updating product. To update the product you must transfer valid data e.g

```
{
	"name": "book",
	"price" : "23.00"
}
```
or only one parameter:
```
{
	"name": "ball",
}
```
######Delete Method
Deleting product. To delete a product you mass pass id:
```
{
	"_id": "5bf1d2160752f2098c00041e",
}
```
