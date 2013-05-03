
/**
 * The list of usable visualizations
 */
var visualizations =  [
    
];


/*
 * Bind the visualization and query events to the enter key;
 */
$('input').keypress(function (e) {
    // Only react to 'Enter'
    if (e.which != 13) {
        return;
    }

    $('.search-title').css('margin-top', '10px');

    // Get data from server, then make a visualization with it
    e.preventDefault();
    query = $('.search-bar').val();

    // Clear the existing visualization, create a spinner
    $("#vis").empty();
    var removeSpinner = spinner("vis", 70/2, 120/2, 12, 25/2, "#000");
    console.log($('.search-form').serialize());
    $.ajax({
        type: 'POST',
        url: '/search',
        data: $('.search-form').serialize(),
        success: function(results) {
            removeSpinner();
            var vis = new scatterplot();
            vis.populateVizData(results);
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



