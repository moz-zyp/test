
module.exports=(function () {
   return function (res,_data) {
       var bool=false;
       var sql=require("mysql");
       var connect=sql.createConnection({
           host:"localhost",
           user:"root",
           password:"root",
           port:"3306",
           database:"armani"
       });
       var data=_data;
       connect.connect();
       var user=`SELECT * FROM user where email like '${data.email}'`;
       console.log("aaa");
       connect.query(user,function (err,result) {
           if(err){
               console.log("error");
           }
           if(result.length>0){
               return false;
           }else{
               var addSql="INSERT INTO user(sex,password,name,email,tel) VALUE(?,?,?,?,?)";
               var addSqlItem=[data.sex,data.password,data.name,data.email,data.tel];
               connect.query(addSql,addSqlItem,function (err,result) {
                   if(err){
                       console.log("插入失败");
                   }
                   console.log(result);
                   connect.end();
               })
           }
       });
       res.write(encodeURIComponent(JSON.stringify(data.name)));
       res.end();
   }
})();