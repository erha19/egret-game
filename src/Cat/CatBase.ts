
class CatBase extends egret.MovieClip{
    /**开始标签*/
    protected startLabel: string;
    /**结束标签*/
    protected endLabel: string;
    /**等待标签*/
    protected idleLabel: string;
    
	public constructor() {
        super();
	}
	
    public onEnterFrame(advancedTime:number){
        if(this.currentLabel == this.endLabel){
            this.gotoAndStop(this.idleLabel);
        }
        else{
            this.gotoAndPlay(this.idleLabel,-1);
        }
    }
    	
    /**画画 参数：图形类型*/
    public draw(direct:number){
        if(direct == shapeType.HORIZONTAL){
            this.startLabel = "draw_horizontal";
            this.endLabel= "song";
            this.idleLabel = "song";
        }else if(direct == shapeType.VERTICAL){
            this.startLabel = "draw_vertical";
            this.endLabel= "song";
            this.idleLabel = "song";
        }else if(direct ==  shapeType.LETTER_V){
            this.startLabel = "draw_v";
            this.endLabel= "song";
            this.idleLabel = "song";
        }else if(direct ==  shapeType.REVERSED_LETTER_V){
            this.startLabel = "draw_v_inversed";
            this.endLabel= "song";
            this.idleLabel = "song";
        }else if(direct ==  shapeType.FLASH){
            this.startLabel = "draw_flash";
            this.endLabel= "song";
            this.idleLabel = "song";
        }
        this.gotoAndPlay(this.startLabel);
    }
    
}
