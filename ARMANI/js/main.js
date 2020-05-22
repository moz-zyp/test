class Main{
    constructor(parent){
        this.parent=parent;
        this.create(parent);
    }
    create(parent){
        shoppingAjax({type:0x20});
    }
    createShoppingTable(rs){
        var shoppingTable=new ShoppingTable(this.parent,rs);
    }
}