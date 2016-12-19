class GhostContainer extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.init();
    }

    private _ghost:egret.MovieClip;
    private _shape:ShapeContainer;
    private _type:number;
    private _exp:boolean;

    private _symbolList:[any];
    //x速度
    private _vx:number = 0;
    //y速度
    private _vy:number = 0;
    //方向 1 左边 0右边
    private _dir:number = 0;

    private init() {

            this._ghost = new Ghost();
            this.addChild(this._ghost);
            //获取标志图形
            this.getRandomSymbol();
            this.drawSymbol();

            this.addEventListener(egret.Event.ADDED, this.added, this);
            this._ghost.addEventListener( egret.Event.COMPLETE, this.completeHandler, this );
            Data.stage.addEventListener(MainEvent.DISTORYACTION,this.destoryHandler,this);
//         Data.stage.addEventListener("gameover", this.gameover, this);
    }

    private drawSymbol():void{
            //创建标志图形
            this._shape = new ShapeContainer();
            this._shape.create(this._symbolList);
            this._shape.x = 50;
            this._shape.y = 20;
            this.addChild(this._shape)
    }

    private added(evt:egret.Event):void {

            this._dir=Math.random()>0.5?0:1;
            this.x =this._dir?0:Data.getStageW();
            this.y =Math.ceil(Data.getStageH()*Math.random());

            this.scaleX*=this._dir?-1:1;
            this._vx = Data.baseSpeed + Math.ceil(Math.random()*2);
            this._vx*= this._dir?1:-1;
            //scaleX*=-1之后计算坐标需要进行水平翻转计算
            if(this._dir)
                this._vy=(Data.getStageH()/2-this.y-this.height/2-42)/(Data.getStageW()/2-this.x+this.width/2+52)*this._vx;
            else
                this._vy=(Data.getStageH()/2-this.y-this.height/2-42)/(Data.getStageW()/2-this.x-this.width/2-52)*this._vx;
            this.addEventListener(egret.Event.ENTER_FRAME, this.move, this);
    }


    private move(evt:egret.Event) {
        
        if (this.hitPointTest()) {
            //游戏结束
            //console.log("game over");
            this._ghost.gotoAndPlay('attack',1);
            this._symbolList.length = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);

            Data.stage.dispatchEvent(new MainEvent(MainEvent.ATTACKED));
            // if (this._exp) {
            //     this.parent.removeChild(this);
            //     Data.stage.dispatchEvent(new egret.Event("earthquake"));
            // }
            // else {
            //     Data.stage.dispatchEvent(new egret.Event("gameover"));
            // }
        }else{
            this.y += this._vy;
            this.x += this._vx;
        }
        
    }
    //监听消除事件
    private destoryHandler(e:MainEvent):void{
        if(this._symbolList[0]==Data.type){
            this._symbolList.shift();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
            if(this._symbolList.length>=1){
                this._ghost.gotoAndPlay('shock',1);
                this.removeChild(this._shape);
                this.drawSymbol()
            }else{
                this.removeChild(this._shape);
                this._ghost.gotoAndPlay('die',1);
            }
            
        }
    }

    private completeHandler(e:egret.Event):void{
        if(e.target instanceof Ghost){
            if(!this._symbolList.length){
                this.parent.removeChild(this);
                this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
            }
            else{
                this.addEventListener(egret.Event.ENTER_FRAME, this.move, this);
            }
        }
    }

    private hitPointTest():boolean{
        if(this._dir){
            let distanceY = Data.getStageH()/2-this.y-this.height/2-42;
            let distanceX = Data.getStageW()/2-this.x+this.width/2+52;
            if(Math.pow((distanceX*distanceX+distanceY*distanceY),0.5)<40){
                return true;
            }
        }
        else{
            let distanceY = Data.getStageH()/2-this.y-this.height/2-42;
            let distanceX = Data.getStageW()/2-this.x-this.width/2-52;
            if(Math.pow((distanceX*distanceX+distanceY*distanceY),0.5)<40){
                return true;
            }
        }
        return false;
    }

    private getRandomSymbol():void{
        let type:[number] = [shapeType.HORIZONTAL,shapeType.VERTICAL,shapeType.LETTER_V,shapeType.REVERSED_LETTER_V,shapeType.FLASH];
        let num = Math.ceil(Data.baseSymbolNum*Math.random());
        let symbolList:[number];
        for(let i = 0;i<num;i++){
            if(!symbolList){
                symbolList=[type[Math.floor(Math.random()*5)]];
            }
            else{
                symbolList.push(type[Math.floor(Math.random()*5)]);
            }
        }
        this._symbolList = symbolList;
    }

    private gameover(evt:egret.Event)
    {
        this._ghost.gotoAndStop('shock');
        this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
    }

}