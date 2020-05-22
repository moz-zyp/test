class Carousel{
    constructor(imgList,parent){
        this.w=parent.clientWidth*0.8/4;
        this.imgList=[];
        this.bnList=["arr1.jpg","arr2.jpg"];
        this.getImage(imgList);
        this.h=490;
        this.createBox(parent);
        this.createRollImg();
        this.putLeftRight();
        this.first=0;
        this.last=3;
        this.speed=20;
    }

    getImage(imgList){
        for(var i=0;i<imgList.length;i++){
            var img=document.createElement("img");
            img.src="./images/"+imgList[i];
            img.style.float="left";
            img.style.width=this.w+"px";
            this.imgList.push(img);
        }
    }


    $c(elem,style,parent){
        var elem=document.createElement(elem);
        Object.assign(elem.style,style);
        parent.appendChild(elem);
        return elem;
    }


    createBox(parent){
        this.rollImgWrap=this.$c("div",{
            width:"100%",
            height:this.h+"px"
        },parent);
        this.imgLeft=this.$c("div",{
            width:"10%",
            float:"left",
            height:"100%",
            position:"relative"
        },this.rollImgWrap);
        this.rollImg=this.$c("div",{
            width:"80%",
            float:"left",
            position:"relative",
            height:"100%",
            overflow:"hidden"
        },this.rollImgWrap);
        this.imgRight=this.$c("div",{
            width:"10%",
            float:"left",
            height:"100%",
            position:"relative"
        },this.rollImgWrap);
    }


    createRollImg(){
        this.imgCon=this.$c("div",{
            height:"100%",
            width:"100%",
            position:"absolute"
        },this.rollImg);
        for(var i=0;i<4;i++){
            this.imgCon.appendChild(this.imgList[i]);
        }
    }


    putLeftRight(){
        for(var i=0;i<this.bnList.length;i++){
            var img=document.createElement("img");
            this.clickBind=this.clickHandler.bind(this);
            img.addEventListener("click",this.clickBind);
            img.src="./images/"+this.bnList[i];
            img.style.position="absolute";
            img.style.top=(this.h-img.height)/2+"px";
            img.style.width="30%";
            img.style.left="35%";
            if(i===0){
                this.imgLeft.appendChild(img);
                continue;
            }
            this.imgRight.appendChild(img);
        }
    }


    clickHandler(e){
        console.log("aaaaa");
        if(this.imgMove) return;
        this.animation();
        if(e.target.src.indexOf("arr")===-1) return;
        if(e.target.src.indexOf("arr1")>-1){
            this.direction="right";
            this.first--;
            if(this.first<0) this.first=this.imgList.length-1;
            if(this.last<0) this.last=this.imgList.length-1;
            this.last--;
        }else{
            this.direction="left";
            this.first++;
            this.last++;
            if(this.last>this.imgList.length-1) this.last=0;
            if(this.first>this.imgList.length-1) this.first=0;
        }
        this.initNext();
    }


    initNext(){
        this.imgCon.style.width="125%";
        if(this.direction==="left"){
            this.imgCon.appendChild(this.imgList[this.last]);
        }else if(this.direction==="right"){
            this.imgCon.style.left=-this.w+"px";
            this.imgCon.insertBefore(this.imgList[this.first],this.imgCon.firstElementChild);
        }
        this.imgMove=true;
    }


    animation(){
        this.moveImgBind=this.moveImg.bind(this);
        this.id=setInterval(this.moveImgBind,50);
    }


    moveImg(){
        if(!this.imgMove) return;
        if(this.direction==="left"){
            this.imgCon.style.left=this.imgCon.offsetLeft-this.speed+"px";
            if(this.imgCon.offsetLeft<=-this.w){
                this.imgMove=false;
                this.imgCon.firstElementChild.remove();
                this.imgCon.style.width="100%";
                this.imgCon.style.left=0;
                clearInterval(this.id);
            }
        }else if(this.direction==="right"){
            this.imgCon.style.left=this.imgCon.offsetLeft+this.speed+"px";
            if(this.imgCon.offsetLeft>=0){
                this.imgMove=false;
                this.imgCon.lastElementChild.remove();
                this.imgCon.style.width="100%";
                this.imgCon.style.left=0;
                clearInterval(this.id);
            }
        }
    }
}