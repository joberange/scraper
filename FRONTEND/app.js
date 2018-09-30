$.getJSON("/articles", function(data) {

    for (var i = 0; i < data.length; i++) {
      $("#articles").append(
        "<div class='card' data-id='" + data[i]._id + "'>" + "<div class='card-body'>"
         + 
         "<div class='card-title'><h3>" + data[i].title +"</h3></div>" 
         +
         "<div class='card-text'><span>" + data[i].summary + "</span><br><a href=>" + data[i].link + "</a></div></div></div>");
      }
  });
