function ajax(_obj) {
    console.log(_obj);
    var obj=encodeURIComponent(JSON.stringify(_obj));
    $.ajax({
        type:"POST",
        url:"http://10.9.25.246:3000",
        data:obj,
        success:function (data) {
            var rs=JSON.parse(decodeURIComponent(data));
            console.log("bbbbbbbbbbbbbbbbbbbbb");
            test(rs);
        }
    })
}