# AddressBook_RESTAPI_NodeJS
##### A REST API of an address book using NodeJS, ExpressJS and MongoDB

### Routes
*	GET - Get a list of all contacts using pagination, Get a specific contact by id
*	POST - Add a new contact, Add Bulk Contacts,Get list of contacts using firstName, contactno or lastName
*	PUT - Update a contact
*	DELETE - Delete a contact

### Installation:
Clone the git repository / download and extract the .zip file. Navigate into the root of your application on commandline and type
`npm install` . It will install all the dependencies listed in package.json.

### How to run the code:
* Navigate into the root of the application and type `nodemon ./src/server.js` to start the server. The server can be accessed at `http://localhost:3000`, 

### REST API URLs
##### Auth
* POST	`http://localhost:3000/auth/login`

##### Contact
[Note]: Take your access_token and pass on to the req.headers['Authorization'] like Bearer 'token'
* GET(all contacts) `http://localhost:3000/contact/`
* GET(all contacts using Pagination) `http://localhost:3000/contact/page={ offset }&size={ limit }`
* POST(add a contact) `http://localhost:3000/contact/add` the request.body looks like:
	```json
	{
	"firstName":"Mahendra",
    "lastName":"Dhoni",
    "contactNo":"333-666-222",
    "city":"Ranchi",
    "street":"17-0",
    "post_code":"445555",
    "country":"India"
	}
	```
* POST (add bulk contacts)`http://localhost:3000/contact/bulk` the request.body looks like:
```json
[
	{
		"firstName":"Mahendra",
    "lastName":"Dhoni",
    "contactNo":"333-666-222",
    "city":"Ranchi",
    "street":"17-0",
    "post_code":"445555",
    "country":"India"
	},
	{
		"firstName":"Mahendra",
    "lastName":"Dhoni",
    "contactNo":"333-666-222",
    "city":"Ranchi",
    "street":"17-0",
    "post_code":"445555",
    "country":"India"
	}
  ]
```
*POST (get a matching contact using firstName, lastName or contactNo)`http://localhost:3000/contact the request body looks like:
```json
{
  "firstName":"John"
}

```
* PUT `http://localhost:3000/contact/:{id}`
	```json
	{
	"name.firstName": "Kevin",
	"name.lastName": "Peterson",
  "contactNo": "333-222-111",
  "address.country":"India"
  }
	```
  
* DELETE `http://localhost:3000/contact/:{id}`
  

### Testing 
* The API was tested using Jest and Supertest.
* Run `npm run test` to run the tests
