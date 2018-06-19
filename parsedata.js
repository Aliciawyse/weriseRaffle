let mypromise = d3.csv("attendees.csv").then(function (data) {


    // append list of attendees to DOM
    for (const datum of data) {
        $( "ul" ).append(`<li class="subtitle is-3" > ${datum.firstName} ${datum.lastName} ${datum.company} </li>`);
    }

    // d3 generates random numbers with a uniform distribution
    // Math.trunc returns the integer part of a number by removing any fractional digits.
    let randomNum = Math.trunc(d3.randomUniform(0, data.length)());

    console.log(randomNum);

    // use randomNum to index list of data and grab random winner
    let winner = `${data[randomNum].firstName} ${data[randomNum].lastName}`;

    return winner;

});


// starting here is code that makes list of attendees automatically scroll
var ScrollRate = .09;

function scrollDiv_init() {
    DivElmnt = document.getElementById('mylist');
    ReachedMaxScroll = false;

    DivElmnt.scrollTop = 0;
    PreviousScrollTop  = 0;

    ScrollInterval = setInterval('scrollDiv()', ScrollRate);
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

scrollDiv_init();
// end of code that makes list of attendees automatically scroll
//


// on click show winner
$( "#pickWinner" ).click(function() {

    showResults();

});



function showResults(){
    //hide list of users
    $( "ul" ).addClass("hidden");

    //show winner
    mypromise.then(function (theWinner){

        $("h1").html(`and the winner is ${theWinner}!`);

    });
    $( "h1" ).removeClass("hidden");

    //show gif
    $('#gif').css('display','block');

    //edit button's text
    $(".button").html("Ready to choose a new winner?!");
}

function restart(){

    //show list of users with previous winner removed


}

restart();


