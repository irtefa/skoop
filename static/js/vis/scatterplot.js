
/**
 * Create a visualization from results returned by server, 
 * in response to a user query
 * @param  {array of arrays} results
 */
function scatterplot(){
    this.populateVizData = function(results) {
        console.log(results);

        var documents = results.documents;

        // Get attributes from results list
        var ranks = _.pluck(documents, "rank");
        // Temporarily return just the first score for each doc
        var scores = _.map(documents, function(d) {return d.scores[0];});

        var dimensions = documents[0].scores.length;

        var r = Raphael(document.getElementById("vis"), 700, 450);

        var chart = r.linechart(0, 0, 600, 430, ranks, [scores], {
            colors: ['#F00', '#0F0', '#FF0'],
            symbol: 'circle',
            axis: '0 1 1 0',
            axisxstep: 1,
            nostroke: true
        });

        var text = r.text(260,440,"");
        text.attr("font-size", 15);

        var setupChartSymbol = function(symbol, i) {
            symbol.attr("title", documents[i].title);
            symbol.attr("href", documents[i].url);
            var rad = 20;
            // set the visualization of radius size for the second dimensuib
            if (dimensions > 1){
                rad =  20 * documents[i].scores[1];
            }
            //symbol.attr("r", rad);
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
}
