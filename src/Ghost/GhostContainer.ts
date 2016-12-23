class GhostContainer extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.init();
    }

    private _ghost:egret.MovieClip;
    private _shape:ShapeContainer;
    private _type:number;
    private _score:number;
    private _exp:boolean;

    private _symbolList:[any];
    //x速度
    private _vx:number = 0;
    //y速度
    private _vy:number = 0;
    //方向 1 左边 0右边
    private _dir:number = Math.random()>0.5?0:1;
    //防止其他鬼怪对象先后监听到DISTORY和FLASHACTION两个事件，两者同时只能促发一个
    private _doingDestory:boolean = false;

    private _ghostDieChannel:egret.SoundChannel;
    private _ghostFlashShockChannel:egret.SoundChannel;

    private init() {

            this._ghost = new Ghost();
            this.addChild(this._ghost);
            //获取标志图形
            this.getRandomSymbol();
            this.drawSymbol();

            this.addEventListener(egret.Event.ADDED, this.added, this);
            this._ghost.addEventListener( egret.Event.COMPLETE, this.completeHandler, this );
            Data.stage.addEventListener(MainEvent.DISTORYACTION,this.destoryHandler,this);
            Data.stage.addEventListener(MainEvent.FLASHACTION, this.flashActionHandler, this);
            Data.stage.addEventListener(MainEvent.GAMEOVER,this.gameoverHandler,this);
            Data.stage.addEventListener(MainEvent.GAMEPAUSE, this.pauseHandler, this);
            Data.stage.addEventListener(MainEvent.GAMEGOON, this.goonHandler, this);
    }

    private drawSymbol():void{
            //创建标志图形
            this._shape = new ShapeContainer();
            this._shape.create(this._symbolList,this._dir);
            this._shape.x = 50;
            this._shape.y = 20;
            this.addChild(this._shape)
    }


    private pauseHandler():void{
            this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
    }

    private goonHandler():void{
            this.parent&&this.addEventListener(egret.Event.ENTER_FRAME, this.move, this);
    }

    private gameoverHandler():void{
            this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
    }

    private redrawSymbol():void{
            this._shape.redraw(this._symbolList,this._dir);
    }
    

    

    private added(evt:egret.Event):void {
            if(evt.target instanceof GhostContainer){
                this.x =this._dir?this.width/2:Data.getStageW()-this.width/2;
                this.y =Math.ceil(Data.getStageH()*Math.random());

                this.scaleX*=this._dir?-1:1;
                this._vx = Data.baseSpeed + Math.ceil(Math.random()*Data.baseRandomSpeed);
                this._vx*= this._dir?1:-1;
                //scaleX*=-1之后计算坐标需要进行水平翻转计算
                if(this._dir)
                    this._vy=(Data.getStageH()/2-this.y-this.height/2-42)/(Data.getStageW()/2-this.x+this.width/2+52)*this._vx;
                else
                    this._vy=(Data.getStageH()/2-this.y-this.height/2-42)/(Data.getStageW()/2-this.x-this.width/2-52)*this._vx;
                this.addEventListener(egret.Event.ENTER_FRAME, this.move, this);
            }
    }


    private move(evt:egret.Event) {
        
        if (this.hitPointTest()) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
            
            this._ghost.gotoAndPlay('attack',1);
            this.playShockMusic();
            this._symbolList.length = 0;

            
            Data.life--;
            Data.stage.dispatchEvent(new MainEvent(MainEvent.ATTACKED));
            if(Data.life<=0)
                Data.stage.dispatchEvent(new MainEvent(MainEvent.GAMEOVER));
        }else{
            this.y += this._vy;
            this.x += this._vx;
        }
        
    }

    private playDieMusic(){
        let sound = RES.getRes('ghost_die_mp3');
        this._ghostDieChannel = sound.play(3.2,1);
        this._ghostDieChannel.volume = 0.8;
    }

    private playFlashShockMusic(){
        let sound = RES.getRes('ghost_flash_shock_mp3');
        this._ghostFlashShockChannel = sound.play(0.8,1);
        this._ghostFlashShockChannel.volume = 0.2;
    }

    private _catShockChannel:egret.SoundChannel;
    private playShockMusic(){
        let sound:egret.Sound = RES.getRes('cat_beattack_mp3');
        this._catShockChannel = sound.play(.5,1);
        this._catShockChannel.volume = 0.5;
    }
    //监听消除事件
    private destoryHandler(e:MainEvent):void{
        if(Data.flashDetoryStatus){
            return ;
        }
        if(Data.type == shapeType.FLASH){
            if(this._symbolList[0]==Data.type){
                Data.flashDetoryStatus = true;
                Data.stage.dispatchEvent(new MainEvent(MainEvent.FLASHACTION));
            }
        }
        else{
             if(this._symbolList[0]==Data.type){
                this._symbolList.shift();
                this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
                if(this._symbolList.length>=1){
                    this._ghost.gotoAndPlay('shock',1);
                    this.redrawSymbol()
                }else{
                    this.removeChild(this._shape);
                    this._ghost.gotoAndPlay('die',1);
                    this.playDieMusic();
                    Data.score+=this._score;
                    Data.stage.dispatchEvent(new MainEvent(MainEvent.DISTORYGHOST));
                }
            }
        }
       
    }


    private flashActionHandler(e:MainEvent):void{
        if(Data.flashDetoryStatus){
            this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
            this._symbolList.shift();
            
            this.playFlashShockMusic();
            if(this._symbolList.length>=1){
                this._ghost.gotoAndPlay('shock',1);
                this.redrawSymbol()
            }else{
                if(this._shape.parent){
                    this.removeChild(this._shape);
                }
                this._ghost.gotoAndPlay('die',1);
                Data.score+=this._score;
                Data.stage.dispatchEvent(new MainEvent(MainEvent.DISTORYGHOST));
            }
        }
    }

    
    private completeHandler(e:egret.Event):void{
        if(e.target instanceof Ghost){
            if(this._symbolList.length<1&&this.parent){
                this.parent.removeChild(this);
            }
            else{
                this._ghost.gotoAndStop('move');
                this.addEventListener(egret.Event.ENTER_FRAME, this.move, this);
            }
        }
    }

    private hitPointTest():boolean{
        if(this._dir){
            let distanceY = Data.getStageH()/2-this.y-this.height/2-42;
            let distanceX = Data.getStageW()/2-this.x+this.width/2+52;
            if(Math.pow((distanceX*distanceX+distanceY*distanceY),0.5)<50){
                return true;
            }
        }
        else{
            let distanceY = Data.getStageH()/2-this.y-this.height/2-42;
            let distanceX = Data.getStageW()/2-this.x-this.width/2-52;
            if(Math.pow((distanceX*distanceX+distanceY*distanceY),0.5)<50){
                return true;
            }
        }
        return false;
    }

    private getRandomSymbol():void{
        let type:[number] = [shapeType.HORIZONTAL,shapeType.VERTICAL,shapeType.LETTER_V,shapeType.REVERSED_LETTER_V,shapeType.FLASH];
        let num = Data.baseSymbolNum+Math.ceil(Data.baseSymbolRandomNum*Math.random());
        let symbolList:[number];
        this._score = num*50;
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

}