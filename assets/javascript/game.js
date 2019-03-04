
$(document).ready(function () {

    var gameArray = ["songgirls", "coliseum", "testingtest"];
    var gameObject = [{word:"song girls", image:"SongGirls.jpg", audio:"Tusk.mp3"},
                            {word:"coliseum", image:"Coliseum.jpg", audio:"FightOn.mp3"},
                        {word:"tommy trojan", image:"DrumMajor.jpg", audio:"Conquest.mp3"},
                        {word:"marching band", image:"TrojanMarchingBand.jpg", audio:"TributeToTroy.mp3"},
                        {word:"traveler", image:"Traveler.jpg", audio:"Conquest.mp3", desc:"<p>Traveler, the noble white horse that appears at all USC home football games with a Trojan warrior astride, is one of the most famous college mascots.</p><p>Traveler first made an appearance at USC football games in 1961 in the home opener versus Georgia Tech. Bob Jani, USC’s director of special events, and Eddie Tannenbaum, a junior at USC, had spotted Richard Saukko riding his white horse, Traveler I, in the 1961 Rose Parade. They persuaded Saukko to ride his white horse around the Coliseum during USC games, serving as a mascot. Ever since, whenever USC scores, the band plays “Conquest” and Traveler gallops around the Coliseum.</p>"}];
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
    var currentSong = "";
    var audio= $("#winMusic");
    var currentDesc = "";

    //Hide buttons on initial launch.
    //CSS Visibility - 'hidden' and 'visible' maintains vertical spacing.
    $("#playAgain").css("visibility", "hidden");
    $("#stopMusic").css("visibility", "hidden");

    //Start it all
    resetWord();

    //Play Again button
    $("#playAgain").on("click", function () {
        $("#playAgain").css("visibility", "hidden")
        resetWord();
    })

    //Stop music button
    $("#stopMusic").on("click", function() {
        audio[0].pause();
        message = "Stop THIS music?!?  OK...way to go, bruin.";
        $("#messageArea").html(message);
        $("#messageArea").css("visibility", "visible");
        $("#stopMusic").css("visibility", "hidden");
    })

    function resetWord() {

        //Reset flag
        winner = 0;

        //Replenish disposable word list after all words have been played
        if (wordList.length < 1) {
            //for (i = 0; i < gameArray.length; i++) {
                //wordList.push(gameArray[i]);
            //}
            for (i=0; i < gameObject.length; i++) {
                wordList.push(gameObject[i].word);
            }
        }

        //Choose word from list based on a random number
        randomNumber = Math.floor(Math.random() * wordList.length);
        word = wordList[randomNumber];

        //Remove this word from list so it can't be played again
        wordList.splice(randomNumber, 1);

        //Start with no letters revealed, of course
        revealedLetters = [];
        for (i = 0; i < word.length; i++) {
            if (word[i] != " "){
            revealedLetters.push("_");
            } else {
                revealedLetters.push(" ");
            }
        }
        $("#wordToGuess").html(revealedLetters);

        //Set initial message with instructions
        var message = "<div class='warning'>Guess any letter to begin!</div>";
        $("#messageArea").html(message);
        $("#messageArea").css("visibility", "visible");

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
                    $("#messageArea").css("visibility", "visible");
                    $("#winCounter").html(winCounter);

                    for (i=0; i<gameObject.length; i++){
                        if (gameObject[i].word === word){
                            currentSong = gameObject[i].audio;
                            currentImage = gameObject[i].image;
                            currentDesc = gameObject[i].desc;
                        }
                    }
                    $("#winMusic").attr("src", "assets/music/" + currentSong);
                    //$("#winMusic").attr("src", "assets/music/TributeToTroy.mp3");
                    audio[0].play();
                    $("#mainImage").attr("src", "assets/images/" + currentImage)
                    $("#description").html(currentDesc);

                    
                    $("#stopMusic").css("visibility", "visible");
                    $("#playAgain").css("visibility", "visible");
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
                        $("#messageArea").css("visibility", "visible");
                        winner = -1;
                        $("#playAgain").show();
                    }
                }

                //Reset message...unless user has won
                if (winner === 0) {
                    var message = ""
                    //$("#messageArea").html(message);
                    $("#messageArea").css("visibility", "hidden");
                }

            } else {
                message = "Uhhhh...you already guessed that! Try again.";
                $("#messageArea").html(message);
            }
            correct = 0;
        }
    }
});