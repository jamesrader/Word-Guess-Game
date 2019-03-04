
$(document).ready(function () {

    var gameArray = ["test", "testing", "testingtest"];
    var revealedLetters = [];
    var wrongLetters = [];
    var remGuessCounter = 5;
    var winCounter = 0;
    var winner = 0;
    var letters = /[a-z]/;
    var correct = 0;
    var randomNumber = 0;
    var word = "";
    var wordList = [];

    $("#playAgain").hide();

    $("#playAgain").on("click", function () {
        //alert("RESET!");
        $("#playAgain").hide()
        resetWord();
    })

    resetWord();

    function resetWord() {
        
        //Reset flag
        winner=0;

        //Replenish disposable word list after all words have been played
        if (wordList.length < 1){
            for (i=0; i<gameArray.length; i++){
                wordList.push(gameArray[i]);
            }
        }
        
        //Choose word from list based on a random number
        randomNumber = Math.floor(Math.random() * wordList.length);
        word = wordList[randomNumber];
        console.log(word);
        
        //Remove this word from list so it can't be played again
        wordList.splice(randomNumber, 1);
        console.log(wordList);

        //Start with no letters revealed, of course
        revealedLetters = [];
        for (i = 0; i < word.length; i++) {
            revealedLetters.push("_");
        }
        $("#wordToGuess").html(revealedLetters);

        //Set initial message with instructions
        var message = "<div class='warning'>Guess any letter to begin!</div>";
        $("#messageArea").html(message);

        remGuessCounter = 5;
        $("#remGuesses").html(remGuessCounter);

        wrongLetters = [];
        $("#guessedLetters").html(wrongLetters.join(', '));
    }

    //When key is pressed...
    document.onkeyup = function (event) {

        // Determine which key was pressed
        var userGuess = event.key.toLowerCase();

        //Check for valid character
        if (userGuess.match(letters) && userGuess.length === 1 && winner === 0) {

            //Check if guess is correct
            if (word.indexOf(userGuess) > -1) {

                //Replace appropriate underscores with guessed letter
                for (i = 0; i < word.length; i++) {
                    if (word.charAt(i) === userGuess) {
                        revealedLetters[i] = userGuess;
                    }
                }
                $("#wordToGuess").html(revealedLetters);

                //Set flag
                correct = 1;

                //Check for the win
                if (revealedLetters.indexOf("_") === -1) {
                    //alert("WINNER!");
                    winner = 1;
                    winCounter++;
                    message = "WINNER!!!";
                    $("#messageArea").html(message);
                    $("#winCounter").html(winCounter);
                    $("#playAgain").show();
                }
            }

            //Add guess to 'guessed letters' list
            if (wrongLetters.indexOf(userGuess) === -1) {
                wrongLetters.push(userGuess);
                wrongLetters.sort();
                $("#guessedLetters").html(wrongLetters.join(', '));

                //Remove remaining guess, if appropriate
                if (correct === 0) {
                    remGuessCounter--;
                    $("#remGuesses").html(remGuessCounter);

                    //Check for a loss
                    if (remGuessCounter === 0) {
                        message = "Sorry...you lose.";
                        $("#messageArea").html(message);
                        winner = -1;
                        $("#playAgain").show();
                    }
                }

                //Reset message...unless user has won
                if (winner === 0) {
                    var message = ""
                    $("#messageArea").html(message);
                }
            } else {
                message = "Uhhhh...you already guessed that! Try again.";
                $("#messageArea").html(message);
            }
            correct = 0;
        } 
    }
});