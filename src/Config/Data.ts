class Data
{
    public static getStageW():number
    {
        return egret.MainContext.instance.stage.stageWidth;
    }

    public static getStageH():number
    {
        return egret.MainContext.instance.stage.stageHeight;
    }

    public static get stage()
    {
        return egret.MainContext.instance.stage;
    }
    public static type:number = -1;
    public static life:number = 5;
    public static score:number = 0;

    //基础鬼怪速度
    public static baseSpeed:number = 1;
    //基础鬼怪速度增值
    public static baseRandomSpeed:number = 2;
    //鬼怪产生时间
    public static baseTimer:number = 3000;
    //鬼怪标志个数
    public static baseSymbolNum:number = 1;
    //鬼怪标志个数增值
    public static baseSymbolRandomNum:number = 0;
    //怪物波次
    public static ghostTimes:number = 0;
}