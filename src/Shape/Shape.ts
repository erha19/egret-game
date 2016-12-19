class Shape extends egret.Shape{
    constructor(type:number,dir?:number){
        super();
        this.init(type,dir);
    }

    public static UNKONW_TYPE_COLOR = 0x000000;
    public static HORIZONTAL_COLOR = 0xff3737;
    public static VERTICAL_COLOR = 0x3c63ff;
    public static LETTER_V_COLOR = 0xfdf800;
    public static REVERSED_LETTER_V_COLOR = 0x09ff0c;
    public static FLASH_COLOR = 0xfcc62a;

    private init(type:number,dir?:number){
        switch(type){
            case shapeType.UNKONW_TYPE:
                break;
            case shapeType.HORIZONTAL:
                this.createHorizontal();
                break;
            case shapeType.VERTICAL:
                this.createVertical();
                break;
            case shapeType.LETTER_V:
                this.createLitterV();
                break;
            case shapeType.REVERSED_LETTER_V:
                this. createReversedLitterV();
                break;
            case shapeType.FLASH:
                this.createFlash(dir);
                break;
            default:break;
        }
    }

    private createHorizontal(){
        this.graphics.lineStyle(2, Shape.HORIZONTAL_COLOR);
        this.graphics.moveTo(0, 4);
        this.graphics.lineTo(10,4);
    }

    private createVertical(){
        this.graphics.lineStyle(2, Shape.VERTICAL_COLOR);
        this.graphics.moveTo(4,0);
        this.graphics.lineTo(4,10);
    }

    private createLitterV(){
        this.graphics.lineStyle(2, Shape.LETTER_V_COLOR);
        this.graphics.moveTo(0,0);
        this.graphics.lineTo(5,10);
        this.graphics.lineTo(10,0);
    }

    private createReversedLitterV(){
        this.graphics.lineStyle(2, Shape.REVERSED_LETTER_V_COLOR);
        this.graphics.moveTo(0,10);
        this.graphics.lineTo(5,0);
        this.graphics.lineTo(10,10);
    }

    private createFlash(dir?:number){
        this.graphics.lineStyle(2, Shape.FLASH_COLOR);
        this.graphics.moveTo(5,0);
        if(!dir){
            this.graphics.lineTo(2,5);
            this.graphics.lineTo(8,5);
            this.graphics.lineTo(5,10);
        }else{
            this.graphics.lineTo(8,5);
            this.graphics.lineTo(2,5);
            this.graphics.lineTo(5,10);
        }
        
    }
}