module.exports=(function () {
    return function (res,user,pass) {
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
        var tel=`SELECT * FROM user where tel like '${user}'`;
        connect.query(userName,function (err,result) {
            if(err){
                console.log("error");
            }
            if(result[0] && result[0].password===pass){
                connect.end();
                res.write(encodeURIComponent(JSON.stringify(result[0].name)));
                res.end();
            }else{
                connect.end();
                res.write(encodeURIComponent(JSON.stringify("passError")));
                res.end();
            }
        });
        /*console.log(bool);
        connect.query(tel,function (err,result) {
            if(err){
                console.log("error");
            }
            if(result.length>0 && result[0].password===pass){
                console.log(this)
            }
        });*/

    }
})();