module.exports=(function () {
    return function (res,user) {
        var obj={};
        var sql=require("mysql");
        var connect=sql.createConnection({
            host:"localhost",
            user:"root",
            password:"root",
            port:"3306",
            database:"armani"
        });
        connect.connect();
        var userName=`SELECT * FROM user where email like '${user}'`;
        connect.query(userName,function (err,result) {
            if(err){
                console.log("error");
            }
            console.log(result.length);
            if(result.length===0){
                connect.end();
                res.write("true");
                res.end();
            }else{
                connect.end();
                res.write("false");
                res.end();
            }
        });
    }
})();