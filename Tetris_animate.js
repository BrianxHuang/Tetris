function move(block_pos,keydir){          
    switch (keydir) {
        case "Enter":
            clearInterval(generateid);
            generateid = setInterval(generatemove,10);                                             
            break;
        case "ArrowDown":            
            dropmove(); 
            break;
        case "ArrowLeft":
            panningmove("Left");      
            break;
        case "ArrowRight":
            panningmove("Right");      
            break;
        case "ArrowUp":                   
            rotatemove("CW");              
            break;
        case "z":
        case "Z":
            rotatemove("CCW");      
            break;
        case " ":
            maxdropmove();   
            
            break;
            
        }    

    return block_pos;    
}
function generatemove() {         
    if (count == true){            
        block_pos=generate();
        block_display(block_pos);
        clearInterval(dropid);
        dropid = setInterval(dropmove, 500);                
    }            
}       
function dropmove() {
    if (block_stack(block_pos)){
        count = true;            
        clearInterval(dropid);         
    }else {
        block_wipe(block_pos);      
        block_pos = block_move(block_pos,"Down");
        block_pos = block_border(block_pos);      
        block_display(block_pos);
    }         
}
function maxdropmove() {
    while (!block_stack(block_pos)){ 
        block_wipe(block_pos);      
        block_pos = block_move(block_pos,"Down");
        block_pos = block_border(block_pos);      
        block_display(block_pos);
    }
    count = true;            
        clearInterval(dropid);          
}      
function panningmove(panning_dir) {       
    let nextpos=block_copy(block_pos);                
    nextpos = block_move(nextpos,panning_dir);
    block_wipe(block_pos);
    if(block_collision(nextpos)){            
        block_pos=block_move(block_pos,panning_dir);
        block_pos = block_border(block_pos); 
    }        
    block_display(block_pos);         
    return block_pos;
        
}
function rotatemove(rotate_dir) {                        
    let nextpos=block_copy(block_pos);                     
    nextpos = rotate(nextpos,rotate_dir);
    nextpos =block_border(nextpos);
    block_wipe(block_pos);  
    if(block_collision(nextpos)){            
        block_pos = rotate(block_pos,rotate_dir);
        block_pos = block_border(block_pos); 
    }
    block_display(block_pos);         
    return block_pos;
}


function rotate(block_pos,direction){      
    let temp = new Array(2); 
    let origin=new Array(2);    
    switch (block_pos[4]) { //chose diffrent block center point
        case "I":
            origin=iorigin(block_pos);                                  
            break;
        case "J":
            origin = [block_pos[1][0],block_pos[1][1]];
            break;
        case "L":
            origin = [block_pos[1][0],block_pos[1][1]];
            break;
        case "O":
            origin = [(block_pos[0][0]+block_pos[2][0])/2,(block_pos[0][1]+block_pos[2][1])/2];
            break;
        case "S":
            origin = [block_pos[2][0],block_pos[2][1]];
            break;
        case "T":
            origin = [block_pos[1][0],block_pos[1][1]];
            break;
        case "Z":
            origin = [block_pos[1][0],block_pos[1][1]];
            break;
    }
    
    //rotate    
    if (direction =="CW")
    {
        for (let i = 0; i<4;i++){
            temp = [block_pos[i][0],block_pos[i][1]];            
            block_pos[i][0]=-temp[1]+origin[1]+origin[0];            
            block_pos[i][1]=temp[0]-origin[0]+origin[1];
        }
    }else if (direction =="CCW")
    {        
        for (let i = 0; i<4;i++){            
            temp = [block_pos[i][0],block_pos[i][1]];            
            block_pos[i][0]=(temp[1]-origin[1]+origin[0]);
            block_pos[i][1]=(-temp[0]+origin[0]+origin[1]);
            
        }
          
    }    
    //rotate center
    function iorigin(block_pos){
        if (block_pos[0][1]<block_pos[3][1]){             
            origin = [block_pos[0][0]-0.5,(block_pos[1][1]+block_pos[2][1])/2];                    
        }else if (block_pos[0][1]>block_pos[3][1]){
            origin = [block_pos[0][0]+0.5,(block_pos[1][1]+block_pos[2][1])/2];            
        }        
        if (block_pos[0][0]>block_pos[3][0]){
            origin = [(block_pos[1][0]+block_pos[2][0])/2,block_pos[0][1]-0.5];            
        }else if (block_pos[0][0]<block_pos[3][0]){
            origin = [(block_pos[1][0]+block_pos[2][0])/2,block_pos[0][1]+0.5];                   
        }  
             
        return origin;  
    }     
    return block_pos; 
}
// if collsion border move
function block_border(block_pos){    
    for (let i = 0; i<4;i++){
        while (block_pos[i][1]<0){
            block_pos=block_move(block_pos,"Right");
        }
        while (block_pos[i][1]>=max_width){
            block_pos=block_move(block_pos,"Left");
        }
        while (block_pos[i][0]>=max_height){            
            block_pos=block_move(block_pos,"Down");            
        }              
    }
    return block_pos
}
// move block
function block_move(block_pos,movedir){    
    switch (movedir) {
        case "Up":
            for (let i = 0; i<4;i++){
                block_pos[i][0]=block_pos[i][0]+1;              
            }
            break;
        case "Down":
            for (let i = 0; i<4;i++){
                block_pos[i][0]=block_pos[i][0]-1;              
            }
            break;
        case "Left":
            for (let i = 0; i<4;i++){
                block_pos[i][1]=block_pos[i][1]-1;                             
            }
            break;
        case "Right":
            for (let i = 0; i<4;i++){
                block_pos[i][1]=block_pos[i][1]+1;              
            }
            break;
    }
    return block_pos;
}
function block_wipe(block_pos){    
    for (let i = 0;i<4;i++){
        blockarray[block_pos[i][0]][block_pos[i][1]].style.backgroundColor = "White";
    }  
}
function block_stack(block_pos){
    for (let i = 0; i<4;i++){ 
        if (block_pos[i][0]==0){
            for (let j = 0; j<4;j++){
                blockstatus[block_pos[j][0]][block_pos[j][1]]=true;                
            }
            block_cancel();
            return true;
            
        }
        if (blockstatus[block_pos[i][0]-1][block_pos[i][1]]==true)
        {   
            for (let j = 0; j<4;j++){
                blockstatus[block_pos[j][0]][block_pos[j][1]]=true;                
            } 
            block_cancel();        
            return true;
        }                
    }
    return false;
}
function block_collision(block_pos){       
    for (let i = 0; i<4;i++){
        if (blockstatus[block_pos[i][0]][block_pos[i][1]]==true){
            return false;
        }        
    }
    return true;        
}
function block_copy(pos1){     
    let pos2=new Array(5);
    pos2[4]=pos1[4];  
    for (let i = 0; i<4;i++){
        pos2[i]=new Array(2);
        pos2[i][0]=pos1[i][0];
        pos2[i][1]=pos1[i][1];
    }
    return pos2;  
}
function block_cancel(){    
    for(let i = 0; i<max_height;i++){
        rowstatus[i]=i;
    }        
    for (let i = 0; i<max_height;i++){  
        let rowcount = 0;      
        for (let j = 0; j<max_width;j++){
            if (blockstatus[i][j]==true){
                rowcount++;
            }
        }
        if (rowcount == max_width){
            index = rowstatus.findIndex(element => element == i);            
            rowstatus.splice(index ,1);
            rowstatus.push("x");
            
        }        
    }    
    for (let i = 0; i<max_height;i++){            
        for (let j = 0; j<max_width;j++){            
            if (rowstatus[i]=="x"){                               
                blockstatus[i][j]=false;
                blockarray[i][j].style.backgroundColor = "White";
            }else{
                blockstatus[i][j]=blockstatus[rowstatus[i]][j];
                blockarray[i][j].style.backgroundColor =blockarray[rowstatus[i]][j].style.backgroundColor;
            }
        }      
    }
    
}
function gameover(){
    alert('Gameover!');
    for (let i=max_height-1;i>=0;i--){        
        blockstatus[i] = new Array(max_width)        
        for (let j = 0;j<max_width;j++)    
        {                    
            blockstatus[i][j]=false;
            blockarray[i][j].style.backgroundColor = "White";
        }
    }
    rowstatus = new Array(max_height);
    dropid = null
    moveid = null;
    generateid = null;
    count = true;     
    alert('Please press "enter" to start');
    block_pos=generate();
    return block_pos;
}
    
