
$(document).ready(function () {



  $(document).on("click", ".delete", function () {
    console.log("I was clicked");
    var thisId = $(this).attr("data-id");

    $.ajax("/delete/" + thisId, {
      type: "PUT",
    }).then(function (data) {
      console.log(data);
      location.reload();
    });

  });
  $(document).on("click", ".save", function () {
    var thisId = $(this).attr("data-id");

    console.log("I was clicked");
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#card-title").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section

      });
  })

  $(document).on("click", "#scrape", function () {


    console.log("I was clicked");
    // location.reload();
    $.ajax({
      method: "GET",
      url: "/scrape/",

    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        location.reload();
        // Empty the notes section

      });
    })


    // Whenever someone clicks a p tag
$(document).on("click", ".saved-article", function() {
  // Empty the notes from the note section
  console.log("I was clicked")
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
     
    });
});

    //Get the Article from the saved ID
    var id 

    $(document).on("click", ".note", function (){
      var title = $(this).attr("data-title");
       id = $(this).attr("data-id");
      $(".modal-title").html(title)
      console.log(title);
      
    });

    $(document).on("click", "#save-note", function () {
      var thisId = $(this).attr("data-id");
      var title = $(this).attr("data-title");
      console.log($("#Note-Area").val());
      console.log(thisId);
      console.log("I was clicked");
      $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          // Value taken from title input
          title: title,
          // Value taken from note textarea
          body: $("#Note-Area").val()
         
        }
      })
        // With that done
        .then(function (data) {
          // Log the response
          console.log("apps.js ln 90", data);
          // Empty the notes section
  
        });
    })



  });

  // submit event for form can access id in global scope
  


