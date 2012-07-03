// リミット
var LIMIT_TIME = 30;

enchant();


// ここで自作クラスBearをつくる
Enemy = Class.create(Sprite, // Spriteクラスを継承
                    { initialize:function(x,y){ //初期化する
                        Sprite.call(this,32,32); //Spriteオブジェクトを初期化
                        this.image = game.assets['chara2.gif'];
                        this.x = x;
                        this.y = y;
                        this.frame=0;
                        game.rootScene.addChild(this);
                      },
                      //enterframeイベントのリスナーを定義する
                      onenterframe:function(){
                        this.x++; //右へ移動
                      }
                    });

window.onload = function()
{
    // ゲームクラスを生成
    var game = new Game(320, 320);
    game.fps = 16;
   
	//画像の読み込み
	game.preload('chara2.gif');

	//ロード開始時に呼ばれる
	game.onload = function(){
        // タイム
        var time_label = new Label();
        time_label.x = 2;
        time_label.y = 2;
        time_label.addEventListener(enchant.Event.ENTER_FRAME, function(){
            var count = Math.floor(game.frame/game.fps);
            time = LIMIT_TIME - count;
            this.text = "タイムリミット : " + time;
            if (time <= 0) { game.end(time, 'GameOver'); }
        });
        game.rootScene.addChild(time_label);
       
	
		//背景色の生成
		game.rootScene.backgroundColor = '#F4A460';

	
		for (var i = 0; i < 5; i++) {
            enemyi = new Enemy(Math.random() * 320 - 32, Math.random() * 320 - 32); 
        }

		
	};
	
	//ゲーム開始
	game.start();
};