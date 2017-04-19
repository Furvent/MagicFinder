$(window).load(function () {
    $('#myModal').modal('show');
    
    // on off boxe
    // open
    $('.off-btn').on('click', function() {
        var plusBtn = $(this);
        var boxeBloc = $(this).parent('.boxe');
        var heightBoxe = $(window).height() - 90;
        
        boxeBloc.removeClass('boxe-off');
        boxeBloc.addClass('boxe-on');
        boxeBloc.height(heightBoxe);
    });
    // close
    $('.on-btn').on('click', function() {
        var moinsBtn = $(this);
        var boxeBloc = $(this).parent('.boxe');
        
        boxeBloc.removeClass('boxe-on');
        boxeBloc.addClass('boxe-off');
        
        if (boxeBloc.attr("id") == "stock") {
            boxeBloc.css('height', '55px');
        } else if (boxeBloc.attr("id") == "achat") {
            boxeBloc.css('height', '80px');
        } else {
            boxeBloc.css('height', '50px');
        }
        
        console.log(boxeBloc.height());
    });
});
