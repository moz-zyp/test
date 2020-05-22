class ShoppingTable{
    constructor(parent,data){
        this.data=data;
        this.parent=parent;
        this.header=["全选","产品","单价","数量","价格"];
        this.headerWidth=[74,292,387,141,187,119];
        this.createTable();
    }

    createTable(){
        this.table=this.$c("table",{
            width:"1200px",
            collapse:"collapse",
            cellSpacing:0,
            cellPadding:0,
            borderSpacing:0,
            border:"none"
        },this.parent);
        this.createTh();
        for(var i=0;i<this.data.length;i++){
            this.createTrAndTd(this.data[i]);
        }
        this.createTf();
    }

    createTh(){
        this.tableTh=this.$c("tr",{
            height:"66px",
            backgroundColor:"#eeeeee",
            border:"none"
        },this.table);
        for(var i=0;i<this.headerWidth.length;i++){
            var th=this.$c("th",{
                fontWeight:"normal",
                fontSize:"18px",
                border:"none",
                width:this.headerWidth[i]+"px",
                height:"21px",
                lineHeight:"21px",
                padding:"21 0",
                color:"#000000"
            },this.tableTh);
            if(i===0){
                this.selectAll=this.$c("input",{
                    width:"19px",
                    height:"19px",
                    display:"block",
                    margin:"auto"
                },th);
                this.selectAll.type="checkbox";
                this.getAllSelect();
                this.check=this.checkHandler.bind(this);
                this.selectAll.addEventListener("change",this.check);
            }else{
                th.textContent=this.header[i-1];
            }
        }
    }

    createTrAndTd(data){

        var tr=this.$c("tr",{
            height:"250px"
        },this.table);
        var pObj={
            height:"17px",
            fontSize:"14px",
            lineHeight:"17px",
            textAlign:"center",
            color:"#000000"
        };
        for(var i=0;i<this.headerWidth.length;i++){
            var td=this.$c("td",{
                height:"250px",
                width:this.headerWidth+"px",
                borderBottom:"1px solid #cccccc"
            },tr);
            switch (i){
                case 0:
                    var checkbox=this.$c("input",{
                        width:"19px",
                        height:"19px",
                        display:"block",
                        margin:"auto"
                    },td);
                    checkbox.type="checkbox";
                    checkbox.id=data.id;
                    checkbox.addEventListener("change",this.check);
                    checkbox.checked=data.selected;
                    break;
                case 1:
                    var img=this.$c("img",{
                        width:"160px",
                        height:"160px",
                        display:"block",
                        margin:"auto"
                    },td);
                    img.src=data.imgSrc;
                    break;
                case 2:
                    this.createInfoBox(data,td);
                    break;
                case 3:
                    this.$c("p",pObj,td,"￥"+data.price.toFixed(2));
                    break;
                case 4:
                    // console.log("aaaa");
                    console.log(data.num);
                    var step=new StepNum(td,data.num);
                    step.boxWrap.style.margin="auto";
                    this.stepInput=this.inputHandler.bind(this);
                    step.step.id=data.id;
                    step.step.addEventListener("change",this.stepInput);
                    step.sub.addEventListener("click",this.stepInput);
                    step.sup.addEventListener("click",this.stepInput);
                    break;
                case 5:
                    this.$c("p",pObj,td,"￥"+Number(data.sum).toFixed(2));
                    break;
            }
        }
    }

    createInfoBox(data,parent){
        var infoDiv=this.$c("div",{
            width:"220px",
            margin:"auto"
        },parent);
        var title=this.$c("p",{
            fontSize:"14px",
            lineHeight:"19px",
            height:"19px",
            color:"#000000"
        },infoDiv,data.title);
        var stand=this.$c("p",{
            fontSize:"12px",
            lineHeight:"15px",
            height:"15px",
            padding:"15px 0 35px",
            color:"#000000"
        },infoDiv,data.standards);
        var infoDivBottom=this.$c("p",{
            height:"15px",
        },infoDiv);
        var del=this.$c("span",{
            display:"block",
            fontSize:"12px",
            lineHeight:"15px",
            color:"#000000",
            cursor:"pointer",
            textDecoration:"underline"
        },infoDivBottom,"删除");

        this.delClick=this.delClickHandler.bind(this);
        del.id=data.id;
        del.addEventListener("click",this.delClick);
    }

    createTf(){
        var tr=this.$c("tr",{
            height:"100px"
        },this.table);
        this.allSumText=this.$c("td",{
            fontSize:"25px",
            lineHeight:"50px",
            // width:"850px",
            height:"50px",
            padding:"25px",
            paddingLeft:"150px",
            margin:"0 auto"
        },tr,"总价：￥"+this.sum);
        this.getSum();
        this.allSumText.colSpan=4;
        var td=this.$c("td",{
            height:"50px",
            width:"250px",
            padding:"25px",
        },tr);
        td.colSpan=2;
        this.allSumBtn=this.$c("span",{
            display:"block",
            margin:"auto",
            fontSize:"18px",
            lineHeight:"50px",
            height:"50px",
            borderRadius:"10px",
            width:"100px",
            textAlign:"center",
            backgroundColor:"rgb(255,10,10)",
            color:"#ffffff"
        },td,"去支付");
        this.writeTableTitle();
    }
    writeTableTitle(){
        document.querySelector(".tableTitle").textContent="我的购物袋（"+(this.table.children.length-2)+"个）";
    }

    clearTable(){
        if(this.table){
            this.table.remove();
            this.table=null;
        }

    }

    checkHandler(e){
        if(e.target===this.selectAll){
            for(var i=0;i<this.data.length;i++){
                this.data[i].selected=e.target.checked;
            }
            console.log(e.target.checked);
            var obj={
                type:0x25,
                value:{
                    selected:e.target.checked
                }
            };
            shoppingAjax(obj);
        }else{
            this.data=this.data.filter(function (t) {
                if(t.id===Number(e.target.id)){
                    t.selected=e.target.checked;
                }
                return t;
            });
            console.log(e.target.checked);
            var obj={
                type:0x24,
                value:{
                    id:e.target.id,
                    selected:e.target.checked
                }
            }
            shoppingAjax(obj);
        }

        this.clearTable();
        this.createTable();
    }

    inputHandler(e){
        var id,value;
        if(e.target.textContent==="-"){
            id=e.target.nextElementSibling.id;
            value=e.target.nextElementSibling.value;
        }else if(e.target.textContent==="+"){
            id=e.target.previousElementSibling.id;
            value=e.target.previousElementSibling.value;
        }else{
            id=e.target.id;
            value=e.target.value;
        }
        if(value==="") return;
        this.data=this.data.filter(function (t) {
            if(t.id===Number(id)){
                console.log("bbbb");
                t.num=Number(value);
                t.sum=Number(t.price)*Number(t.num);
                console.log(t.num,t.sum);
            }
            return t;
        });
        var obj={
            type:0x22,
            value:{
                id:id,
                num:Number(value)
            }
        };
        shoppingAjax(obj);
        this.clearTable();
        this.createTable();
    }

    delClickHandler(e){
        var id=e.target.id;
        this.data=this.data.filter(function (t) {
            return t.id!==Number(id);
        });
        var obj={
            type:0x23,
            value:{
                id:id
            }
        };
        shoppingAjax(obj);
        this.clearTable();
        this.createTable();
    }

    getSum(){
         this.sum=this.data.reduce(function (sum,t) {
            if(t.selected){
                sum+=Number(t.sum);
            }
            return sum
        },0).toFixed(2);
         this.allSumText.textContent="总价：￥"+this.sum;
    }

    getAllSelect(){
        var bool=true;
        for(var i=0;i<this.data.length;i++){
            if(!this.data[i].selected){
                bool=false;
                break;
            }
        }
        this.selectAll.checked=bool;
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