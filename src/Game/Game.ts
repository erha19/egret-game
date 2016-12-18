class Game
{
    private _layer:egret.DisplayObjectContainer;
    public constructor(layer:egret.DisplayObjectContainer)
    {
        this._layer = layer;
        this.init();
    }

    private _gesture:GestureShape;
    private _gestureShape:egret.Shape;
    private init()
    {
        this.drawBg();

        this._gestureShape = new egret.Shape();
        this._layer.addChild( this._gestureShape );
        this._gesture = new GestureShape();
        this._gesture.addEvent(this._gestureShape);
        Data.stage.addEventListener(MainEvent.GAMEOVER,this.gameover,this);
        Data.stage.addEventListener(MainEvent.PAUSE,this.earthquake,this);
    }

    private _background:Background;

    private drawBg()
    {
        this._background = new Background();
        this._layer.addChild( this._background );

    }

    private _time:egret.Timer;
    public start()
    {
        this._time = new egret.Timer(3000,0);
        
        // this._time.addEventListener(egret.TimerEvent.TIMER,this.create,this);
        this._time.start();
    }
    // private create()
    // {
    //     let cat:CatBase = new CatBase();
    //     egret.log(cat)
    //     this._layer.addChild(cat);
    //     cat.gotoAndPlay( "song");
    // }

    private gameover(evt:egret.Event)
    {
        this._time.stop();
        this._gesture.removeEvent();
    }

    private earthquake(evt:egret.Event)
    {
        this._background.update();
        egret.Tween.get(this._layer).to({x:5,y:5},50).to({x:-5,y:5},50).to({x:5,y:-5},50).to({x:0,y:0},50);
    }

}