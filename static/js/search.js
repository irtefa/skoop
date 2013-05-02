
/**
 * Create a visualization from results returned by server, 
 * in response to a user query
 * @param  {array of arrays} results
 * @return {[type]}
 */
var populateVizData = function(results) {
    console.log(results);

    var documents = results.documents;

    // Get attributes from results list
    var ranks = _.pluck(documents, "rank");
    // Temporarily return just the first score for each doc
    var scores = _.map(documents, function(d) {return d.scores[0];});


    var r = Raphael(document.getElementById("scatterplot"), 700, 500);

    var chart = r.linechart(0, 0, 600, 450, ranks, [scores], {
        colors: ['#F00', '#0F0', '#FF0'],
        symbol: 'circle',
        axis: '0 1 1 0',
        axisxstep: 1,
        nostroke: true
    });

    var text = r.text(260,460,"");

    var setupChartSymbol = function(symbol, i) {
        symbol.attr("title", documents[i].title);
        symbol.attr("href", documents[i].url);
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

    $('.search-title').css('margin-top', '10px');

    // Get data from server, then make a visualization with it
    e.preventDefault();
    query = $('.search-bar').val();

    // Clear the existing visualization, create a spinner
    $("#scatterplot").empty();
    var removeSpinner = spinner("scatterplot", 70/2, 120/2, 12, 25/2, "#000");
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

$(".class-form").hide();

$("#classifier-select").change(function(e){
    selected_classifs = $(this).val();console.log(selected_classifs);
    $(".class-form").hide();
    _.each(selected_classifs, function(index){
        $("#" + index).show();
    });
});



