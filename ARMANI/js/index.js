class Carousel{
    constructor(parent,imgList){
        this.imgList=[];
        this.btnList=[];
        this.getImage(imgList);
        this.h=this.imgList[0].height;
        this.createBtn();
        this.rollImgWrap=this.createRollImgWrap(parent);
        this.rollImg=this.createRollImg();
    }
    getImage(imgList){
        for(var i=0;i<imgList.length;i++){
            var img=document.createElement("img");
            img.src="./images/"+imgList[i];
            Object.assign(img.style,{
                float:"left",
                width:"25%"
            });
            this.imgList.push(img);
        }
    }
    createRollImgWrap(parent){
        let div=document.createElement("div");
        Object.assign(div.style,{
            height:this.h+"px",
            position:"relative",
            margin:"20px auto",
            padding:"0 80px",
            overflow:"hidden",
            backgroundColor:"pink"
        });
        this.imgLeft=document.createElement("img");
        this.imgRight=document.createElement("img");
        parent.appendChild(div);
        return div;
    }
    createRollImg(){
        let div=document.createElement("div");
        Object.assign(div.style,{
            width:"80%",
            height:"100%",
            float:"left"
        });
        this.rollImgWrap.appendChild(this.btnList[0]);
        this.rollImgWrap.appendChild(div);
        this.rollImgWrap.appendChild(this.btnList[1]);
        return div;
    }
    createBtn(){
        for(var i=0;i<2;i++){
            let img=document.createElement("img");
            img.src="./images/arr"+(i+1)+".jpg";
            img.style.float="left";
            img.style.marginTop=(this.h-imgLeft.height)/2+"px";
        }
        let imgLeft=document.createElement("img");
        imgLeft.src="./images/arr1.jpg";
        imgLeft.style.float="left";
        imgLeft.style.width="5%";
        console.log(this.h,imgLeft.height);
        console.log(imgLeft.height)
        imgLeft.style.marginTop=(this.h-imgLeft.height)/2+"px";
        let imgRight=document.createElement("img");
        imgRight.src="./images/arr2.jpg";
        imgRight.style.float="left";
        this.btnList.push(imgLeft);
        this.btnList.push(imgRight);
    }
}
