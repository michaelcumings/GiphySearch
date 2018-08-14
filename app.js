var topics = [
    "James Cagney", 
    "Edward G. Robinson", 
    "Charlize Theron", 
    "Joan Crawford", 
    "Mae West", 
    "Fred Astaire", 
    "Gene Kelly", 
    "Ginger Rogers", 
    "Bing Crosby", 
    "Bob Hope", 
    "Jimmy Stewart", 
    "Uma Thurman", 
    "Lawrence Fishburne", 
    "Robert Downey Jr", 
    "Patrick Swayze", 
    "Robin Wright"];
  
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";    

// Function for displaying topic buttons
function renderButtons() {

    // Deleting the topic buttons prior to adding new topic buttons
    $("#buttonsdiv").empty();

    // Looping through the array
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each actor in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("btn btn-primary actor m-1");
        // Adding a data-attribute with a value of the topic at index i
        a.attr("type", "button");
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#buttonsdiv").append(a);
    }
}
renderButtons();
    // Event listener for all button elements of class "actor"
    $(document).on("click", "button.actor", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var person = $(this).attr("data-name");
  
        // Constructing a URL to search Giphy for the name of the actor indicated
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          person + "&api_key=ff94anC1VD2oEwya48M1Ph6Yd6PqpWXq&limit=10";
  
        console.log(queryURL);
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
  
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var personImage = $("<img>");
                personImage.addClass("gif")
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-state", "still");
  
                // Appending the personImage and paragraph we created to the "gifDiv" div we created
                gifDiv.append(personImage);
                gifDiv.append(p);

  
                // Prepending the gifDiv to the "#gifsdiv" div in the HTML
                $("#gifsdiv").prepend(gifDiv);
              }
            }
          });

      });

      $(document).on("click", "img.gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      $("#newbutton").on("click", function() {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newactor = $("#newactor").val().trim();
        // The Actor from the textbox is then added to our array
        topics.push(newactor);

        // calling renderButtons which handles the processing of our topics array
        renderButtons();
      });


      
