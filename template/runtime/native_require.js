
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"bin-debug/Cat/CatBase.js",
	"bin-debug/Cat/Cat.js",
	"bin-debug/Config/Data.js",
	"bin-debug/Events/LoadEvent.js",
	"bin-debug/Events/MainEvent.js",
	"bin-debug/Game/Game.js",
	"bin-debug/Game/Pause.js",
	"bin-debug/Game/Restart.js",
	"bin-debug/Ghost/Ghost.js",
	"bin-debug/Ghost/GhostBase.js",
	"bin-debug/Ghost/GhostContainer.js",
	"bin-debug/Layout/Background.js",
	"bin-debug/Loader/Loader.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Shape/Shape.js",
	"bin-debug/Shape/ShapeContainer.js",
	"bin-debug/SpellCanvas/SpellCanvas.js",
	"bin-debug/Utils/Gesture.js",
	"bin-debug/Utils/ShapeRecognition.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "exactFit",
		contentWidth: 690,
		contentHeight: 360,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 1,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};