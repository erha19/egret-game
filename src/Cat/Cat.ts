class Cat extends CatBase {
    public constructor() {
        super();
        this.init();
	}
    
    private init(){
        let data = RES.getRes("destory_ghosts_json");
        let tex = RES.getRes("destory_ghosts_png");
        let mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, tex);
        this.movieClipData = mcf.generateMovieClipData("cat");
        this.anchorOffsetX = this.width / 2;
        this.startLabel = "";
        this.idleLabel = "stand";
    }
}