enchant();
window.onload = function(){

	//ゲームオブジェクトの生成
	var game = new Game(320,320);
	game.fps = 16;
	
	//画像の読み込み
	game.preload('http://enchantjs.com/assets/images/chara2.gif','http://enchantjs.com/assets/images/map0.gif');

	//ロード開始時に呼ばれる
	game.onload = function(){
	
		//背景の生成
		var bg = new Sprite(320,320);
		var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
		var image = new Surface(320,320);
		for(var j = 0; j < 320; j++){
			for(var i = 0; i < 320; i++){
				image.draw(maptip,0,1,16,16,j,i,16,16);
			}
		}
		bg.image = image;
		game.rootScene.addChild(bg);
		
	};
	
	//ゲーム開始
	game.start();
};