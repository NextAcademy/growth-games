let startY = $("#rabbit").css('top')
let startX = $("#rabbit").offset().left

$('#start').click(function(){
    // this part show how to make the rabbit jump
    $("body").on('touchstart',function(e) {
        let currentY = $("#rabbit").css('top') 
        let num = currentY.substring(0,currentY.length-2)
        let jumpDistance = num * 3/4  
        let newY = Number(num) - jumpDistance 
        // IF currentY of rabbit is equal to originalY,
        //      THEN move rabbit to newY AND back to previous Yposition,
        // ELSE 
        //      do nothing
        if (currentY == startY) {
            $("#rabbit").animate({top: `${newY}px`}, 300).animate({top: currentY}, 300);
        }
    });
    $("body").keydown(function(e) {
        if(e.keyCode == 32) {  // spacebar keycode
            let currentY = $("#rabbit").css('top')
            let num = currentY.substring(0,currentY.length-2)
            let jumpDistance = num * 3/4  
            let newY = Number(num) - jumpDistance
            if (currentY == startY) {
                $("#rabbit").animate({top: `${newY}px`}, 300).animate({top: currentY}, 300);
            }
        }
    });
    $("#bgMusic").trigger("play");
    start()
});
// this part control the count down timer 
function start() {
    let seconds = 30
    show(seconds+2)
    show(seconds+1)
    $("#countdown").text(seconds);;
    $("#start").remove()
    $("#intro").remove()
    let countdown = setInterval(function() {
        show(seconds)
        seconds--;
        $("#countdown").text(seconds);
        let selected = seconds+6
        $(`#${selected}`).remove()
        if (seconds == 0) {
            clearInterval(countdown);
            $("#board").append(`<div id="restart" class="button" onClick="restart()">Play again</div>`)
        }
    }, 1000);
};
// set the Yposition of mooncakes
function randomY (){
    const top = Math.floor(Math.random()*65);
    if (top<30){
        return 30+'vh'
    }
    return top+'vh'
}
// set the speed of mooncakes
function randomSpeed (){
    const speed = Math.floor(Math.random()*6);
    if (speed<2){
        return 2500
    }
    return Number(speed+'000')
}
// create the mooncake with random Yposition and random speed 
function show(i){
    if (i>2){
        $(".container").append(`<img id="${i}" class="mooncake" src="mooncake.png">`)
        $(`#${i}`).css({'top':randomY()})
        $(`#${i}`).animate({left:'-15%'},{
            duration:randomSpeed(),
            step: function() {
                if ( $(this).css('left') >= (`${startX}px`) && $(this).css('left') <= (`${startX+100}px`)) {
                    let y = $(this).offset().top
                    let rabStart = $('#rabbit').offset().top
                    let rabEnd = rabStart+116
                    if ( (rabStart) <= y && y <= rabEnd ){
                        $(this).remove()
                        scoreAdd($(this).attr('id'))
                    }
                }
            }
        })
    }
}
let list = []
function scoreAdd(id){
    if (list.indexOf(id)==-1){
        list.push(id)
        let score = $("#score").text()
        score++
        $("#score").text(score);
    } 
}

function restart(){
    $(".container").html("")
    $("#score").text(0)
    $("#restart").remove()
    list = []
    start()
};
