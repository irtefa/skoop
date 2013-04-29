// Create a visualization from results returned by server, 
// in response to a user query
var populateVizData = function(results) {
  console.log(results);

  // Get attributes from results list
  var ranks = _.pluck(results, "rank");
  var scores = _.pluck(results, "score");


  var r = Raphael(document.getElementById("scatterplot"), 700, 640);

  var chart = r.linechart(0, 0, 600, 500, ranks, [scores], {
      colors: ['#F00', '#0F0', '#FF0'],
      symbol: 'circle',
      axis: '0 1 1 0',
      axisxstep: 1,
      nostroke: true
  });

  var text = r.text(260,510,"");

  var setupChartSymbol = function(symbol, i) {
    symbol.attr("title", results[i].title);
    symbol.attr("href", results[i].url);
    symbol.hover(function(e){
      var title = this.attrs.title;
      text.attr({
          text: title
      });
    }, function() {
      text.attr({
        text: ""
      });
    });
  };

  _.each(chart.symbols[0], setupChartSymbol);
};


$('.search-bar').keypress(function (e) {
  // Only react to 'Enter'
  if (e.which != 13) {
    return;
  }
  
  $('.search-title').css('margin-top', '0px');

  // Get data from server, then make a visualization with it
  e.preventDefault();
  query = $('.search-bar').val();

  // Clear the existing visualization, create a spinner
  $("#scatterplot").empty();
  var removeSpinner = spinner("scatterplot", 70, 120, 12, 25, "#000");
  console.log($('.search-form').serialize());
  $.ajax({
      type: 'POST',
      url: '/search',
      data: $('.search-form').serialize(),
      success: function(e) {
        removeSpinner();
        populateVizData(e);
      }
  });
});



