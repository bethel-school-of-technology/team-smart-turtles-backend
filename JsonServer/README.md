This JsonServer file is set up with the same data structure i am going to use for the Node.js backend, lets go over it.  
{
      "itemId": 1, //the id will be auto-incremented
      "name": "Item 1", //basic string
      "available": true, //the clock-in clock-out value
      "createdAt": "2023-08-27T12:34:56.789Z", //date created
      "updatedAt": "2023-08-27T12:34:56.789Z", //will be dynamucally updated whenever the availability is changed
      "usedBy": { //this will be the foreign key that binds the user database and item datapbase together
        "name": "User 42"
      }
    },

I strongly suggest not adding any verification in yet because its to hard to do with json server. 

Happy hacking smart turtles. 