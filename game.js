enchant();

var LIMIT_TIME = 30;
var game;
var addscore = 10;
var time = 0;
var life;

var MOVE_STATE = 0;
var AIM_STATE = 1;
var SHOT_STATE = 2;
var EVACUATE_STATE = 3;
var DEATH_STATE = 4;



					//乱数
		rand = function(n){
			return Math.floor(Math.random() * n);
		}

		// 敵キャラクラス
		var Enemy = Class.create(Sprite, // Spriteクラスを継承
                    { initialize:function(x,y){ //初期化する
                        Sprite.call(this,32,32); //Spriteオブジェクトを初期化
                        this.image = game.assets['gunfighter.png'];
                        this.x = x;
                        this.y = y;
                        this.dx = 5;
                        this.dy = 5;
                        this.frame = 0;
                        this.tick = 0;
                        this.anim  = [0, 1];
                        this.state = MOVE_STATE;
                        this.keepstatecount = 32 + rand(32);
                        this._element.style.zIndex = this.height + y;
                        game.rootScene.addChild(this);
                      },
                      //enterframeイベントのリスナーを定義する
                      onenterframe:function(){
                      
                      this.keepstatecount--;
                      
                      if(this.state ==MOVE_STATE){
                      		this.tick++;
                      		this.frame = this.anim [this.tick % 3];
                      		if(this.tick % 1 == 0){
                      			this.x = this.x + this.dx;
                      		}
                        	//xが320-32以上になったら跳ね返りする
                        	if(this.x >= 320 - 32){
                        		this.dx *= -1;
                        	}
                        	//xが0になったら跳ね返りする
                        	if(this.x <= 0){
                        		this.dx *= -1;
                        	}
                        	
                        	if(this.keepstatecount<=0){
                        	this.keepstatecount =32 + rand(32);
                        	this.state = AIM_STATE;
                        	}
                        	
                        }else if(this.state == AIM_STATE){
                        
                        this.frame = 2;
                        
                        if(this.keepstatecount<=0){
                        	this.keepstatecount =16;
                        	this.state = SHOT_STATE;
                        }
                        
                        }else if(this.state == SHOT_STATE){
                        
                        this.frame = 3;
                        if(this.keepstatecount % 8 ==0 ){
                			game.life --;
                			life.width = 16 * game.life;
						}
                        if(this.keepstatecount<=0){
                        	this.keepstatecount =32 + rand(32);
                        	this.state = EVACUATE_STATE;
                        }
                        
                        }else if(this.state == EVACUATE_STATE){
                        	
                        	this.tick++;
                      		this.frame = this.anim [this.tick % 3];
                      		if(this.tick % 1 == 0){
                      			this.x = this.x + this.dx;
                      		}
                      		
                      		if(this.x <= 0 || this.x >= 320 ){
                      			game.rootScene.removeChild(this);
                      		}
                      		
                        	if(this.keepstatecount<=0){
                        		this.keepstatecount =32 + rand(32);
                        		this.state = AIM_STATE;
							}
                        
                        }else if(this.state == DEATH_STATE){
                        	    this.frame = 4;
                        	    this.tick++;
                        	    if(this.tick % 16 == 0){
                        	    	game.rootScene.removeChild(this);
                        	    }
                        	    
                        }
                        
                      },
                      
                      
                      
                      	//タッチが終了した時の処理
                     	ontouchend: function(){
                     		 game.assets['gun.wav'].play();
                        	game.score = game.score + addscore;
                        	this.state = DEATH_STATE
                      	}
                    });
                    
                    
                //障害物1クラス    
				var Obstacle1 = Class.create(Sprite, // Spriteクラスを継承
                    { initialize:function(x,y){ //初期化する
                        Sprite.call(this,64,64); //Spriteオブジェクトを初期化
                        this.image = game.assets['crag.gif'];
                        this.x = x;
                        this.y = y;
                        this._element.style.zIndex = this.height + this.y;
                        game.rootScene.addChild(this);
        			}
        			});
        		
        		//障害物2クラス
        		var Obstacle2 = Class.create(Sprite, // Spriteクラスを継承
                    { initialize:function(x,y){ //初期化する
                        Sprite.call(this,64,64); //Spriteオブジェクトを初期化
                        this.image = game.assets['rock.gif'];
                        this.x = x;
                        this.y = y;
                        this._element.style.zIndex = this.height + this.y;
                        game.rootScene.addChild(this);
        			}
        			});
        			
        			//障害物3クラス
        		var Obstacle3 = Class.create(Sprite, // Spriteクラスを継承
                    { initialize:function(x,y){ //初期化する
                        Sprite.call(this,64,64); //Spriteオブジェクトを初期化
                        this.image = game.assets['cactus.gif'];
                        this.x = x;
                        this.y = y;
                        this._element.style.zIndex = this.height + this.y;
                        game.rootScene.addChild(this);
        			}
        			});
        			
        			//障害物4クラス
        		var Obstacle4 = Class.create(Sprite, // Spriteクラスを継承
                    { initialize:function(x,y){ //初期化する
                        Sprite.call(this,64,64); //Spriteオブジェクトを初期化
                        this.image = game.assets['fcactus.gif'];
                        this.x = x;
                        this.y = y;
                        this._element.style.zIndex = this.height + this.y;
                        game.rootScene.addChild(this);
        			}
        			});	
					
					function setLifes(){
 				   	life = new Sprite((16 * game.life) - 320,16);
    				life.image = game.assets['heart.png'];
    				life.set = function(num){
        			game.life = num;
        			this.width = 16 * 5;}
   						game.rootScene.addChild(life);
					}
										
window.onload = function(){
    // ゲームクラスを生成
    game = new Game(320, 320);
    game.fps = 16;
    game.score = 0;
    game.tick = 16 * 30;
    game.life = 5;
	//画像の読み込み
	game.preload('gunfighter.png','wilderness.gif','crag.gif','cactus.gif','fcactus.gif','rock.gif','bullet.gif','heart.png','gun.wav');
	//ロード開始時に呼ばれる
	game.onload = function(){
	
		//背景画像の生成
		var bg = new Sprite(320,320);
		bg.image = game.assets['wilderness.gif'];
		game.rootScene.addChild(bg);
	
		 
		//ライフ
		life = new Sprite(16,16);
		life.image = game.assets['heart.png'];
		life.width = 16 * game.life;
		life.x = 320 - (16 * game.life); life.y = 2;
		game.rootScene.addChild(life);
	
	
      	// タイムとスコアを表示
        var label = new Label('');
        label.x = 2;
        label.y = 2;
        label._element.style.zIndex = 330;
        label.addEventListener(enchant.Event.ENTER_FRAME, function(){
            game.tick --;
            time = Math.floor(game.tick / 16);
            label.text = "タイムリミット : " + time +  "<BR>スコア：" + game.score;
            if (time == 0) { game.end (game.score, 'あなたのスコアは'+ game.score + 'です！'); }
           	else if(game.life == 0){ game.end (game.score, 'あなたのスコアは'+ game.score + 'です！');}
        });
        game.rootScene.addChild(label);
        
 
	
       
			game.addEventListener(enchant.Event.ENTER_FRAME,function(){
				if( rand(1000) < 30){
					enemy = new Enemy(Math.floor(Math.random() * 280 - 32) + 52, Math.floor(Math.random() * 280 - 32) + 52); 
				}
			});
				
   
   

		
		
		
		//障害物を表示
		obstacle1 = new Obstacle1(Math.floor(Math.random() * 260 - 64) + 64, Math.floor(Math.random() * 260 - 64) + 64); 
		obstacle2 = new Obstacle2(Math.floor(Math.random() * 260 - 64) + 64, Math.floor(Math.random() * 260 - 64) + 64); 
		obstacle3 = new Obstacle3(Math.floor(Math.random() * 260 - 64) + 64, Math.floor(Math.random() * 260 - 64) + 64); 
		obstacle4 = new Obstacle4(Math.floor(Math.random() * 260 - 64) + 64, Math.floor(Math.random() * 260 - 64) + 64); 
		
		
	};
	//ゲーム開始
	game.start();
};