var topics = ["XCOM 2", "Super Mario", "Sonic Mania", "Persona 5", "Street Fighter V", "Horizon Zero Dawn", "The Last of Us", "Breath of the Wild", "Uncharted 4", "Monster Hunter"];

function displayGameGif() {

	var game = $(this).attr("data-game");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        game + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {
		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div class='item'>");

			var rating = results[i].rating;

			var p = $("<p>").text("Rating: " + rating);

			var personImage = $("<img>");
			personImage.attr("src", results[i].images.fixed_height.url);

			gifDiv.prepend(personImage);
			gifDiv.prepend(p);

			$("#topics").prepend(gifDiv);
			}
	});	  
}

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

$("#addTopic").on("click", function(event) {
	event.preventDefault();
	var game = $("#topic-input").val().trim();
	topics.push(game);
	renderButtons();
});

$(document).on("click", ".game", displayGameGif);

renderButtons();