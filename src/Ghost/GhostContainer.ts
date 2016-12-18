class GhostContainer extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.init();
    }

    private _ghost:egret.MovieClip;
    private _line:egret.Shape;
    private _type:number;
    private _exp:boolean;
    //x速度
    private _vx:number = 0;
    //y速度
    private _vy:number = 0;
    //方向 1 左边 0右边
    private _dir:number = 0;

    private init() {

            this._ghost = new Ghost();
            this.addChild(this._ghost);



//         this._balloon = new egret.Bitmap();
//         this._balloon.y = -100;
// //
//         this.addChild(this._balloon);
// //
//         //var dd = RES.getRes("balloonmc_json");
//         //var tt = RES.getRes("balloonmc_png");
//         //var mcf1:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(dd, tt);
//         ////var img:egret.Bitmap = new egret.Bitmap();
//         //mcf1.generateMovieClipData("abc")
//         //img.texture = mcf1.generateMovieClipData("abc").getTextureByFrame(1);
//         //this.addChild(img);
//         //console.log(dd);
//         //console.log(tt);

//         //this._balloonMc = new egret.MovieClip(mcf1.generateMovieClipData("abc"));
//         //this._balloonMc.x = 100;
//         ////this.addChild(this._balloonMc);
//         //this._balloonMc.y = this._balloon.y;
//         //this.addChild(this._balloonMc);
//         //this._balloonMc.visible = false;
//         //console.log(this._balloonMc.frameRate);
//         //this.addChild( this._balloonMc );
//         //this._balloonMc.play(-1);

            this._line = new egret.Shape();
            this._line.graphics.lineStyle(2, 0);
            this._line.graphics.moveTo(this._ghost.x+this._ghost.width/2+52, this._ghost.y+this._ghost.height/2+45);
            this._line.graphics.lineTo(this._ghost.x+this._ghost.width/2+52, this._ghost.y+this._ghost.height/2+40);
            this.addChildAt(this._line, 5);

           this.addEventListener(egret.Event.ADDED, this.added, this);
           this._ghost.addEventListener( egret.Event.COMPLETE, this.attackHandler, this );
           
//         Data.stage.addEventListener("gameover", this.gameover, this);
//         Data.stage.addEventListener("action", this.action, this);
    }


    private added(evt:egret.Event):void {

        this._dir=Math.random()>0.5?0:1;
        this.x =this._dir?0:Data.getStageW();
        this.y =Math.ceil(Data.getStageH()*Math.random());

        this.scaleX*=this._dir?-1:1;
        this._vx = 2 + Math.ceil(Math.random()*4);
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

    private attackHandler(e:egret.Event):void{
        if(e.target instanceof Ghost){
            this.parent.removeChild(this);
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

    private selectType():number {
        return Math.floor(Math.random() * 6);
    }

    private getBalloonTexture():egret.Texture {
        switch (this._type) {
            case 0:
                return RES.getRes("ge_balloon_V_png");
                break;
            case 1:
                return RES.getRes("ge_balloon_vert-line_png");
                break;
            case 2:
                return RES.getRes("ge_balloon_horiz-line_png");
                break;
            case 3:
                return RES.getRes("ge_balloon_delta_png");
                break;
            case 4:
                return RES.getRes("ge_balloon_gamma_png");
                break;
            case 5:
                return RES.getRes("ge_balloon_Z_png");
                break;
        }
    }

    private gameover(evt:egret.Event)
    {
        this._ghost.stop();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.move, this);
    }

    // private action(evt:egret.Event)
    // {
    //     if(this._type == Data.type && this._exp==false)
    //     {
    //         this._exp = true;
    //         this._speed = 7;
    //         this.playBalloonMc();
    //         Data.score++;
    //     }
    // }

    private playBalloonMc()
    {
        // this.removeChild(this._balloon);
        this.removeChild(this._line);
        //this.addChild(this._balloonMc);
        //this._balloonMc.visible = true;
        //this._balloonMc.play();
    }
}