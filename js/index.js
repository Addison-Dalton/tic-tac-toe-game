$(document).ready(function(){
  var playerChoice;
  var computerChoice;
  var ticTacBoard = [
    //TOP ROW
    {
      id:"top1",
      val: 0
    },{
      id:"top2",
      val: 0
    },{
      id:"top3",
      val: 0
    },
    //MID ROW
    {
      id:"mid1",
      val: 0
    },{
      id:"mid2",
      val: 0
    },{
      id:"mid3",
      val: 0
    },
    //BOT ROW
    {
      id:"bot1",
      val: 0
    },{
      id:"bot2",
      val: 0
    },{
      id:"bot3",
      val: 0
    }
  ];
  
  //on load, hide the main game
  $("#tic-tac-toe").addClass("hidden");
  //when an X or O is chosen, hide the intro screen, and show the game screen
  $("#x-btn, #o-btn").on("click",function(){
    $("#intro").addClass("hidden");
    $("#tic-tac-toe").removeClass("hidden");
    
    //'save' the choice the player made
    playerChoice = $(this).text();
    
    //determine who computer is playins as
  //and who goes first(x starts)
  if(playerChoice === "X"){
    computerChoice = "O";
  }else{
    //change to computer's turn;
    computerTurn();
    computerChoice = "X";
    clicksEnabled(false);
    setTimeout(function(){
      computerAI();
      clicksEnabled(true);
    },2000);
  }
  });//intro end
  
  
  //listens for tic tac toe 'cell'clicks.
  $(".cell-btn").on("click",function(){
    //stores the id of the cell clicked so the appropriate 
    var cellClicked = $(this).attr('id');
    //change value for cell clicked
    ticTacBoard.forEach(function(cell, index){
      //find cell that was clicked
      if(cell.id === cellClicked){
        //only change val if 0, so one doesn't change the opponents val when clicked
        if(cell.val === 0){
          cell.val = playerChoice;
          $("#"+cellClicked).text(playerChoice);
          computerTurn();
          clicksEnabled(false);
          checkThreeInRow();//maybe return true to break away
          setTimeout(function(){
            computerAI();
            clicksEnabled(true);
          },2000);
        }//check cell val end
      }//check cell id end
    });//for each ticTac object end
  });//cell click btn end
  
  //reset button
  $("#reset-btn").on("click",function(){
    $("#player-score-num").text("0");
    $("#computer-score-num").text("0");
    matchEndReset();
  });//reset btn end
  
  //check for winning combo function
  function checkThreeInRow(){
    //ROWS
    var index = 0;//used indicate which cell in objectArray to get
    //loop three times, for each row
    for(var i = 0; i < 3; i++){
      //check for when values are the same
     if(ticTacBoard[index].val === ticTacBoard[index+1].val && ticTacBoard[index+1].val === ticTacBoard[index+2].val){
       //only do something if it's not the default 0 val
       if(ticTacBoard[index].val !== 0){
         //indicate three in row on screen
         $("#"+ticTacBoard[index].id).addClass("winning-combo");
         $("#"+ticTacBoard[index+1].id).addClass("winning-combo");
         $("#"+ticTacBoard[index+2].id).addClass("winning-combo");
         updateScore(ticTacBoard[index].val);
         //reset game
         setTimeout(function(){
           matchEndReset();
           return; //exit function because combo found
         },1500);
       } 
     }
     index+=3; //plus 3 to move to next row.
    }//row loop end
    
    //COLS
    index = 0; //reset index
    //loop three times, for each col
    for(var k = 0; k < 3; k++){
      //check if a col has same val
      if(ticTacBoard[index].val === ticTacBoard[index+3].val && ticTacBoard[index+3].val === ticTacBoard[index+6].val){
        //only do something if not default 0 val
       if(ticTacBoard[index].val !== 0){
         $("#"+ticTacBoard[index].id).addClass("winning-combo");
         $("#"+ticTacBoard[index+3].id).addClass("winning-combo");
         $("#"+ticTacBoard[index+6].id).addClass("winning-combo");
         updateScore(ticTacBoard[index].val);
         //reset game
         setTimeout(function(){
           matchEndReset();
           return; //exit function because combo found
         },1500);
       }//check if not 0 val end
      }//check for same val end
      index+=1;//plus three to move to next col
    }//col loop end
    
    //DIAGONALS
    index = 0; //reset index
    
    //loop 2 times checking for the 2 possible diag combos
    for(var j = 0; j < 2; j++){
      //check if diag have same combo, middle stays same, add two index to the top, and minus 2 at bottom to switch diag
      if(ticTacBoard[0+index].val === ticTacBoard[4].val && ticTacBoard[4].val === ticTacBoard[8-index].val){
       if(ticTacBoard[index].val !== 0){
         $("#"+ticTacBoard[0+index].id).addClass("winning-combo");
         $("#"+ticTacBoard[4].id).addClass("winning-combo");
         $("#"+ticTacBoard[8-index].id).addClass("winning-combo");
         updateScore(ticTacBoard[index].val);
         //reset game
         setTimeout(function(){
           matchEndReset();
           return; //exit function because combo found
         },1500);
       }//check if not 0 val end
      }//check for same val end
      index+=2;//increment by 2
    }//diag loop end
    
    if(gameDraw()){
      //reset game
      console.log("draw called");
      updateScore("draw");
      setTimeout(function(){
        matchEndReset();
        return; //exit function
      },1000);
    }
  }// threeInRow function end
  
  
  //computers turn
  function computerAI(){
    //first check for your own double
    //ROW CHECK
    if(twoInRow(0,1,2,computerChoice)){//row 1
      checkThreeInRow();
      playerTurn();
      return;
    }else if(twoInRow(3,4,5,computerChoice)){//row 2
      checkThreeInRow();
      playerTurn();
      return;       
    }else if(twoInRow(6,7,8,computerChoice)){//row 3
      checkThreeInRow();
      playerTurn();
      return;
    }
    
    //COL CHECK
    if(twoInRow(0,3,6,computerChoice)){//row 1
      checkThreeInRow();
      playerTurn();
      return;
    }else if(twoInRow(1,4,7,computerChoice)){//row 2
      checkThreeInRow();
      playerTurn();
      return;       
    }else if(twoInRow(2,5,8,computerChoice)){//row 3
      checkThreeInRow();
      playerTurn();
      return;
    }
    
    //DIAG CHECK
    if(twoInRow(0,4,8,computerChoice)){//row 1
      checkThreeInRow();
      playerTurn();
      return;
    }else if(twoInRow(6,4,2,computerChoice)){//row 2
      checkThreeInRow();
      playerTurn();
      return;       
    }
    
    //then check for enemy double to block
    //ROW CHECK
    if(twoInRow(0,1,2,playerChoice)){//row 1
      checkThreeInRow();
      playerTurn();
      return;
    }else if(twoInRow(3,4,5,playerChoice)){//row 2
      checkThreeInRow();
      playerTurn();
      return;       
    }else if(twoInRow(6,7,8,playerChoice)){//row 3
      checkThreeInRow();
      playerTurn();
      return;
    }
    
    //COL CHECK
    if(twoInRow(0,3,6,playerChoice)){//row 1
      checkThreeInRow();
      playerTurn();
      return;
    }else if(twoInRow(1,4,7,playerChoice)){//row 2
      checkThreeInRow();
      playerTurn();
      return;       
    }else if(twoInRow(2,5,8,playerChoice)){//row 3
      checkThreeInRow();
      playerTurn();
      return;
    }
    
    //DIAG CHECK
    if(twoInRow(0,4,8,playerChoice)){//row 1
      checkThreeInRow();
      playerTurn();
      return;
    }else if(twoInRow(6,4,2,playerChoice)){//row 2
      checkThreeInRow();
      playerTurn();
      return;       
    }
    
    //if this doesn't exist, randomly choose spot
    var emptyCellFound = false;
    var randIndex = 0;
    var failSafe = 0;
    while(emptyCellFound === false && failSafe < 250){
      randIndex = Math.floor(Math.random() * (8 - 0 + 1));
      if(ticTacBoard[randIndex].val === 0){
        ticTacBoard[randIndex].val = computerChoice;
        $("#"+ticTacBoard[randIndex].id).text(computerChoice);
        emptyCellFound = true;
        checkThreeInRow();
        playerTurn();
        return
      }//if end
      failSafe++;
    }//while loop end;
  };//computerAI end

  //checks if two of the same character are in a row (can check col and diag) three outer if statements for the three cases that two of the same character could fill a row. 
  function twoInRow(i1,i2,i3,character){
    if(ticTacBoard[i1].val === character && ticTacBoard[i2].val === character && ticTacBoard[i3].val === 0){
      //if computerChoice character, finish 3 in row, if playerChoice block their two in Row
      if(character === computerChoice){
        ticTacBoard[i3].val = character;
        $("#"+ticTacBoard[i3].id).text(character);
        return true;
      }else{//player choice, block
        ticTacBoard[i3].val = computerChoice;
        $("#"+ticTacBoard[i3].id).text(computerChoice);
        return true;
      }
    }else if(ticTacBoard[i1].val === character && ticTacBoard[i2].val === 0  && ticTacBoard[i3].val === character){
      
      //if computerChoice character, finish 3 in row, if playerChoice block their two in Row
      if(character === computerChoice){
        ticTacBoard[i2].val = character;
        $("#"+ticTacBoard[i2].id).text(character);
        return true;
      }else{//player choice, block
        ticTacBoard[i2].val = computerChoice;
        $("#"+ticTacBoard[i2].id).text(computerChoice);
        return true;
      }      
    }else if(ticTacBoard[i1].val === 0 && ticTacBoard[i2].val === character  && ticTacBoard[i3].val === character){
      
      //if computerChoice character, finish 3 in row, if playerChoice block their two in Row
      if(character === computerChoice){
        ticTacBoard[i1].val = character;
        $("#"+ticTacBoard[i1].id).text(character);
        return true;
      }else{//player choice, block
        ticTacBoard[i1].val = computerChoice;
        $("#"+ticTacBoard[i1].id).text(computerChoice);
        return true;
      }
    }
  }//twoInRow function end

  function computerTurn(){
    $("#comp-turn-label").removeClass("opponents-turn");
    $("#comp-turn-label").addClass("your-turn");
    $("#player-turn-label").removeClass("your-turn");
    $("#player-turn-label").addClass("opponents-turn");
  };
  function playerTurn(){
    $("#player-turn-label").removeClass("opponents-turn");
    $("#player-turn-label").addClass("your-turn");
    $("#comp-turn-label").removeClass("your-turn");
    $("#comp-turn-label").addClass("opponents-turn");
  };
  
  function clicksEnabled(bool){
    if(bool === true){
      $(".cell").css("pointer-events","auto");
    }else{
      $(".cell").css("pointer-events","none");
    }
  };//clicks enabled end
  
  function gameDraw(){
   return ticTacBoard.every(function(cell){
      if(cell.val !== 0){
        console.log(cell);
        return true;
      }
    });
  }//game draw end
  function updateScore(result){
    var score = 0;
    if(result === playerChoice){
      score = parseInt($("#player-score-num").text(),10);
      $("#player-score-num").text(score+1);
      //indicate player won
    }else if(result === computerChoice){
      score = parseInt($("#computer-score-num").text(),10);
      $("#computer-score-num").text(score+1);
      //indicate computer won
    }else{
      //if draw, just indicate a draw
    }
  }
  function matchEndReset(){
    //reset ticTacBoard vals and on-screen vals
    ticTacBoard.forEach(function(cell){
      var cellID = "#"+cell.id;
      cell.val = 0;
      $(cellID).text("");
      $(cellID).removeClass("winning-combo"); //removes the winning combo 'look' for next round
    });//for each end
  }//matchReset end
});//document ready end