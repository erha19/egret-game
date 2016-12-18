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
    public static score:number = 0;
}