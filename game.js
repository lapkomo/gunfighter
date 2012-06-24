enchant();

// リミット
var LIMIT_TIME = 30;

window.onload = function()
{
    // ゲームクラスを生成
    var game = new Game(320, 320);
    game.fps = 16;
   
	//画像の読み込み
	game.preload('http://enchantjs.com/assets/images/chara2.gif');

	//ロード開始時に呼ばれる
	game.onload = function(){
        // タイム
        var time_label = new Label();
        time_label.x = time_label.y = 2;
        time_label.addEventListener(enchant.Event.ENTER_FRAME, function(){
            var count = Math.floor(game.frame/game.fps);
            time = LIMIT_TIME - count;
            this.text = "タイムリミット : " + time;
            if (time <= 0) { game.end(time, 'GameOver'); }
        });
        game.rootScene.addChild(time_label);
       
	
		//背景色の生成
		game.rootScene.backgroundColor = '#F4A460';

	
		//敵の生成
		for(var i=0;i<8;i++){
			var enemy = new Sprite(32,32);
			enemy.image = game.assets['http://enchantjs.com/assets/images/chara2.gif'];
			enemy.moveTo =(150,150);
			game.rootScene.addChild(enemy);
		};
		
		//敵をタッチした時の処理
		enemy.addEventListener("touchstart",function(){
			game.rootScene.removeChild(enemy);
		});
		
		//敵をタッチし終わった時の処理
		enemy.addEventListener("touchend",function(){
			enemy.moveTo = Math.floor(Math.random()*(320-32), Math.random()*(320-32));
			game.rootScene.addChild(enemy);
		});
	};
	
	//ゲーム開始
	game.start();
};