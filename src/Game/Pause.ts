class PauseButton extends egret.Sprite {
    public constructor() {
        super();
        this.init();
	}

    private _sign:boolean = false;
    private _button:egret.Bitmap;
    private init(){
         this.switchButton(this._sign);
         this._sign=true;
         this.touchEnabled = true;//开启触碰
         this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pausetGame, this);//点击按钮开始游戏
    }

    private switchButton(sign:boolean):void{
        this._button = new egret.Bitmap();
        if(sign){
            this._button.texture = RES.getRes("pause_start_png");
        }else{
            this._button.texture = RES.getRes("pause_png");
        }
        this._button.width = 58;
        this._button.height = 50;
        this._button.x = Data.getStageW() -  this._button.width - 20;//居中定位
        this._button.y = Data.getStageH() -  this._button.height - 20;//居中定位
        this.addChild(this._button);
    }
    private pausetGame(){
        this.removeChild(this._button);
        this.switchButton(this._sign);
        this._sign=!this._sign;
        if(this._sign){
            Data.stage.dispatchEvent(new MainEvent(MainEvent.GAMEGOON));
        }
        else{
            Data.stage.dispatchEvent(new MainEvent(MainEvent.GAMEPAUSE));
        }
    }
}