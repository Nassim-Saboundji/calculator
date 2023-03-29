# Design Doc
This document outlines the approach used to build this calculator application.

Most of the calculator code is going to be client side. I have opted for using html/css and javascript to build it for 2 reasons.

1 - I estimate that there isn't going to be a huge amount of reactivity and state management warranting the use of a heavy front-end framework like React.

2 - I want to demonstrate my understanding of javascript fundamentals.

My approach to how the calculator will work is as follows :
- The calculator takes user input.
- Convert that mathematical expression provided by the user to a javascript expression.
- Execute the javascript expression safely
and retrieve the result.

The idea here is to offload mathematical computation to javascript itself. To do so
safely, I will create a sandbox from which to execute javascript. It needs to be isolated from the javascript code written to make the calculator itself.

To do so, I'll be using the iframe element and to be more precise its contentWindow. By executing the javascript code
in the contentWindow of the iframe, I'm able to isolate it 
from the rest of the application.

This iframe is not going to be visible to the end user and is 
just used for sandboxing purposes.

For the networking features of the calculator (login, singup), I have gone with an express server. This server serves the calculator but is also used to define routes used for authentication.

I have opted for sqlite as the database for this project as it is simple to set up and doesn't require the use of a separate server.

When the user creates an account I'm going to store the username and a hash of the password in the database. It is important to avoid storing the password itself in the database as a security measure.

When the user tries to login we verify if the password provided corresponds to the hash we store in our database. If it's the case then we can confirm that the user is who we think they are. We will then create a session and store that user's username.

When the user is sent back to the calculator's page, we will make a fetch get request to a rout to get the current user's username and display it at the top.