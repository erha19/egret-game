class SpellCanvas extends egret.Sprite {
    static defaultDrawLineWidth:number = 5;
    static defaultDrawLineColor:number = 0x000000;
    private drawLineColor:number = 0x000000;
    public constructor(stageWidth: number, stageHeight: number) {
        super();
        this.width = stageWidth;
        this.height = stageHeight;
        this.addEventListener(egret.Event.ADDED, this.onAddedDisplayList, this);
    }

    private onAddedDisplayList(event: egret.Event) {

        this.graphics.beginFill(0xffffff, 0);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRealse, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchRealse, this);
    }

    private touchPointID: number;
    private points: Array<[number, number]>;

    private onTouchBegin(event: egret.TouchEvent) {
        this.touchPointID = event.touchPointID;
        this.points = [[event.stageX, event.stageY]];

        this.graphics.clear();

        this.graphics.beginFill(0xffffff, 0);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        this.graphics.lineStyle(SpellCanvas.defaultDrawLineWidth, SpellCanvas.defaultDrawLineColor);
    }
    

    private onTouchRealse(event: egret.TouchEvent) {
        if (this.touchPointID == null || this.touchPointID != event.touchPointID) {
            return;
        }

        let arr: [number, number][];

        this.touchPointID = null;
        arr = this.points.map(point => point);
        let shapeJudge:shapeRecognition = new shapeRecognition();
        egret.log(shapeJudge.judge(shapeJudge.simplify(this.points)));

    }

    private onTouchMove(event: egret.TouchEvent) {
        if (this.touchPointID == null || this.touchPointID != event.touchPointID) {
            return;
        }
        this.points.push([event.stageX, event.stageY]);
        let shapeJudge:shapeRecognition = new shapeRecognition();
        this.shouldRedraw(shapeJudge.judge(shapeJudge.simplify(this.points)));
        this.connectPoints();
    }


    private connectPoints() {

        let point1 = this.points[this.points.length - 1];
        let point2 = this.points[this.points.length - 2];

        this.graphics.moveTo(point2[0], point2[1]);
        this.graphics.lineTo(point1[0], point1[1]);
    }

    private shouldRedraw(sign:number){
        let color:number = this.drawLineColor;
        switch(sign){
            case shapeType.UNKONW_TYPE:
                color = SpellCanvas.defaultDrawLineColor;
                break;
            case shapeType.HORIZONTAL:
                color = 0xff3737;
                break;
            case shapeType.VERTICAL:
                color = 0x3c63ff;
                break;
            case shapeType.LETTER_V:
                color = 0xfdf800;
                break;
            case shapeType.REVERSED_LETTER_V:
                color = 0x09ff0c;
                break;
            case shapeType.FLASH:
                color = 0xfcc62a;
                break;
            default:break;
        }
        if(color !== this.drawLineColor){
            this.drawLineColor = color;
            this.graphics.lineStyle(SpellCanvas.defaultDrawLineWidth, this.drawLineColor);
            this.redrawPoints();
        }
    }

    private redrawPoints(){
        let len:number = this.points.length;
        for(let i = 0;i < len-1;i++){
            this.graphics.moveTo(this.points[i][0], this.points[i][1]);
            this.graphics.lineTo(this.points[i+1][0], this.points[i+1][1]);
        }
    }
    
}