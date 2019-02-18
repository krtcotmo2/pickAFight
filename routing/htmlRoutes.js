let express = require('express');
const path = require("path");
let htmRouter = express.Router();

htmRouter.get("/", function(req, res){
     res.sendFile(path.join(__dirname, "../public/home.html"));
});

htmRouter.get("/pickafight", function(req, res){
     res.sendFile(path.join(__dirname, "../public/pickAFight.html"));
});




module.exports = htmRouter;