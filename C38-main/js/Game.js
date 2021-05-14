class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      
    }
    playerCar1 = createSprite(120, 100)
    playerCar2 = createSprite(320, 100)
    playerCar3 = createSprite(520, 100)
    playerCar4 = createSprite(720, 100)
    cars = [playerCar1,playerCar2,playerCar3,playerCar4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", displayWidth/2-50, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var x = 0;
      var y;
      for(var plr in allPlayers){
        index += 1
        x += 200
        y = displayHeight - allPlayers[plr].distance  
        cars[index-1].x = x
        cars[index-1].y = y
        if(index === player.index){

          fill('red')
          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y
        }
        
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites()
  }

}
