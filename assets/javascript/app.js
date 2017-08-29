var topics = ["XCOM 2", "Super Mario", "Sonic Mania", "Persona 5", "Street Fighter V", "Horizon Zero Dawn", "The Last of Us", "Breath of the Wild", "Uncharted 4", "Monster Hunter"];

// Initiates Giphy API, clears out gifs, and generates future gifs
function displayGameGif() {

	var game = $(this).attr("data-game");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        game + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
		var results = response.data;
		$("#topics").empty();

		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div class='item'>");

			var rating = results[i].rating;

			var p = $("<p>").text("Rating: " + rating);

			var gameImage = $("<img>");

			gameImage.attr({
				src : results[i].images.fixed_height_still.url,
				"data-still" : results[i].images.fixed_height_still.url,
				"data-animate" : results[i].images.fixed_height.url,
				"data-state" : "still",
				class: "playPause"
			});		

			gifDiv.prepend(gameImage);
			gifDiv.prepend(p);

			$("#topics").prepend(gifDiv);
			}
	});	  
}

// Renders Initial Ten buttons
function renderButtons() {

	$("#topicButtons").empty();

	for (var i = 0; i < topics.length; i++) {

	  var a = $("<button>");
	  a.addClass("game");
	  a.attr("data-game", topics[i]);
	  a.text(topics[i]);
	  $("#topicButtons").append(a);
	}
}


// Reacts to clicks on Gif for Play and Pause functions
$(document).on("click", ".playPause", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
     	$(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


// Reacts to clicks on Submission Button to add new Game Gifs
$("#addTopic").on("click", function(event) {
	event.preventDefault();
	var game = $("#topic-input").val().trim();
	topics.push(game);
	renderButtons();
});

$(document).on("click", ".game", displayGameGif);

renderButtons();