const express = require("express");
const path = require("path");

// Sets up the Express app to handle data parsing and root level definition
let app = express();
let PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(__dirname + "/"));


let htmRoutes = require('./routing/htmlRoutes.js');
app.use("/", htmRoutes);
let apiRoutes = require('./routing/apiRoutes.js');
app.use("/", apiRoutes);



// Starts the server to begin listening
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});