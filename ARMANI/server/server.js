var http=require("http");
var str=require("querystring");
var server;
var route;
var shoppingList=[];
function start(_route) {
    route=_route;
    server=http.createServer(function (req,res) {
        var str="";
        req.on("data",function (_data) {
            str+=_data;
        });
        req.on("end",function () {
            var obj=JSON.parse(decodeURIComponent(str));
            res.writeHeader(200,{"Context-Type":"text/html","Access-Control-Allow-Origin":"*"});
            switch(obj.type){
                case 0x31:
                    route.log(res,obj.value.user,obj.value.password);
                    break;
                case 0x32:
                    route.signUp(res,obj.value);
                    break;
                case 0x33:
                    route.search(res,obj.value.user);
                    break;
                case 0x10:
                    res.write(decodeURIComponent(JSON.stringify(route.goodsList)));
                    res.end();
                    break;
                case 0x20:
                    route.shoppingList.getShoppingList(res);
                    break;
                case 0x21:
                    route.shoppingList.add(res,obj.value);
                    break;
                case 0x22:
                    route.shoppingList.changeNum(res,obj.value);
                    break;
                case 0x23:
                    route.shoppingList.remove(res,obj.value);
                    break;
                case 0x24:
                    route.shoppingList.select(res,obj.value);
                    break;
                case 0x25:
                    route.shoppingList.selectAll(res,obj.value);
                    break;
            }
        })
    });
    server.listen(3000,"10.9.25.246",function () {
        console.log("开启服务")
    });
}
exports.start=start;