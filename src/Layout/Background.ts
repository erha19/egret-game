class Background extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();

        this.init();
    }
    private _cat:Cat;
    private _txt:egret.BitmapText;
    private init()
    {
        let bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("main-stage_png");
        bg.width = Data.getStageW();
        bg.height = Data.getStageH();
        this.addChild(bg);
        
        this._cat = new Cat();
        egret.log(Data.getStageW(),this._cat.width)
        this._cat.x = (Data.getStageW() + this._cat.width) / 2;
        this._cat.y = (Data.getStageH()  + this._cat.height) / 2;
        this.addChild(this._cat);
        this._cat.song();
        // this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        Data.stage.addEventListener(MainEvent.DISTORYACTION,this._cat.draw,this._cat);

        // egret.MainContext.instance.stage.addEventListener(MainEvent.DISTORYACTION,this._cat.draw,this);
    }

    public update()
    {
        this._txt.text = Data.score.toString();
    }

}