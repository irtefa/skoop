
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

        var dimensions = results.classifiers.length;

        var max_score = 0;
        if (dimensions > 1){
            max_score = _.max(_.map(documents, function(d) {return d.scores[1];}));
        }
        var radius_scale = 15/max_score;

        var r = Raphael(document.getElementById("vis"), 700, 480);

        var chart = r.linechart(0, 0, 600, 430, ranks, [scores], {
            colors: ['#F00', '#0F0', '#FF0'],
            symbol: 'circle',
            axis: '0 1 1 0',
            axisxstep: 1,
            axisystep: 1,
            nostroke: true
        });

        var text = r.text(460,460,"");
        text.attr("font-size", 13);

        var setupChartSymbol = function(symbol, i) {
            symbol.attr("title", documents[i].title);
            symbol.attr("href", documents[i].url);
            var rad = 7;
            // set the visualization of radius size for the second dimensuib
            if (dimensions > 1){
                rad =  3 + radius_scale * documents[i].scores[1];
            }
            console.log(rad);
            symbol.attr("r", rad);
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

        // now create the axis labels
        var x_axis = "Rank";
        var y_axis = results.classifiers[0][0];
        var y_axis_low = results.classifiers[0][1];
        var y_axis_high = results.classifiers[0][2];
        var x_axis_label = r.text(285, 440, x_axis);
        x_axis_label.attr("font-size", 15);
        var y_axis_label = r.text(620,210, y_axis);
        y_axis_label.attr("font-size", 15);
        y_axis_label.rotate(90);
        var y_axis_low_label = r.text(620,410, y_axis_low);
        y_axis_low_label.attr("font-size", 14);
        var y_axis_high_label = r.text(620, 25, y_axis_high);
        y_axis_high_label.attr("font-size", 14);
        var z_label;
        if (dimensions > 1){
            z_label = r.text(110, 460, "Radius is " + results.classifiers[1][0]);
            z_label.attr("font-size", 13);
        }
    };
}
