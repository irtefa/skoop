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
            }
        });
  }
});
