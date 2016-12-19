class RestartButton extends egret.Bitmap {
    public constructor() {
        super();
        this.init();
	}

    private init(){
        this.texture = RES.getRes("restart_button_png");//开始按钮
        this.x = (Data.getStageW() - this.width) / 2;//居中定位
        this.y = (Data.getStageH() - this.height) / 2;//居中定位
        this.touchEnabled = true;//开启触碰
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartGame,this);//点击按钮开始游戏
    }

    private restartGame(){
        Data.stage.dispatchEvent(new MainEvent(MainEvent.GAMERESTART));
        this.parent.removeChild(this);
    }
}