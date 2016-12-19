class ShapeContainer extends egret.Sprite{
    constructor(){
        super();
        this.init();
    }
    


    private _line:egret.Shape;

    private init(){

    }

    public create(list:[number],dir?:number){
        let createShapeItem:Shape;
        for(let item = 0,len = list.length;item<len;item++){
            createShapeItem=new Shape(<number>list[item],dir);
            createShapeItem.x=item*15;
            this.addChild(createShapeItem);
        }
    }

    public redraw(list:[number],dir?:number){
        this.removeChildren();
        let createShapeItem:Shape;
        for(let item = 0,len = list.length;item<5&&item<len;item++){
            createShapeItem=new Shape(<number>list[item],dir);
            createShapeItem.x=item*15;
            this.addChild(createShapeItem);
        }
    }

}