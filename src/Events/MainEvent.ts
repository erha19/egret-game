/**
 *
 * 主类事件
 * @author 
 *
 */
class MainEvent extends egret.Event {
    public static OPENLOADBAR: string = "openloadbar";
    public static REMOVE: string = "remove";
    public static LOADCOMP: string = "loadcomp";
    
    public static PAUSE: string = "pause";
    public static QUITGUANKA: string = "quitguanka";//退出关卡
    public static TRYAGAIN: string = "tryagain";//再次尝试
    public static GAMEOVER: string = "gameover";//游戏结束


    public static DISTORYACTION: string = "destory_action";//消除动作
    
    private _resName: string = "";
    public constructor(type:string, resName:string="", bubbles:boolean=false, cancelable:boolean=false) {
        super(type,bubbles,cancelable);
        this._resName = resName;
    }
        	
    public get resName():string{
        return this._resName;
    }
}
