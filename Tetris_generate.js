function generate(){  
  let allkind = ["I","J","L","O","S","T","Z"];
  let randkind = Math.round(Math.random()*(6));  
  let block_pos = new Array(5);
  let strat_x=3;
  let start_y=max_height-1
  block_pos[4]=allkind[randkind];
  switch (block_pos[4]) {
    case "I":
      block_pos = [[start_y,strat_x],[start_y,strat_x+1],[start_y,strat_x+2],[start_y,strat_x+3],"I"];
      break;
    case "J":
      block_pos = [[start_y-1,strat_x+2],[start_y-1,strat_x+1],[start_y-1,strat_x],[start_y,strat_x],"J"];
      break;
    case "L":
      block_pos = [[start_y-1,strat_x],[start_y-1,strat_x+1],[start_y-1,strat_x+2],[start_y,strat_x+2],"L"];
      break;
    case "O":
      block_pos = [[start_y,strat_x+1],[start_y,strat_x+2],[start_y-1,strat_x+2],[start_y-1,strat_x+1],"O"];
      break;
    case "S":
      block_pos = [[start_y-1,strat_x],[start_y-1,strat_x+1],[start_y,strat_x+1],[start_y,strat_x+2],"S"];
      break;
    case "T":
      block_pos = [[start_y-1,strat_x],[start_y-1,strat_x+1],[start_y-1,strat_x+2],[start_y,strat_x+1],"T"];
      break;
    case "Z":
      block_pos = [[start_y,strat_x],[start_y,strat_x+1],[start_y-1,strat_x+1],[start_y-1,strat_x+2],"Z"];
      break;
  }   
  count = false;
  return block_pos;

}

function block_display(block_pos){  
  block_kind=block_pos[4];
  let blockcolor;
  switch (block_kind) {
    case "I":
      blockcolor ="CornflowerBlue";
      break;
    case "J":
      blockcolor ="DarkBlue";
      break;
    case "L":
      blockcolor ="Chocolate";
      break;
    case "O":
      blockcolor ="Gold";
      break;
    case "S":
      blockcolor ="ForestGreen";
      break;
    case "T":
      blockcolor="DarkViolet";
      break;
    case "Z":
      blockcolor="FireBrick";
      break;
  }
  for (let i = 0;i<4;i++){
    blockarray[block_pos[i][0]][block_pos[i][1]].style.backgroundColor = blockcolor;
  }  
}
