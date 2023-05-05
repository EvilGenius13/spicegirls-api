# Deploy your database on Atlas

This guide will help you connect to a MongoDB cloud instance.


# First steps
Register an account at https://account.mongodb.com/account/login
Start a new project - you can name this project whatever you like. It will hold your database.

## Creating a database

 1. You should see a screen saying Create a database. Click "Build a Database"
![enter image description here](https://i.ibb.co/jyYT5Ln/Screenshot-2023-05-03-at-5-48-41-PM.png)
 2. There are 3 choices of "tiers". Pick M0 Free. This is a no-fee shared server
 3. Choose a provider with a location near you, I do recommend aws us-east or us-west. There are multiple options, pick whatever suits you.
 4. Choose a name for your cluster. I recommend lowercase names with hyphens in between words. EX: "myapi-cluster"

## Security Quickstart

You should now be presented with a page saying "Security Quickstart"

 1. Under how would you like to authenticate, choose  username and password. Click "Create User". Fill in the fields. Make sure you write those down.
 2. Under where would you like to connect from, choose My local environment. You will see an area to add IP access. If you don't add your IP, you won't be able to connect to the database. You can find your IP address by going here : https://www.ipchicken.com/ Then, click "Add Entry".
 3. Click Finish and Close

## Getting your cluster address

You should be looking at your brand new cluster. 
![enter image description here](https://i.ibb.co/tQD71zM/Screenshot-2023-05-03-at-5-58-53-PM.png)

 1. Click "Connect"
 2. Click "Drivers"
 3. Copy the code you see under "Add your connecting string into your application code" and paste it into your .env file. If you don't yet have one yet, you should make one.

## Updating your .env file

This is how I set up my .env file. Feel free to change it as you please. If you copied the address in the step above and pasted it into your env file, it should look like this.
```mongodb+srv://admin:<password>@test-cluster.nd8ow5m.mongodb.net/testdatabase?retryWrites=true&w=majority```
This is the full connection string. In this case, `admin` is the username, `password` is where your password would go, and the `@test-cluster.nd8ow5m.mongodb.net/testdatabase?retryWrites=true&w=majority` is the direct connection to your database. 
*Please Note: the /testdatabase is where you would put whatever you want your database name to be (ex: if your database is dogs, do /dogs)*

You could choose to save your string as something like DB_CONNECTION but I prefer to break it down a bit further.
```js
ATLAS_USERNAME = admin
ATLAS_PASSWORD = your-password
ATLAS_URI = @test-cluster.nd8ow5m.mongodb.net/testdatabase?retryWrites=true&w=majority
```


## Connecting the database

Create a file called db.js or whatever you would like to call the file that will connect you to your database
This is how your setup can look:

```javascript
require('dotenv').config();
const  mongoose  =  require('mongoose');
const  ATLAS_USER  =  process.env.ATLAS_USER;
const  ATLAS_PASSWORD  =  process.env.ATLAS_PASSWORD;
const  ATLAS_URI  =  process.env.ATLAS_URI;

// Connect to MongoDB
const  mongoUri  =  `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}${ATLAS_URI}`;

mongoose.connect(mongoUri, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() =>  console.log('Connected to MongoDB'))
.catch(error  =>  console.error('Error connecting to MongoDB: ', error));

module.exports  =  mongoose.connection;
```
You need dotenv to get information from your .env file
If you did everything correctly, you should be connected to your database!

###### Author: Josh Faigan