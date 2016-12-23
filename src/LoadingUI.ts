class LoadingUI extends egret.Sprite {
    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;
    private createView() {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 690;
        this.textField.height = 360;
        this.textField.textAlign = "center";
    }

    public setProgress(current:number, total:number) {
        let content:string = `加载资源...`+(current*100/total).toFixed(2)+`%`;
        this.textField.text = content;
    }
}