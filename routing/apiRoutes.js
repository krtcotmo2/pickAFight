let express = require('express');
const path = require("path");

let allPlayers = require("../data/players.js");
let apiRouter = express.Router();



apiRouter.get("/api/getHeroes", function(req, res){
     return res.json(allPlayers);
});

apiRouter.post("/api/addhero", function(req, res){
     var hero = req.body;
     
     //need check to see if it exists
     allPlayers.push(hero);
     return res.json(true);
 });

module.exports = apiRouter;