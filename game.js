enchant();
// リミット
var LIMIT_TIME = 30;
var game;
var addscore = 10;

		// ここで自作クラスEnemyをつくる
		var Enemy = Class.create(Sprite, // Spriteクラスを継承
                    { initialize:function(x,y){ //初期化する
                        Sprite.call(this,32,32); //Spriteオブジェクトを初期化
                        this.image = game.assets['gunfighter.png'];
                        this.x = x;
                        this.y = y;
                        this.dx = 3;
                        this.dy = 3;
                        this.frame = 0;
                        this.tick = 0;
                        // this.anim  = [0, 1, 0, 2];
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
                        if(this.x >= 320 - 32){
                        	this.dx *= -1;
                        }
                        //xが0になったら跳ね返りする
                        if(this.x <= 0){
                        	this.dx *= -1;
                        }
                        
                        //scaleXが7以上になったらスプライトをremove
                      	if(this.scaleX >= 3.5){
                      		game.rootScene.removeChild(this);
                      	}
                        
                      	},
                      	//タッチが終了した時の処理
                     	ontouchend: function(){
                        	game.score = game.score + addscore;
                      		game.rootScene.removeChild(this);
                      	}
                    });
                    

window.onload = function(){
    // ゲームクラスを生成
    game = new Game(320, 320);
    game.fps = 16;
    game.score = 0;
	//画像の読み込み
	game.preload('gunfighter.png','wilderness.gif','crag.gif','cactus.gif','fcactus.gif','rock.gif','bullet.gif','heart.png');
	//ロード開始時に呼ばれる
	game.onload = function(){
	
		//背景画像の生成
		var bg = new Sprite(320,320);
		bg.image = game.assets['wilderness.gif'];
		game.rootScene.addChild(bg);
		
	
		//enemyを複数表示させる
		for (var i = 0; i < 5; i++) {
            enemyi = new Enemy(Math.floor(Math.random() * 280 - 32) + 32, Math.floor(Math.random() * 280 - 32) + 32); 
        }
	
      	// タイム
        var time_label = new Label();
        time_label.x = 2;
        time_label.y = 2;
        time_label.addEventListener(enchant.Event.ENTER_FRAME, function(){
            var count = Math.floor(game.frame/game.fps);
            time = LIMIT_TIME - count;
            time_label.text = "タイムリミット : " + time;
            if (time <= 0) { game.end(game.score, 'GameOver'); }
        });
        game.rootScene.addChild(time_label);
   
      	//スコア
        var score_label = new Label();
        score_label.x = 2;
        score_label.y = 12;
        score_label.addEventListener(enchant.Event.ENTER_FRAME,function(){
        	score_label.text = "スコア：" + game.score;
        });
        game.rootScene.addChild(score_label);
   
		//ライフを表示
		var life = new Sprite(16,16);
		life.image = game.assets['heart.png'];
		life.x = 300; life.y = 2;
		game.rootScene.addChild(life);	
		
		
		//障害物を表示
		var obstacle1 = new Sprite(64,64);
		obstacle1.image = game.assets['crag.gif'];
		obstacle1.x = 200;
		obstacle1.y = 100;
		game.rootScene.addChild(obstacle1);
		
		var obstacle2 = new Sprite(64,64);
		obstacle2.image = game.assets['rock.gif'];
		obstacle2.x = 100;
		obstacle2.y = 150;
		game.rootScene.addChild(obstacle2);
		
		var obstacle3 = new Sprite(64,64);
		obstacle3.image = game.assets['cactus.gif'];
		obstacle3.x = 200;
		obstacle3.y = 200;
		game.rootScene.addChild(obstacle3);
		
		var obstacle4 = new Sprite(64,64);
		obstacle4.image = game.assets['fcactus.gif'];
		obstacle4.x = 80;
		obstacle4.y = 80;
		game.rootScene.addChild(obstacle4);
		
	};
	//ゲーム開始
	game.start();
};