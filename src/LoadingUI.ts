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
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    }

    public setProgress(current:number, total:number) {
        let content:string = `Loading...${current}/${total}`;
        this.textField.text = content;
    }
}