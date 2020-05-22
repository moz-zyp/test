var nav,navUl,leave,header,log,logText,headerRight,user,password,submit,signUp,recordName;
init();
function init() {
    logText=document.getElementById("logText");
    if(sessionStorage.user) logText.textContent=sessionStorage.user;
    else logText.textContent="登录与注册";
    logText.addEventListener("mouseover",mouseHandler);

    leave=document.getElementById("leave");
    leave.addEventListener("mouseleave",mouseHandler);

    headerRight=document.getElementsByClassName("headerRight")[0];
    headerRight.addEventListener("mouseleave",mouseHandler);

    log=document.getElementById("log");
    log.addEventListener("mouseleave",mouseHandler);

    header=document.getElementsByTagName("header")[0];

    nav=document.getElementById("nav");
    navUl=document.querySelector(".navUl");
    console.log(navUl,navUl.clientWidth);
    document.addEventListener("scroll",scrollHandler);
    getUlWidth();

    user=document.getElementById("user");
    user.addEventListener("change",changeHandler);

    password=document.getElementById("password");
    password.addEventListener("change",changeHandler);

    submit=document.getElementById("submit");
    submit.addEventListener("click",clickHandler);

    signUp=document.getElementById("signUp");
    signUp.addEventListener("click",signClickHandler);

    recordName=document.getElementById("recordName");
    recordName.addEventListener("change",recordNameChange);


    if(logText.textContent==="登录与注册" && localStorage.userName){
        user.bool=true;
        user.value=localStorage.userName;
        recordName.checked=true;
    }
}

function recordNameChange() {
    if(recordName.checked){
        localStorage.userName=user.value;
    }
}

function signClickHandler(e) {
    location.href="./signUp.html"
}

function changeHandler(e) {
    this.bool=false;
    console.log("aaaa");
    if(this==="user"){
        if(/^\w+@\w{1,8}\.[a-z]{2,3}$/.test(this.value)){
            this.bool=true;
        }
    }else{
        if(this.value.length>5)
            this.bool=true;
    }
}

function clickHandler(e) {
    console.log(user.bool,password.bool);
    if(!user.bool || !password.bool){
        alert("填写错误，请重新填写");
        return;
    }
    var obj={
        type:0x31,
        value:{
            user:user.value,
            password:password.value
        }
    };
    ajax(obj);
}

function scrollHandler(e) {
    if(document.documentElement.scrollTop>header.offsetHeight+nav.offsetHeight){
        nav.firstElementChild.lastElementChild.style.display="inline";
        Object.assign(nav.style,{
            position:"fixed",
            top:0,
            zIndex:9999
        });
        nav.lastElementChild.style.display="inline";
    }else{
        nav.style.position="relative";
        nav.firstElementChild.lastElementChild.style.display="none";
        nav.lastElementChild.style.display="none";

    }
    getUlWidth();
}

function getUlWidth() {
    var len;
    if(!this.bool){
        this.bool=true;
        len=nav.firstElementChild.children.length-1;
    }else{
        len=nav.firstElementChild.children.length;
    }

    var width=0;
    for(var i=0;i<len;i++){
        // console.log(window.getComputedStyle(navUl.children[i],null).width);
        // console.log(navUl.children[i],navUl.children[i].offsetWidth);

        width+=navUl.children[i].offsetWidth;
    }
    nav.style.paddingLeft=(document.documentElement.clientWidth-width)/2+"px";
    nav.style.paddingRight=(document.documentElement.clientWidth-width)/2+"px";
}

function mouseHandler(e) {
    switch(e.type){
        case "mouseleave":
            log.style.display="none";
            leave.style.display="none";
            break;
        case "mouseover":
            console.log(this.textContent);
            if(this.textContent==="登录与注册"){
                /*if(localStorage.userName){
                    user.bool=true;
                    user.value=localStorage.userName;
                    recordName.checked=true;
                }*/
                log.style.display="block";
            }else{
                console.log("aaa");
                leave.style.display="block";
                var btn=document.getElementById("leaveBtn");
                btn.addEventListener("click",leaveClickHandler)
            }
            break;
    }
}

function leaveClickHandler(e) {
    console.log("aaaa");
    document.getElementById("p2").textContent=this.textContent;
    logText.textContent="登录与注册";
    sessionStorage.user="";
    leave.style.display="none";
    location.reload();
}

function test(str) {
    console.log(typeof str);
    if(typeof str==="string"){
        if(str==="passError"){
            alert("账号或密码错误")
        }else{
            sessionStorage.user="欢迎你"+str;
            location.reload();
        }
    }else if(typeof str==="boolean"){
        console.log("aaaa");
        if(!str){
            var elem=inputList[0].nextElementSibling;
            elem.style.display="block";
            elem.textContent="该用户已存在";
            console.log(inputList[0].nextElementSibling);
        }
    }
}


