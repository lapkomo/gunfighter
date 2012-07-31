enchant();
// リミット
var LIMIT_TIME = 30;
var game;
var addsocre = 10;

		// ここで自作クラスEnemyをつくる
		var Enemy = Class.create(Sprite, // Spriteクラスを継承
                    { initialize:function(x,y){ //初期化する
                        Sprite.call(this,32,32); //Spriteオブジェクトを初期化
                        this.image = game.assets['gunfighter.gif'];
                        this.x = x;
                        this.y = y;
                        this.dx = 3;
                        this.dy = 3;
                        this.frame = 0;
                        this.tick = 0;
                        this.anim  = [0, 1, 0, 2];
                        game.rootScene.addChild(this);
                      },
                      //enterframeイベントのリスナーを定義する
                      onenterframe:function(){
                      	this.tick++;
                      //	this.frame = this.anim [this.tick % 4];
                      	this.x = this.x + this.dx;
                      	if(this.y >= 160){
                        	this.scale(1.008,1.008); //少しづつ拡大
                        }else{
                        	this.scale(1.005,1.005);
                        }
                        
                        //xが320-32以上になったら跳ね返りする
                        if(this.x >= 320-32){
                        	this.dx *= -1;
                        }
                        //xが0になったら跳ね返りする
                        if(this.x <= 0){
                        	this.dx *= -1;
                        }
                        
                        
                        //scaleXが7以上になったらスプライトをremove
                      	if(this.scaleX >= 7.5){
                      		game.rootScene.removeChild(this);
                      	}
                        
                      },
                     ontouchend: function(){
                      	game.rootScene.removeChild(this);
                        game.score = game.score + addscore;
                      }
                    });
                    

window.onload = function(){
    // ゲームクラスを生成
    game = new Game(320, 320);
    game.fps = 16;
    game.score = 0;
	//画像の読み込み
	game.preload('gunfighter.gif');
	//ロード開始時に呼ばれる
	game.onload = function(){
      // タイム
        var time_label = new Label();
        time_label.x = 2;
        time_label.y = 2;
        time_label.addEventListener(enchant.Event.ENTER_FRAME, function(){
            var count = Math.floor(game.frame/game.fps);
            time = LIMIT_TIME - count;
            time_label.text = "タイムリミット : " + time;
            if (time <= 0) { game.end(time, 'GameOver'); }
        });
        game.rootScene.addChild(time_label);
   
      //スコア
        var score_label = new Label();
        score_label.x = 2;
        score_label.y = 12;
        score_label.text = "スコア：" + game.score;
        game.rootScene.addChild(score_label);
   
   
		//背景色の生成
		game.rootScene.backgroundColor = '#F4A460';

	//enemyを複数表示させる
		for (var i = 0; i < 5; i++) {
            enemyi = new Enemy(Math.random() * 320 - 32, Math.random() * 320 - 32); 
        }
		
	};
	//ゲーム開始
	game.start();
};