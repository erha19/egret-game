
class CatBase extends egret.MovieClip{
    /**开始标签*/
    protected startLabel: string;
    /**结束标签*/
    protected endLabel: string;
    /**等待标签*/
    protected idleLabel: string;
    
	public constructor() {
        super();
        this.addEventListener(egret.Event.COMPLETE,this.completeAction,this);
	}

    public song(){
        this.gotoAndPlay(this.idleLabel,-1);
    }

    public completeAction(e:egret.Event){
        if(e.target instanceof Cat){
            this.gotoAndPlay(this.idleLabel,-1);
        }
    }

    public shock(e:MainEvent){
        this.gotoAndPlay('shock',1);
    }
    	
    /**画画Action 参数：图形类型*/
    public draw(e:MainEvent):void{
        if(Data.type == shapeType.HORIZONTAL){
            this.startLabel = "draw_horizontal";
            this.endLabel= "draw_horizontal";
            this.idleLabel = "song";
        }else if(Data.type == shapeType.VERTICAL){
            this.startLabel = "draw_vertical";
            this.endLabel= "draw_vertical";
            this.idleLabel = "song";
        }else if(Data.type ==  shapeType.LETTER_V){
            this.startLabel = "draw_v";
            this.endLabel= "draw_v";
            this.idleLabel = "song";
        }else if(Data.type ==  shapeType.REVERSED_LETTER_V){
            this.startLabel = "draw_v_inversed";
            this.endLabel= "draw_v_inversed";
            this.idleLabel = "song";
        }else if(Data.type ==  shapeType.FLASH){
            this.startLabel = "draw_flash";
            this.endLabel= "draw_flash";
            this.idleLabel = "song";
        }
        this.gotoAndPlay(this.startLabel,1);
    }
    
}
