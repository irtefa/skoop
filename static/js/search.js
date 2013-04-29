
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

  // Make a "clearer" function for clearing any given text field
  // on a Raphael chart. Call result to clear the field
  var chartTextClearer = function (textField) {
    return function() {
      textField.attr({
          text: ""
      });
    };
  };

  // Accessor to a text field for a Raphael chart
  // Initialize with the text field, then call with desired text
  var chartTextSetter = function (textField) {
    return function(newText) {
      textField.attr({
          text: "title: " + newText
      });
    };
  };

  var setupChartSymbol = function(symbol) {
      symbol.attr("title", results[j]);
      var setTitle = chartTextSetter(text);
      symbol.hover(function(e){
          var title = this.attrs.title.title;
          setTitle(title);
      }, chartTextClearer(text));
  };

  for (var j = 0; j <chart.symbols[0].length; j++){
      setupChartSymbol(chart.symbols[0][j]);
  }
};


$('.search-bar').keypress(function (e) {

  // Only react to 'Enter'
  if (e.which != 13) {
    return;
  }

  // Get data from server, then make a visualization with it
  e.preventDefault();
  query = $('.search-bar').val();
  $.ajax({
      url: '/search?query=' + query,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: populateVizData
  });
});
