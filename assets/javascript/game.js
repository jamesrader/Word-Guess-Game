
$(document).ready(function () {

    var wordArray = [{ word: "song girls", image: "SongGirls.jpg", audio: "Tusk.mp3", desc: "<p>The USC Song Girls are often referred to as “Ambassadors of the University of Southern California.” Each year, the Song Girls learn and perfect new choreography for over thirty routines to keep their performances fresh, new and exciting. An average “behind the scenes” week consists of practices five days a week, an average of three hours per day.</p><p>Public performances include appearances at all football games, men’s and some women’s basketball games and other Trojan athletic sporting events, including “jock rallies” at Heritage Hall on the Friday afternoons before all USC home football games. In addition, the Song Girls perform at alumni, charitable, University and special events throughout the calendar year, including during the summer. The dedication, loyalty and quest for continual improvement are hallmarks of the USC Song Girl program. The USC Song Girls are truly dance athletes with a special mission of spirit and good will that is at the same time broad and focused in continuing the Tradition of Trojan Excellence.</p>" },
    { word: "coliseum", image: "Coliseum.jpg", audio: "FightOn.mp3", desc: "<p>The Los Angeles Memorial Coliseum is located in Exposition Park, which is owned by the State of California, and across the street from USC. The Coliseum is jointly owned by the State of California, Los Angeles County, City of Los Angeles and is managed and operated by the Auxiliary Services Department of the University of Southern California. From 1959 to 2016, the Los Angeles Memorial Sports Arena was located adjacent to the Coliseum; the Sports Arena was closed in March 2016 and demolished between August and October 2016. Banc of California Stadium, a soccer-specific stadium and home of Major League Soccer's Los Angeles FC, was constructed on the former Sports Arena site and opened in April 2018.</p><p>The Coliseum will be the first stadium to have hosted the Summer Olympics three times, in 1932, 1984, and the future Summer Olympics in 2028, after the International Olympic Committee confirmed a deal it established on July 31, 2017, during the 131st IOC Session.</p><p>The stadium also was the temporary home of the Los Angeles Dodgers of Major League Baseball from 1958 to 1961 and was the host venue for games 3, 4, and 5 of the 1959 World Series. It was the site of the First AFL-NFL World Championship Game, later called Super Bowl I, and Super Bowl VII. Additionally, it has served as a home field for a number of other teams, including the Los Angeles Raiders of the NFL, and UCLA Bruins football. It was declared a National Historic Landmark on July 27, 1984, the day before the opening ceremony of the 1984 Summer Olympics.</p>" },
    { word: "tommy trojan", image: "DrumMajor.jpg", audio: "Conquest.mp3", desc: "<p>As any true USC football fan knows, it’s not game time until the Trojan Marching Band’s drum major declares battle by stabbing his iconic sword into the playing field. Since 1992, the same sword has kicked off pre-game festivities and led The Spirit of Troy into countless “Conquest” verses.</p><p>Many fans make the mistake of thinking the drum major is named 'Tommy Trojan.' However, Tommy Trojan is the name of the iconic statue at the center of the USC campus.</p>" },
    { word: "marching band", image: "TrojanMarchingBand.jpg", audio: "TributeToTroy.mp3", desc: "<p>The Spirit of Troy, also known as the University of Southern California Trojan Marching Band (TMB), represents USC at various collegiate sports, broadcast, popular music recording, and national public appearance functions.</p><p>The Spirit of Troy is the only collegiate band to have two platinum records. The group has performed with numerous celebrities including John Williams, Michael Jackson, Diana Ross, Radiohead, Beyoncé, Doc Severinsen, George Clinton, Fleetwood Mac, The Three Tenors, John Dolmayan, Shavo Odadjian, Odesza, and The Offspring. In addition, the band has performed for five U.S. presidents, at the Summer Olympics, and on the Academy Awards, Grammy Awards, and the season 7 finale of American Idol.</p><p>A contingent of the band has performed at every USC football game, home and away, since 1987. It also makes an international trip at least every other year.</p>" },
    { word: "traveler", image: "Traveler.jpg", audio: "Conquest.mp3", desc: "<p>Traveler, the noble white horse that appears at all USC home football games with a Trojan warrior astride, is one of the most famous college mascots.</p><p>Traveler first made an appearance at USC football games in 1961 in the home opener versus Georgia Tech. Bob Jani, USC’s director of special events, and Eddie Tannenbaum, a junior at USC, had spotted Richard Saukko riding his white horse, Traveler I, in the 1961 Rose Parade. They persuaded Saukko to ride his white horse around the Coliseum during USC games, serving as a mascot. Ever since, whenever USC scores, the band plays “Conquest” and Traveler gallops around the Coliseum.</p>" }];
    var revealedLetters = [];
    var wrongLetters = [];
    var displayLetters = [];
    var remGuessCounter = 5;
    var winCounter = 0;
    var winner = 0;
    var letters = /[a-z]/;
    var correct = 0;
    var randomNumber = 0;
    var word = "";
    var wordList = [];
    var currentSong = "";
    var audio = $("#winMusic");
    var currentDesc = "";

    //Hide buttons on initial launch.
    //CSS Visibility - 'hidden' and 'visible' maintains vertical spacing.
    $("#playAgain").css("visibility", "hidden");
    $("#stopMusic").css("visibility", "hidden");

    //Play Again button
    $("#playAgain").on("click", function () {
        $("#playAgain").css("visibility", "hidden")
        resetWord();
    })

    //Stop music button
    $("#stopMusic").on("click", function () {
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
            for (i = 0; i < wordArray.length; i++) {
                wordList.push(wordArray[i].word);
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
            if (word[i] != " ") {
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

        displayLetters = [];
        wrongLetters = [];
        $("#guessedLetters").html(wrongLetters.join(' '));
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
                    winner = 1;
                    winCounter++;
                    message = "WINNER!!!";
                    $("#messageArea").html(message);
                    $("#messageArea").css("visibility", "visible");
                    $("#winCounter").html(winCounter);

                    for (i = 0; i < wordArray.length; i++) {
                        if (wordArray[i].word === word) {
                            currentSong = wordArray[i].audio;
                            currentImage = wordArray[i].image;
                            currentDesc = wordArray[i].desc;
                        }
                    }
                    //Song, image and description
                    $("#winMusic").attr("src", "assets/music/" + currentSong);
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
                displayLetters.push(userGuess.toUpperCase());
                displayLetters.sort();
                $("#guessedLetters").html(displayLetters.join(' '));

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
                        $("#playAgain").css("visibility", "visible");
                    }
                }

                //Reset message...unless user has won
                if (winner === 0) {
                    var message = ""
                    $("#messageArea").css("visibility", "hidden");
                }

            } else {
                //Already guessed
                message = "Uhhhh...you already guessed that! Try again.";
                $("#messageArea").html(message);
                $("#messageArea").css("visibility", "visible");
            }
            correct = 0;
        }
    }

    //Start it all
    resetWord();
});