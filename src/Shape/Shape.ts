class Shape extends egret.Shape{
    constructor(type:number){
        super();
        this.init(type);
    }

    private init(type:number){
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
                this.createFlash();
                break;
            default:break;
        }
    }

    private createHorizontal(){
        this.graphics.lineStyle(2, ShapeContainer.HORIZONTAL_COLOR);
        this.graphics.moveTo(0, 4);
        this.graphics.lineTo(10,4);
    }

    private createVertical(){
        this.graphics.lineStyle(2, ShapeContainer.VERTICAL_COLOR);
        this.graphics.moveTo(4,0);
        this.graphics.lineTo(4,10);
    }

    private createLitterV(){
        this.graphics.lineStyle(2, ShapeContainer.LETTER_V_COLOR);
        this.graphics.moveTo(0,0);
        this.graphics.lineTo(5,10);
        this.graphics.lineTo(10,0);
    }

    private createReversedLitterV(){
        this.graphics.lineStyle(2, ShapeContainer.REVERSED_LETTER_V_COLOR);
        this.graphics.moveTo(0,10);
        this.graphics.lineTo(5,0);
        this.graphics.lineTo(10,10);
    }

    private createFlash(){
        this.graphics.lineStyle(2, ShapeContainer.FLASH_COLOR);
        this.graphics.moveTo(5,0);
        this.graphics.lineTo(2,5);
        this.graphics.lineTo(8,5);
        this.graphics.lineTo(5,10);
    }
}