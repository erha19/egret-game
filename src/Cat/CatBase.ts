
class CatBase extends egret.MovieClip{
    /**开始标签*/
    protected startLabel: string;

    /**等待标签*/
    protected idleLabel: string;

    
	public constructor() {
        super();
        this.addEventListener(egret.Event.COMPLETE,this.completeAction,this);
	}

    public song(){
        this.gotoAndPlay('song',-1);
    }

    public completeAction(e:egret.Event){
        if(e.target instanceof Cat){
            if(this.idleLabel=='stand'){
                this.gotoAndPlay(this.idleLabel,-1);
            }
        }
    }

    public stand(){
        this.gotoAndPlay('stand',-1);
    }



    public shock(){
        this.gotoAndPlay('shock',1);
    }

    public die(){
        this.idleLabel = 'die';
        this.gotoAndPlay('die',1);
    }
    	
    /**画画Action 参数：图形类型*/
    public draw(e:MainEvent):void{
        if(Data.type == shapeType.HORIZONTAL){
            this.startLabel = "draw_horizontal";
            this.idleLabel = "stand";
            this.playDrawMusic(0);
            
        }else if(Data.type == shapeType.VERTICAL){
            this.startLabel = "draw_vertical";
            this.idleLabel = "stand";
            this.playDrawMusic(1);
        }else if(Data.type ==  shapeType.LETTER_V){
            this.startLabel = "draw_v";
            this.idleLabel = "stand";
            this.playDrawMusic(2);
        }else if(Data.type ==  shapeType.REVERSED_LETTER_V){
            this.startLabel = "draw_v_inversed";
            this.idleLabel = "stand";
            this.playDrawMusic(3);
        }else if(Data.type ==  shapeType.FLASH){
            this.startLabel = "draw_flash";
            this.idleLabel = "stand";
            this.playDrawMusic(0);
        }
        this.gotoAndPlay(this.startLabel,1);
    }

    private _catDrawChannel:egret.SoundChannel;
    private playDrawMusic(type:number){
        let sound = RES.getRes('ding_'+type+'_mp3');
        this._catDrawChannel = sound.play(1,1);
        this._catDrawChannel.volume = 1;
    }

    
    
}
