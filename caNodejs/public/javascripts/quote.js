var randomQuote = function() 
{
      var url = '/quote/random';
      $.getJSON(url,function(data) { 
      var everything; 
      everything = "<ul style = 'list-style-type : none'>"; 
      $.each(data, function(i,item) { 
      everything += "<li> "+ data[i];
      }); 
      everything += "</ul>";  
      $("#quote-div").html(everything);    
     })  
};

var deleteQuote = function() 
{
// get the array and then search for the index of text
  var id = 0;
  
  for (var i = 0; i < quotes.length; i++)
  {
     if (quotes[i].author == "Thomas Monson")
     {
        id = i;
     }

  }  
  
  var URL = '/quote/id';
  $.ajax({
     url: URL,
     method: "DELETE"
  }).done(function(data, status, headers, config) {
    console.log("Post worked");
  }).fail(function(data, status, headers, config) {
    console.log("Post failed");
  });
};

function addQuote() {
  var formData = {author:$("#Author").val(), text: $("#quote").val()};
  console.log(formData);
  var URL = '/quote';
  $.ajax({
     url: URL,
     method: "POST",
     data: formData
  }).done(function(data, status, headers, config) {
    $("#Author").val() = "";
    $("#quote").val() = "";
    console.log("Post worked");
  }).fail(function(data, status, headers, config) {
    console.log("Post failed");
  });
}