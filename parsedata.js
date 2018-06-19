let attendees;
let dataLength;
let chosenWinners = {};
let scrollRate = .09;

function getData (){
    d3.csv("attendees.csv").then(function(data) {
        attendees = data;
        dataLength = data.length;
        for (const datum of data) {
            $( "ul" ).append(`<li class="subtitle is-3" > ${datum.firstName} ${datum.lastName} ${datum.company} </li>`);
        }
        scrollDiv_init();
    });
}

function randomNumber(){
    let randomNum = Math.floor((Math.random() * dataLength) + 1);
    if(chosenWinners[randomNum]){
        randomNumber();
    } else
    {
        chosenWinners[randomNum] = randomNum;
        return randomNum;
    }
}

function showWinner(num){
    let winner = `${attendees[num].firstName} ${attendees[num].lastName}`;
    $( "ul" ).addClass("hidden");
    $("h1").html(`and the winner is ${winner}!`);
    $( "h1" ).removeClass("hidden");
    //show gif
    $('#gif').css('display','block');
    $("#pickWinner").addClass("hidden");
    $( "#pickNewWinner" ).removeClass("hidden");

}

function scrollDiv_init() {
    DivElmnt = document.getElementById('mylist');
    ReachedMaxScroll = false;
    DivElmnt.scrollTop = 0;
    PreviousScrollTop  = 0;
    ScrollInterval = setInterval('scrollDiv()', scrollRate);
}

function scrollDiv() {
    if (!ReachedMaxScroll) {
        DivElmnt.scrollTop = PreviousScrollTop;
        PreviousScrollTop++;
        ReachedMaxScroll = DivElmnt.scrollTop >= (DivElmnt.scrollHeight - DivElmnt.offsetHeight);
    }
    else {
        ReachedMaxScroll = (DivElmnt.scrollTop == 0)?false:true;
        DivElmnt.scrollTop = PreviousScrollTop;
        PreviousScrollTop--;
    }
}

$(document).ready(function(){

    getData();

    $( "#pickWinner" ).click(function() {
        let num = randomNumber();
        console.log("num", num);
        showWinner(num);
    });

    $( "#pickNewWinner" ).click(function() {
        $( "h1" ).addClass("hidden");
        $("#gif").css("display","none");
        $( "ul" ).removeClass("hidden");
        getData();
        $("#pickWinner").removeClass("hidden");
        $( "#pickNewWinner" ).addClass("hidden");
    });
});