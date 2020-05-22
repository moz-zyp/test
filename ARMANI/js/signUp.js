var sexList=document.querySelectorAll("[type=radio]");
var sex;
var submitList=["email","name","pass","passAgain","tel","read","submit"];
var inputList=[];
for(var i=0;i<submitList.length;i++){
    inputList.push(document.getElementById(submitList[i]))
}
for(var i=0;i<inputList.length;i++){
    if(inputList[i].type==="password"){
        inputList[i].addEventListener("input",inputHandler)
    }else if(inputList[i].type==="submit"){
        inputList[i].bool=true;
        var str=inputList[i].addEventListener("click",clickHandler);
        if(str) alert(str);
    }
    else{
        inputList[i].addEventListener("change",changeHandler)
    }
}

function changeHandler(e) {
    this.bool=false;
    switch (this.name){
        case "sex":
            if(sexList[0].checked) sex=sexList[0];
            else sex=sexList[1];
            console.log(sex);
            break;
        case "email":
            if(/^\w+@\w{1,8}\.[a-z]{2,3}$/.test(this.value)){
                this.bool=true;
            }
            search(this.value);
            break;
        case "name":
            if(/^[\u4e00-\u9fd5]{2,10}$/.test(this.value)){
                this.bool=true;
            }
            break;
        case "tel":
            if(/^1[35678]\d{9}$/.test(this.value)){
                this.bool=true;
            }
            break;
        case "read":
            this.bool=this.checked;
            return;
    }
    setSpan(this,this.bool);
}

function inputHandler() {
    this.bool=false;
    if(this.value.length<6) return;
    setSpan(this,true);
    if(this.value.length>20) setSpan(this,false);
    this.bool=true;
    var len=this.value.length;
    var elem=this.nextElementSibling.firstElementChild;
    var w=(len-6)*8;
    if(w<1) w=1;
    if(w>100) w=100;
    elem.style.width=w+"%";
    console.log(elem,len);
    if(len>18){
        elem.textContent="非常强";
        elem.style.backgroundColor="#5cb85c";
    }else if(len>15){
        elem.textContent="强";
        elem.style.backgroundColor="#f0ad4e";
    }else if(len>12){
        elem.textContent="中";
        elem.style.backgroundColor="#f0ad4e";
    }else if(len>9){
        elem.textContent="弱";
    }
    if(this.name==="passAgain"){
        setSpan(this,this.value===this.parentElement.previousElementSibling.firstElementChild.nextElementSibling.value)
    }
}

function setSpan(elem,bool) {
    if(elem.type==="password"){
        elem=elem.nextElementSibling.nextElementSibling;
    }else{
        elem=elem.nextElementSibling;
    }
    if(bool){
        elem.style.display="none";
        return;
    }
    console.log(elem);
    elem.style.display="block";
}

function clickHandler(e){
    e.preventDefault();
    for(var i=0;i<inputList.length;i++){
        console.log(inputList[i],inputList[i].bool);
        if(!inputList[i].bool){
            alert( "填写错误，请修改");
            return;
        }
    }
    if(document.querySelectorAll("[type=radio]")[0].checked) sex="男士";
    else sex="女士";
    var obj={type:0x32,value:{}};
    obj.value={
        sex:sex,
        name:inputList[1].value,
        email:inputList[0].value,
        password:inputList[2].value,
        tel:inputList[4].value
    };
    ajax(obj);
    location.href="./index.html";
}

function search(str) {
    var obj={
        type:0x33,
        value:{
            user:str
        }
    };
    ajax(obj);
}

/*
function test2(str) {
    console.log(typeof str);
    if(typeof str==="string"){
        location.href="index.html";
        var elem=document.getElementById("logText");
        elem.textContent="欢迎你"+str;
    }else if(typeof str==="boolean"){
        console.log("aaaa");
        if(!str){
            var elem=inputList[0].nextElementSibling;
            elem.style.display="block";
            elem.textContent="该用户已存在";
            console.log(inputList[0].nextElementSibling);
        }
    }
}*/
