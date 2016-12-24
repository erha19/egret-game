class Background extends egret.DisplayObjectContainer{
    public constructor()
    {
        super();

        this.init();
    }
    private _life:egret.Sprite;
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
        this._cat.stand();


        this._txt = new egret.BitmapText();
        this._txt.font = RES.getRes("num_fnt");
        this._txt.width = Data.getStageW()-30;
        this._txt.y = 0;
        this._txt.textAlign = 'right';
        this._txt.text ='score:'+Data.score.toString();
        this.addChild(this._txt);
        
        this._life = new egret.Sprite();
        this.updateLife();
        this._life.x = 20;
        this._life.y = 10;

        this.addChild(this._life);

        
        
        Data.stage.addEventListener(MainEvent.DISTORYACTION,this._cat.draw,this._cat);
        Data.stage.addEventListener(MainEvent.GAMEOVER,this._cat.die,this._cat);
        Data.stage.addEventListener(MainEvent.GAMEPAUSE,this._cat.stand,this._cat);
        Data.stage.addEventListener(MainEvent.DRAWSONG,this._cat.song,this._cat);
        Data.stage.addEventListener(MainEvent.CATSTAND,this._cat.stand,this._cat);
        Data.stage.addEventListener(MainEvent.ATTACKED,this._cat.shock,this._cat);
        Data.stage.addEventListener(MainEvent.DISTORYGHOST,this.updateScore,this);
        Data.stage.addEventListener(MainEvent.ATTACKED,this.updateLife,this);

    }

    public updateScore()
    {
        this._txt.text = 'score:'+Data.score.toString();
    }

    

    public updateLife(){
        let _lifeIcon:egret.Bitmap;
        this._life.removeChildren();
        for(let i = 0; i<Data.life;i++){
            _lifeIcon = new egret.Bitmap();
            _lifeIcon.texture = RES.getRes("life_png");
            _lifeIcon.x=i*40;
            this._life.addChild(_lifeIcon);
        }
    }

}