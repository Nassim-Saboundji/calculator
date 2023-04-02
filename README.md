# calculator

Was done as part of an interview process.

Assuming you have nodejs install you need to do the following to run the project :
- run npm install
- node server.js

Visit localhost:3000 to use the app.

I have deployed it at the following url : https://calculator-xcy0.onrender.com/ (May be slow due to using the free tier of render.com)

[Read the design doc.](./DESIGN_DOC.md)

Notes:
- To have nested square roots in an expression using the calculator you must use parenthesis.

Example : 

1. √  (  √  ( 256 )  )  will work.
2.  √  (  √ 256 ) will also work.
3. √  √ 256 will not work.

- The same thing applies to the percentage operator.

Example : 
1.  ( 5 %  )  % will work.
2. 5 %  % will not work.
