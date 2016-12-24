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
    
    public static QUITGUANKA: string = "quitguanka";//退出关卡
    public static TRYAGAIN: string = "tryagain";//再次尝试
    public static GAMEOVER: string = "gameover";//游戏结束
    public static GAMERESTART: string = "gamerestart";//游戏重新开始
    public static GAMEPAUSE: string = "pause";//游戏暂停
    public static GAMEGOON: string = "gameregoon";//游戏继续




    public static DISTORYACTION: string = "destory_action";//消除动作
    public static DISTORYGHOST: string = "destory_ghost";//消除鬼怪得分
    public static FLASHACTION: string = "flash_action";//消除闪电时间
    public static ATTACKED: string = "be_attacked";//被攻击
    public static DRAWSONG: string = "draw_song";//吟唱
    public static CATSTAND: string = "cat_stand";//猫猫站住

    
    
    private _resName: string = "";
    public constructor(type:string, resName:string="", bubbles:boolean=false, cancelable:boolean=false) {
        super(type,bubbles,cancelable);
        this._resName = resName;
    }
        	
    public get resName():string{
        return this._resName;
    }
}
