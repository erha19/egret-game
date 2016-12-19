class Ghost extends CatBase {
    private _ghost:egret.MovieClip;
    public constructor() {
        super();
        this.init();
	}

    private init(){
        let data = RES.getRes("destory_ghosts_json");
        let tex = RES.getRes("destory_ghosts_png");
        let mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, tex);
        this.movieClipData = mcf.generateMovieClipData("ghost");
        this.gotoAndStop('move');
    }
}