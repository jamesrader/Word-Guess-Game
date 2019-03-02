
$(document).ready(function () {

    var wordList = ["test", "testing", "testingtest"];
    var revealedLetters = [];
    var wrongLetters = [];
    var remGuessCounter = 12;
    var winCounter = 0;
    var winner = 0;
    var letters = /[a-z]/;

    var randomNumber = Math.floor(Math.random() * wordList.length);

    var word = wordList[randomNumber];

    for (i = 0; i < word.length; i++) {
        revealedLetters.push("_");
    }

    //var wordDashes = word.replace(/[a-z]/gi, '_');
    $("#wordToGuess").html(revealedLetters);

    //Set initial message with instructions
    var message = "<div class='warning'>Guess any letter to begin!</div>";
    $("#messageArea").html(message);

    //When key is pressed...
    document.onkeyup = function (event) {

        // Determine which key was pressed
        var userGuess = event.key.toLowerCase();

        //Check for valid character
        if (userGuess.match(letters) && userGuess.length == 1) {

            //Check if guess is correct
            if (word.indexOf(userGuess) > -1) {

                //Replace appropriate underscores with guessed letter
                for (i = 0; i < word.length; i++) {
                    if (word.charAt(i) === userGuess) {
                        revealedLetters[i] = userGuess;
                    }
                }
                $("#wordToGuess").html(revealedLetters);

                //Check for the win
                if (revealedLetters.indexOf("_") === -1) {
                    //alert("WINNER!");
                    winner = 1;
                    message = "WINNER!!!";
                    $("#messageArea").html(message);
                    console.log(message);
                }
            }

            if (wrongLetters.indexOf(userGuess) === -1) {
                wrongLetters.push(userGuess);
                wrongLetters.sort();
                $("#guessedLetters").html(wrongLetters.join(', '));
                //Reset message...unless user has won
                if (winner === 0) {
                var message = ""
                $("#messageArea").html(message);
                }
            } else {
                message = "Uhhhh...you already guessed that! Try again.";
                $("#messageArea").html(message);
            }
        }

    }

});