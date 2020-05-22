class GoodsItem{
    constructor(parent){
        this.goodsList=[];
        this.parent=parent;
        this.ajax({type:0x10},parent);
    }
    ajax(_obj,parent){
        var self=this;
        var obj=encodeURIComponent(JSON.stringify(_obj));
        $.ajax({
            type:"POST",
            url:"http://10.9.25.246:3000",
            data:obj,
            success:function (data) {
                var elem=JSON.parse(decodeURIComponent(data));
                if(elem.length<1){
                    alert("请求失败");
                }else{
                    self.goodsList=elem;
                    var goodsListTop=document.getElementById("goodsListTop");
                    goodsListTop.textContent="商品（"+self.goodsList.length+"）";
                    var sort=document.querySelector(".sortText");
                    self.sortMouse=self.sortClickHandler.bind(self);
                    sort.addEventListener("click",self.sortMouse);
                    self.defaultGoodsList=self.goodsList;
                    self.setDataList();
                }
            }
        })
    }

    setDataList(){
        console.log(this.goodsList);
        for(var i=0;i<this.goodsList.length;i++){
            this.createBox(i,this.parent);
        }
    }

    sortClickHandler(e){
        e.target.nextElementSibling.style.display="block";
        var sortList=document.querySelector(".sort");
        this.sortMouse=this.sortMouseHandler.bind(this);
        sortList.addEventListener("mouseover",this.sortMouseHandler);
        sortList.addEventListener("mouseout",this.sortMouseHandler);
        sortList.addEventListener("mouseleave",this.sortMouseHandler);
        this.sortClick=this.sortListClickHandler.bind(this);
        sortList.addEventListener("click",this.sortClick);
    }

    sortMouseHandler(e){
        if(e.target.constructor===HTMLUListElement){
            if(e.type==="mouseleave"){
                e.target.style.display="none";
            }
            return;
        }
        switch (e.type){
            case "mouseover":
                e.target.style.backgroundColor="#cccccc";
                break;
            case "mouseout":
                e.target.style.backgroundColor="#ffffff";
                break;
        }
    }

    sortListClickHandler(e){
        console.log(e.target.textContent);
        switch (e.target.textContent){
            case "默认排序":
                this.goodsList=this.defaultGoodsList;
                break;
            case "价格升序":
                this.goodsList=this.sort(this.goodsList,false);//false为升序
                e.target.textContent="价格升序";
                break;
            case "价格降序":
                this.goodsList=this.sort(this.goodsList,true);//true为降序
                e.target.textContent="价格降序";
                break;
        }
        e.target.parentElement.style.display="none";
        this.clearBox();
    }

    clearBox(){
        while (this.parent.children.length>0){
            this.parent.lastElementChild.remove();
        }
        for(var i=0;i<this.goodsList.length;i++){
            this.createBox(i,this.parent);
        }
    }

    sort(data,bool){
        var priceList=[];
        for(var i=0;i<data.length;i++){
            priceList.push(data[i].price);
        }
        priceList=priceList.sort(function (pre,next) {
            return bool? next-pre : pre-next;
        });
        var sorted=[],index=0,pre;
        for(var i=0;i<priceList.length;i++){
            var arr=data.filter(function (t) {
                return t.price===priceList[i];
            });
            if(pre===priceList[i]){
                index++;
                sorted.push(arr[index]);
            }else{
                index=0;
                pre=priceList[i];
                sorted.push(arr[0]);
            }
        }
        return sorted;
    }

    createBox(i,parent){
        var box=this.$c("div",{
            width:"20%",
            margin:"60px 2.3%",
            float:"left",
            cursor:"default",
            border:"2px solid #ffffff",
            borderRadius:"15px"
        },parent);
        box.addEventListener("click",this.clickHandler,true);
        box.addEventListener("mouseenter",this.mouseHandler);
        box.addEventListener("mouseleave",this.mouseHandler);
        box.data=this.goodsList[i];
        var imgBox=this.$c("div",{
            width:"100%",
            height:"280px"
        },box);
        var img=this.$c("img",{
            margin:"auto",
            width:"250px",
            height:"250px"
        },imgBox);
        img.src=this.goodsList[i].imgSrc;
        var title=this.$c("p",{
            width:"100%",
            height:"38px",
            fontSize:"14px",
            textAlign:"center",
            lineHeight:"38px",
            cursor:"default"
        },box,this.goodsList[i].title);
        var engTitle=this.$c("p",{
            width:"100%",
            height:"30px",
            fontSize:"12px",
            textAlign:"center",
            lineHeight:"30px",
            cursor:"default"
        },box,this.goodsList[i].engTitle);
        var standards=this.$c("p",{
            width:"100%",
            height:"30px",
            padding:"15px 0",
            fontSize:"12px",
            textAlign:"center",
            lineHeight:"30px",
            background:"url('./images/stars.png') no-repeat center bottom",
            cursor:"default"
        },box,this.goodsList[i].standards);
        var bottomBox=this.$c("div",{
            height:"35px",
            width:"100%",
            margin:"15px 0"
        },box);
        var minBox=this.$c("div",{
            height:"35px",
            width:"200px",
            margin:"auto"
        },bottomBox);
        var style={
            height:"35px",
            width:"100px",
            float:"left",
            color:"#ffffff",
            fontSize:"14px",
            lineHeight:"35px",
            textAlign:"center",
            cursor:"default"
        };
        var price=this.$c("div",style,minBox,"￥"+this.goodsList[i].price);
        price.style.backgroundColor="#464646";
        var type=this.$c("div",style,minBox,this.goodsList[i].type);
        type.style.backgroundColor="#151515";
    }

    mouseHandler(e){
        if(e.type==="mouseenter"){
            e.target.style.borderColor="#c9c9c9";
        }else if(e.type==="mouseleave"){
            e.target.style.borderColor="#ffffff";
        }
    }


    clickHandler(e){
        if(e.currentTarget.constructor!==HTMLDivElement) return;
        console.log(JSON.stringify(e.currentTarget.data));
        sessionStorage.lookingGood=JSON.stringify(e.currentTarget.data);
        location.href="./goodsInfo.html";
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