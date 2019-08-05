const express = require('express');
/*const userRouter = require("./routes/users.js");
const blogRouter = require("./routes/blogs.js");*/
const app = express();
const port = 3000;

app.use(express.static('public'));
/*app.use('/users',userRouter);
app.use('/blogs',userRouter);*/

app.use('/users',require("./routes/users.js"));
app.use('/blogs',require("./routes/blogs.js"));

app.listen(port,()=>console.log(`app listening on port ${port}!`));