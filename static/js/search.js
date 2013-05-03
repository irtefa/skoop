
/**
 * The list of usable visualizations
 * {visname: {name:, visualizer:}, ...}
 */
var visualizations =  {
    scatterplot: {
        name: 'Scatter Plot',
        visualizer: new scatterplot()
    }
};

// when the user changes query the same vis they were viewing will be displayed
var current_vis = 'scatterplot';

// initialize the visualization bar
_.each(visualizations, function(vis, key){
    // if this is the first one mark it as preselected
    if (key === current_vis){
        $("#vis-select").append('<option value="' + key + '"selected>' + vis.name + '</option>');
    }
    else {
        $("#vis-select").append('<option value="' + key + '">' + vis.name + '</option>');
    }
});

// user can change the visualization without requering
$("#vis-select").change(function(e){
    $("#vis").empty();
    var vis = getvis();
    vis.populateVizData(results);
});

/**
 * get the visualization from the form that the user selects
 * @return {visualization object} the instantiated visualization that the user has selected
 */
function getvis(){
    var vis = $("#vis-select").val();
    return visualizations[vis].visualizer;
}

/*
 * Bind the visualization and query events to the enter key;
 */
$('input').keypress(function (e) {
    // Only react to 'Enter'
    if (e.which != 13) {
        return;
    }
    // check that the query bar is not empty
    if ($(".search-bar")[0].value === ''){
        return;
    }

    // make sure they select a classifier
    if ($("#classifier-select").val() === null){
        return;
    }
    // make sure the bars have something in them
    var exit = false;
    _.each($("#classifier-select").val(), function(id){
        if ($("#" + id).children()[0].value === ''){
            exit = true;
        }
    });
    if (exit) {return;}

    $('.search-title').css('margin-top', '10px');

    // Get data from server, then make a visualization with it
    e.preventDefault();
    query = $('.search-bar').val();

    // Clear the existing visualization, create a spinner
    $("#vis").empty();
    $("#vis-select").hide();
    var removeSpinner = spinner("vis", 70/8, 120/8, 12, 25/8, "#000");
    $.ajax({
        type: 'POST',
        url: '/search',
        data: $('.search-form').serialize(),
        success: function(results) {
            removeSpinner();
            var vis = getvis();
            $("#vis-select").show();
            // show the visualization menu
            vis.populateVizData(results);
        }
    });
});

$(".class-form").hide();
$("#vis-select").hide();

$("#classifier-select").change(function(e){
    selected_classifs = $(this).val();
    $(".class-form").hide();
    _.each(selected_classifs, function(index){
        $("#" + index).show();
    });
});



