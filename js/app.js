function play(sound) {
    var audio = new Audio(sound);
    audio.play();
}

function playWord(word) {
    play('./'+word+'.mp3');
}








document.getElementById('file').onchange = function(){

    var file = this.files[0];
      
    var reader = new FileReader();
    reader.onload = function(progressEvent){
      // Entire file
      console.log(this.result);
  
      // By lines
      var lines = this.result.split('\n');
      for(var line = 0; line < lines.length; line++){
        console.log(lines[line]);
      }
    };
    reader.readAsText(file);
  };





function makeSightWord() {

}

function makePictureWord() {

}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));
dragElement(document.getElementById("mydiv3"));


let wordsContainer = document.getElementById("words-container");



const logBtn = document.getElementById('log');
logBtn.addEventListener('click', fetchData);

async function fetchData() {

    const response = await fetch('./sight-words.json');
    const data = await response.json();

    let len = data.length;

    for (i = 0; i < len; i++) {
        // wordsContainer.innerHTML += 
        // '<div class="outer" id="'+ data[i] +'"><div class="header">'+ data[i] +'</div></div>
        //<script>
        //dragElement(document.getElementById("'+data[i]+'"));</script>';
        
        let div = document.createElement('div');
        wordsContainer.appendChild(div);
        div.className = 'outer';
        div.id = data[i];

        let iDiv = document.createElement('div');
        div.appendChild(iDiv);
        iDiv.className = 'header';
        iDiv.innerHTML = data[i];

        // wordsContainer.innerHTML += "<br><br><br>";

        let b1 = document.createElement('br');
        let b2 = document.createElement('br');
        let b3 = document.createElement('br');

        wordsContainer.appendChild(b1);
        wordsContainer.appendChild(b2);
        wordsContainer.appendChild(b3);
        
        dragElement(document.getElementById(data[i]));
    }

}
