let express = require('express');
const path = require("path");

let allPlayers = require("../data/players.js");
let apiRouter = express.Router();

apiRouter.get("/api/getHeroes", function(req, res){
     return res.json(allPlayers);
});

apiRouter.get("/api/getOpponent/:oppnent", function(req, res){
     let charVals, char, oppList,diffenetial, curOpp;
     charVals = req.params.oppnent.split("&");
     char = allPlayers.filter( o => {
          return o.alias == charVals[0] && o.name == charVals[1];
     })[0];
     if(charVals[2] == "false"){
          oppList = allPlayers.filter( o => {
               return o.side != char.side;
          })
     }else{
          oppList = allPlayers.filter( e => {
               return e.alias != char.alias && e.name != char.name;
          })
     }
     cruOpp = oppList[0];
     diffenetial = 56;
     oppList.forEach( o => {
          let temp = compareSkills(char.skill, o.skill);
          if(Math.abs(temp) < Math.abs(diffenetial)){
               diffenetial = temp;
               curOpp = o;
          }else if(Math.abs(temp) == Math.abs(diffenetial) && temp > diffenetial ){
               diffenetial = temp;
               curOpp = o;
          }
     }) 
     function compareSkills(skill1, skill2){
          let s1 = sum(skill1);
          let s2 = sum(skill2);
          return s1-s2;

          function sum(obj){
               return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
          }
     }
     return res.json({char:char, curOpp:curOpp});
});

apiRouter.post("/api/addhero", function(req, res){
     var hero = req.body;
     let char = allPlayers.filter( o => {
          return o.alias == hero.alias && o.name == hero.name;
     })
     if(char.length > 0){
          return res.json({saved:false, reason:"Character Exists"});
     }
     allPlayers.push(hero);
     return res.json({saved:true, reason:"Character Added"});
 });

module.exports = apiRouter;