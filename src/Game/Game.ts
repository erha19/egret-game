class Game
{
    private _layer:egret.DisplayObjectContainer;
    public constructor(layer:egret.DisplayObjectContainer)
    {
        this._layer = layer;
        this.init();
    }
    private _restartButton:RestartButton;
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
        Data.stage.addEventListener(MainEvent.ATTACKED,this.beattacked,this);
        Data.stage.addEventListener(MainEvent.GAMERESTART,this.restart,this);
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
        this._time = new egret.Timer(Data.baseTimer,0);
        this._time.addEventListener(egret.TimerEvent.TIMER,this.create,this);
        this._time.start();
    }
    private create()
    {
        Data.ghostTimes++;
        if(Data.ghostTimes%10==0){
            Math.random()>0.5?Data.baseSymbolRandomNum++:Data.baseRandomSpeed++;
        }
        let ghost:GhostContainer = new GhostContainer();
        this._layer.addChild(ghost);
    }

    private gameover(evt:egret.Event)
    {
        this._time.stop();
        this._gesture.removeEvent();
        this._restartButton = new RestartButton();
        this._layer.addChild(this._restartButton);
    }

    public restart(){
        Data.life=5;
        Data.score=0;
        Data.baseSpeed=1;
        Data.baseRandomSpeed=2;
        Data.baseTimer=3000;
        Data.baseSymbolNum=1;
        Data.baseSymbolRandomNum=0;
        Data.ghostTimes=0;
        this.init();
        this.start();
    }

    private beattacked(evt:egret.Event)
    {
        this._background.updateLife();
        egret.Tween.get(this._layer).to({x:5,y:5},50).to({x:-5,y:5},50).to({x:5,y:-5},50).to({x:0,y:0},50);
    }

}