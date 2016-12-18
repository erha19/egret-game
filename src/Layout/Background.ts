class Background extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();

        this.init();
    }
    private _dot:egret.Shape;
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
        this._cat.x = (Data.getStageW() + this._cat.width) / 2;
        this._cat.y = (Data.getStageH()  + this._cat.height) / 2;
        this.addChild(this._cat);
        this._cat.song();

        this._dot = new egret.Shape;
        this._dot.graphics.beginFill( 0x00ff00 );
        this._dot.graphics.drawCircle( 0, 0, 5 );
        this._dot.graphics.endFill();
        this._dot.x=(Data.getStageW() ) / 2;;
        this._dot.y=(Data.getStageH()  ) / 2;
        this.addChild(this._dot);
        Data.stage.addEventListener(MainEvent.DISTORYACTION,this._cat.draw,this._cat);
        Data.stage.addEventListener(MainEvent.ATTACKED,this._cat.shock,this._cat);
        // egret.MainContext.instance.stage.addEventListener(MainEvent.DISTORYACTION,this._cat.draw,this);
    }

    public update()
    {
        this._txt.text = Data.score.toString();
    }

}