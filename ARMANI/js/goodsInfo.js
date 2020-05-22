class GoodsInfo{
    constructor(parent){
        this.pre=1;
        this.goodLooking=JSON.parse(sessionStorage.lookingGood);
        this.topList=["主页","香水专区","男士香水系列",this.goodLooking.title];
        this.createTop(parent);
        this.createBox(parent);
    }

    createTop(parent){
        var top=this.$c("p",{
            height:"16px",
            marginLeft:"30px",
            padding:"18px 0",
            fontSize:"12px",
            lineHeight:"16px",
            color:"#959595",
        },parent);
        for(var i=0;i<this.topList.length;i++){
            this.$c("a",{
                float:"left"
            },top,this.topList[i]);
            if(i<this.topList.length-1){
                this.$c("span",{
                    float:"left",
                    margin:"0 5px"
                },top,">")
            }
        }
    }

    createBox(parent){
        this.wrap=this.$c("div",{
            width:"1250px",
            padding:"20px 0 100px",
            margin:"auto"
        },parent);
        this.divLeft=this.$c("div",{
            width:"700px",
            marginRight:"30px",
            paddingTop:"30px",
            position:"relative",
            float:"left"
        },this.wrap);
        this.divRight=this.$c("div",{
            width:"520px",
            float:"left"
        },this.wrap);
        this.divAfter=this.$c("div",{
            height:"0",
            clear:"both",
            visibility:"hidden",
            content:".",
            display:"block"
        },this.wrap);
        this.createLeft();
        this.createRight();
        var love=this.$c("i",{
            display:"block",
            width:"27px",
            height:"22px",
            position:"absolute",
            top:"0",
            right:"20px",
            backgroundImage:"url('./images/loveEmpty.png')"
        },this.divLeft);
        love.addEventListener("click",this.loveClickHandler);
    }

    createLeft(){
        this.rollImg=this.$c("ul",{
            width:"60px",
            float:"left",
            marginRight:"50px",
            padding:"20px 0"
        },this.divLeft);
        for(var i=1;i<=this.goodLooking.imgNum;i++){
            var li=this.$c("li",{
                width:"56px",
                height:"56px",
                border:"2px solid #ffffff",
                margin:"10px 0"
            },this.rollImg);
            if(i===1){
                li.style.borderColor="#000000";
            }
            var img=this.$c("img",{
                width:"54px",
                height:"54px",
                display:"block",
                border:"1px solid #cccccc"
            },li);
            var srcBefore=this.goodLooking.imgSrc.split(".png")[0];
            this.imgClick=this.imgClickHandler.bind(this);
            img.addEventListener("click",this.imgClick);
            img.src=srcBefore+"_"+i+".png";
        }
        this.imgWrap=this.$c("div",{
            width:"590px",
            height:"404px",
            float:"left"
        },this.divLeft);
        this.imgBox=this.$c("div",{
            width:"400px",
            height:"400px",
            border:"2px solid #ffffff",
            position:"relative",
            overflow:"hidden",
            margin:"auto"
        },this.imgWrap);
        this.mouse=this.mouseHandler.bind(this);
        this.imgBox.addEventListener("mouseenter",this.mouse);
        this.imgBox.addEventListener("mouseleave",this.mouse);
        this.img=this.$c("img",{
            width:"400px",
            height:"400px",
            position:"absolute",
            top:0,
            left:0,
            zIndex:1
        },this.imgBox);
        this.img.src=this.goodLooking.imgSrc;
        this.shade=this.$c("div",{
            width:"200px",
            height:"200px",
            position:"absolute",
            top:0,
            left:0,
            zIndex:2,
            display:"none",
            backgroundColor:"rgba(108,108,108,0.2)"
        },this.imgBox);
        document.body.addEventListener("mousemove",this.mouse);
    }

    createRight(){
        this.$c("h1",{
            margin:"0",
            padding:"0",
            height:"31px",
            fontSize:"24px",
            lineHeight:"31px",
            color:"#000000"
        },this.divRight,this.goodLooking.title);
        this.$c("p",{
            marginTop:"10px",
            height:"21px",
            fontSize:"18px",
            lineHeight:"21px",
            color:"#666666"
        },this.divRight,this.goodLooking.engTitle);
        this.$c("p",{
            margin:"20px 0",
            fontSize:"14px",
            color:"#666666",
            lineHeight:"18px",
            height:"18px",
            paddingLeft:"75px",
            background:"url('./images/stars.png') no-repeat left center"
        },this.divRight,"共20条评论");
        this.$c("p",{
            fontSize:"14px",
            lineHeight:"18px",
            // height:"36px",
            color:"#666666",
            margin:"20px 0"
        },this.divRight,this.goodLooking.info);
        var stand=this.$c("div",{
            height:"42px",
            margin:"10px 0"
        },this.divRight);
        this.$c("a",{
            display:"block",
            width:"130px",
            height:"40px",
            border:"1px solid #151515",
            fontSize:"12px",
            lineHeight:"40px",
            paddingLeft:"10px"
        },stand,this.goodLooking.standards);
        var gm=this.$c("div",{
            height:"45px"
        },this.divRight);
        var step=this.$c("p",{
            float:"left",
            height:"45px",
            width:"150px",
            // border:"1px solid #cccccc",
            marginRight:"10px"
        },gm);
        this.step=new StepNum(step);
        var gmObj={
            width:"170px",
            height:"45px",
            backgroundColor:"#373737",
            color:"#ffffff",
            fontSize:"15px",
            lineHeight:"45px",
            textContent:"center",
            textAlign:"center",
            cursor:"pointer",
            float:"left"
        };
        this.$c("span",gmObj,gm,"￥"+this.goodLooking.price);
        var gmType=this.$c("span",gmObj,gm);
        gmType.style.backgroundColor="#000000";
        if(this.goodLooking.type==="立即购买"){
            gmType.textContent="加入购物袋";
        }else{
            gmType.textContent=this.goodLooking.type;
        };
        this.btnClick=this.btnClickHandler.bind(this);
        gmType.addEventListener("click",this.btnClick);
    }

    btnClickHandler(e){
        var obj={
            type:0x21,
            value:{
                id:this.goodLooking.id,
                selected:false,
                imgSrc:this.goodLooking.imgSrc,
                title:this.goodLooking.title,
                standards:this.goodLooking.standards,
                price:this.goodLooking.price,
                num:this.step.step.value,
                sum:Number(this.goodLooking.price)*Number(this.step.step.value)
            }
        };
        shoppingAjax(obj);
        location.href="./shopping.html";
    }

    loveClickHandler(e){
        e.currentTarget.bool=!e.currentTarget.bool;
        if(e.currentTarget.bool){
            e.currentTarget.style.backgroundImage="url('./images/loveFull.png')";
        }else{
            e.currentTarget.style.backgroundImage="url('./images/loveEmpty.png')";
        }

    }

    imgClickHandler(e){
        if(this.pre){
            console.log(this.rollImg.children[this.pre-1]);
            this.rollImg.children[this.pre-1].style.borderColor="#ffffff";
        }
        this.pre=e.currentTarget.src.split(".png")[0].split("_")[1];
        this.rollImg.children[this.pre-1].style.borderColor="#000000";
        this.img.src=e.currentTarget.src;
    }

    mouseHandler(e){
        switch (e.type){
            case "mouseenter":
                this.shade.style.display="block";
                this.imgBox.style.borderColor="#000000";
                this.img.style.width="800px";
                this.img.style.height="800px";
                break;
            case "mousemove":
                var range=this.imgBox.getBoundingClientRect();
                this.shade.style.left=(e.clientX-range.left-100)+"px";
                this.shade.style.top=(e.clientY-range.top-100)+"px";
                if(this.shade.offsetLeft<0) this.shade.style.left=0;
                if(this.shade.offsetTop<0) this.shade.style.top=0;
                if(this.shade.offsetLeft>(this.imgBox.clientWidth-this.shade.offsetWidth)){
                    this.shade.style.left=(this.imgBox.clientWidth-this.shade.offsetWidth)+"px";
                }
                if(this.shade.offsetTop>(this.imgBox.clientHeight-this.shade.offsetHeight)){
                    this.shade.style.top=(this.imgBox.clientHeight-this.shade.offsetHeight)+"px";
                }
                this.img.style.left=-(2*this.shade.offsetLeft)+"px";
                this.img.style.top=-(2*this.shade.offsetTop)+"px";
                break;
            case "mouseleave":
                this.shade.style.display="none";
                this.imgBox.style.borderColor="#ffffff";
                this.img.style.width="400px";
                this.img.style.height="400px";
                break;
        }

    }
















    $c(elem,style,parent,text){
        var elem=document.createElement(elem);
        if(style){
            Object.assign(elem.style,style);
        }
        if(text) elem.textContent=text;
        if(!parent) parent=document.body;
        parent.appendChild(elem);
        return elem;
    }
}