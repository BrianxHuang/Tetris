//set game windowe size

var max_height=20;
var max_width =10;
var gamewindow = document.getElementById("gamewindow");
let windowsize = [Math.round(window.innerWidth-20),Math.round(window.innerHeight-20)]
var blocksize = (windowsize[0]/max_width>windowsize[1]/max_height)?(windowsize[1])/max_height:(windowsize[0])/max_width;
var blockarray = new Array(max_height);
var blockstatus = new Array(max_height);
var rowstatus = new Array(max_height);
gamewindow.style ="position:relative;border:2px solid Black";
gamewindow.style.width = (blocksize*max_width)+"px";
gamewindow.style.height= (blocksize*max_height)+"px";

//set block size CSS
document.documentElement.style.setProperty('--block_size', blocksize+'px');

//set all block in html
for (let i=max_height-1;i>=0;i--){
    gamewindow.innerHTML=gamewindow.innerHTML+'<Div id = Row'+i+' style="display:flex"></Div>';
    let row = document.getElementById("Row"+i);
    for (let j = 0;j<max_width;j++)
    {
        row.innerHTML=row.innerHTML+'<Div id ='+i+'-'+j+' class = "block"></Div>';
    }
}
//get all block ID
for (let i=max_height-1;i>=0;i--){
    blockarray[i] = new Array(max_width);
    blockstatus[i] = new Array(max_width);
    
    for (let j = 0;j<max_width;j++)    
    {        
        blockarray[i][j]= document.getElementById(i+'-'+j);
        blockstatus[i][j]=false;
    }
}
var dropid = null; //ID of setInterval
var moveid = null;
var generateid = null;
var count = true;
statusa = true; //check whther ever collision
//Listen keyborad
var block_pos

window.addEventListener('keydown',  function(e){    
    block_pos=move(block_pos,e.key);          
})
