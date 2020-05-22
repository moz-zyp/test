var signUp=require("./signUp.js");
var log=require("./log.js");
var search=require("./search.js");
var goodsList=require("./goodsList.js");
var shoppingList=require("./shopping.js");
var server=require("./server.js");
var obj={
    signUp:signUp,
    log:log,
    search:search,
    goodsList:goodsList,
    shoppingList:shoppingList
};
server.start(obj);