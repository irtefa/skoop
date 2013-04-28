$('.search-bar').keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
    query = $('.search-bar').val();
        $.ajax({
            url: '/search?query=' + query,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function(results) {
                console.log(results);
                var ranks = [];
                var scores = [];
                for (var i = 0; i < results.length; i++){
                    ranks.push(results[i].rank);
                    scores.push(results[i].score);
                }

                var r = Raphael(document.getElementById("scatterplot"), 700, 640);

                var chart = r.linechart(0, 0, 600, 500, ranks, [scores], {
                    colors: ['#F00', '#0F0', '#FF0'],
                    symbol: 'circle',
                    axis: '0 1 1 0',
                    axisxstep: 1,
                    nostroke: true
                });

                var text = r.text(260,510,"");

                for (var j = 0; j <chart.symbols[0].length; j++){
                    chart.symbols[0][j].attr("title", results[j]);
                    chart.symbols[0][j].hover(function(e){
                        var title = this.attrs.title.title;
                        text.attr({
                            text: "title: " + title
                        });
                    }, function(e){
                        text.attr({
                            text: ""
                        });
                    });
                }
                    }
                });
  }
});
