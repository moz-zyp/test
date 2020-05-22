module.exports=(function () {
    return {
        shoppingList:[],
        getShoppingList:function (res) {
            res.write(encodeURIComponent(JSON.stringify(this.shoppingList)));
            res.end();
        },
        add:function (res,value) {
            var bool=true;
            console.log(value);
            for(var i=0;i<this.shoppingList.length;i++){
                if(this.shoppingList[i].id===Number(value.id)){
                    bool=false;
                    this.shoppingList[i].num+=Number(value.num);
                    break;
                }
            }
            if(bool){
                var obj={
                    id:value.id,
                    selected:value.selected,
                    imgSrc:value.imgSrc,
                    title:value.title,
                    standards:value.standards,
                    price:Number(value.price),
                    num:Number(value.num),
                    sum:Number(value.sum)
                };
                this.shoppingList.push(obj);
            }

            res.write(encodeURIComponent(JSON.stringify("")));
            res.end();
        },
        changeNum:function (res,value) {
            this.shoppingList=this.shoppingList.filter(function (t) {
                if(t.id===Number(value.id)){
                    t.num=value.num;
                    t.sum=Number(value.num)*Number(t.price);
                }
                return t;
            });
            res.write(encodeURIComponent(JSON.stringify("")));
            res.end();
        },
        remove:function (res,value) {
            this.shoppingList=this.shoppingList.filter(function (t) {
                return t.id!==Number(value.id);
            });
            res.write(encodeURIComponent(JSON.stringify("")));
            res.end();
        },
        select:function (res,value) {
            console.log(typeof value.id);
            this.shoppingList=this.shoppingList.filter(function (t) {
                if(t.id===Number(value.id)){
                    console.log("aaaa");
                    t.selected=value.selected;
                }
                return t;
            });
            res.write(encodeURIComponent(JSON.stringify("")));
            res.end();
        },
        selectAll:function (res,value) {
            for(var i=0;i<this.shoppingList.length;i++){
                this.shoppingList[i].selected=value.selected;
            }
            res.write(encodeURIComponent(JSON.stringify("")));
            res.end();
        }
    }
})();