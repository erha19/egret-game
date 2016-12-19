class ShapeContainer extends egret.Sprite{
    constructor(){
        super();
        this.init();
    }
    public static UNKONW_TYPE_COLOR = 0x000000;
    public static HORIZONTAL_COLOR = 0xff3737;
    public static VERTICAL_COLOR = 0x3c63ff;
    public static LETTER_V_COLOR = 0xfdf800;
    public static REVERSED_LETTER_V_COLOR = 0x09ff0c;
    public static FLASH_COLOR = 0xfcc62a;


    private _line:egret.Shape;

    private init(){

    }

    public create(list:[number]){
        let createShapeItem:Shape;
        for(let item = 0,len = list.length;item<len;item++){
            createShapeItem=new Shape(<number>list[item]);
            createShapeItem.x=item*15;
            this.addChild(createShapeItem);
        }
    }

}