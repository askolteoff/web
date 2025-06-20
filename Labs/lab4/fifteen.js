$(document).ready(function(){
	$("div div div").addClass("puzzlepiece");


    let posx = parseInt($("#puzzlearea").css("top"));
    let posy = parseInt($("#puzzlearea").css("left"));

   
    let picx = 0;
    let picy = 0;
    
   
    let blankx = 300;
    let blanky = 300;

	let pieces = document.getElementsByClassName("puzzlepiece");

	for(let i=0; i < pieces.length; i++){
		
		$(pieces[i]).css("background-position", picx+"px "+picy+"px");

		picx -= 100;
		if(picx%400 == 0){ picy -= 100; }

		
		$(pieces[i]).css("top", posy);
		$(pieces[i]).css("left", posx);

		posx += 100;

		if(i !=0 && (i+1)%4 == 0){ 
			posy += 100; 
			posx = parseInt($("#puzzlearea").css("top")); 
		}

		
		$(pieces[i]).on("mouseover", function(){
			if(validate(this)){ $(this).addClass("movablepiece"); }
		});

		
		$(pieces[i]).on("mouseleave", function(){
			$(this).removeClass("movablepiece");
		});

		
		$(pieces[i]).on("click", function(){
			if(validate(this)){ switchTile(this); }
		});
	}

	
	let validate = function(piece){

		if(((parseInt($(piece).css("top")) - blanky == 100 || parseInt($(piece).css("top")) - blanky == -100) && parseInt($(piece).css("left")) - blankx == 0)
			||((parseInt($(piece).css("left")) - blankx == 100 || parseInt($(piece).css("left")) - blankx == -100) && parseInt($(piece).css("top")) - blanky == 0)){
				return true;
			}

		else{ return false; }
	};


	let switchTile = function(move){
		let tempx = blankx;
		let tempy = blanky;

		blanky = parseInt($(move).css("top"));
		blankx = parseInt($(move).css("left"));

        $(move).css("top", tempy);
		$(move).css("left", tempx);
	};

    
	let movepiece = function(){

		let arr = []; 

		for(let i=0; i < pieces.length; i++){
			if (validate(pieces[i]) == true){
				arr.push(pieces[i]);
			}
		}

		
		let move = arr[Math.floor(Math.random() * arr.length)];

		
		switchTile(move);

	};

	$("#shufflebutton").on("click", function(){
		
		times = Math.floor(Math.random() * 100) + 100;

		for(let i=0; i < times; i++){
			movepiece();
		}
	});
});