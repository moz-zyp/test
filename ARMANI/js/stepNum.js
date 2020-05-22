class StepNum{
    constructor(parent,num){
        if(num && typeof num==="number"){
            if(num<1) this.num=1;
            else if(num>99) this.num=99;
            else this.num=num;
        }else{
            this.num=1;
        }
        this.createWrap(parent);
    }

    createWrap(parent){
        this.boxWrap=this.$c("div",{
            width:"148px",
            height:"43px",
            border:"1px solid #cccccc"
        },parent);
        var style={
            display:"block",
            float:"left",
            width:"43px",
            height:"43px",
            fontSize:"20px",
            lineHeight:"43px",
            textAlign:"center",
            cursor:"pointer"
        };
        this.sub=this.$c("span",style,this.boxWrap,"-");
        this.bnClick=this.bnClickHandler.bind(this);
        this.sub.addEventListener("click",this.bnClick);
        this.step=this.$c("input",style,this.boxWrap,this.num);
        this.step.type="text";
        this.step.value=this.num;
        this.step.style.width="60px";
        this.step.style.cursor="default";
        this.step.style.border="1px solid #cccccc";
        this.step.style.borderWidth="0 1px";
        this.input=this.inputHandler.bind(this);
        this.blur=this.blurHandler.bind(this);
        this.step.addEventListener("input",this.input);
        this.step.addEventListener("blur",this.blur);
        this.sup=this.$c("span",style,this.boxWrap,"+");
        this.sup.addEventListener("click",this.bnClick);
    }

    bnClickHandler(e){
        e.preventDefault();
        if(e.target.textContent==="-"){
            this.step.value--;
            if(this.step.value<1) this.step.value=1;
        }else if(e.target.textContent==="+"){
            this.step.value++;
            if(this.step.value>99) this.step.value=99;
        }
    }

    inputHandler(e){
        if(this.step.value===""){
            return;
        }
        this.step.value=this.step.value.replace(/[^0-9]/,"");
        if(this.step.value<1) this.step.value=1;
        if(this.step.value>99) this.step.value=99;
    }

    blurHandler(e){
        if(this.step.value===""){
            this.step.value=1;
        }

    }

    $c(elem,style,parent,text){
        var elem=document.createElement(elem);
        if(style){
            Object.assign(elem.style,style);
        }
        if(!parent) parent=document.body;
        if(text) elem.textContent=text;
        parent.appendChild(elem);
        return elem;
    }
}