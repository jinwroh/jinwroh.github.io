var WIDTH_MAIN_CUTOFF_POINT = 800;

$( document ).ready( function () {
	initialize();
});

$( window ).resize( function () {
	initialize();
});

$( window ).load( function() {
  $('#navigation-bar').hide();
  $('#main').hide();
  $('#projects-menu').hide();
  $('#all-container').css('visibility', '');

  $('#initial').fadeOut(1000, "linear", function() {
    $('#main').fadeIn();
    $('#navigation-bar').slideToggle(1000);
    $('#navigation-bar-links-mobile').click( function(event) {
      $('#mobile-navigation-bar').slideToggle('fast');
    });
  });

	var isMousedOver;
	var hideDropdown = function(a) {
        setTimeout( function() {
            if (isMousedOver) return;
            $('#projects-menu').slideUp("medium");
            $("#projectslink").removeClass('linkactive');
        }, 500);
    }
	$("#projectslink").hover(
        function(){
            $('#projects-menu').stop(true,true).slideDown("medium");
            isMousedOver = true;
            $("#projectslink").addClass('linkactive');
            var that = this;
            $('#projects-menu').data("mouseoutfn", function() { hideDropdown(that) });
        },
        function(){
            isMousedOver = false;
            hideDropdown(this);
        }
    );
    $('#projects-menu').hover(
        function() {
            isMousedOver = true;
        },
        function() {
            isMousedOver = false;
            $(this).data("mouseoutfn")();
        }
    );

	$('#projectslink').click( function(event) {
		event.preventDefault();
		$(this).toggleClass('linkactive');
		$('#projects-menu').slideToggle();
	});

	$('#link1').click( function () {
		$('html, body').stop().animate({
		    scrollTop: $("#in").offset().top - 70
		}, 1000);
		$('#mobile-navigation-bar').hide();
		return false;
	});
	$('#link2').click( function () {
		$('html, body').stop().animate({
		    scrollTop: $("#sa").offset().top - 70
		}, 1000);
		$('#mobile-navigation-bar').hide();
		return false;
	});
	$('#link3').click( function () {
		$('html, body').stop().animate({
		    scrollTop: $("#us").offset().top - 70
		}, 1000);
		$('#mobile-navigation-bar').hide();
		return false;
	});
	$('#link4').click( function () {
		$('html, body').stop().animate({
		    scrollTop: $("#eu").offset().top - 70
		}, 1000);
		$('#mobile-navigation-bar').hide();
		return false;
	});
 });


function initialize() {

	var currentWindowWidth = $('body').innerWidth();

	if (currentWindowWidth > WIDTH_MAIN_CUTOFF_POINT) {
		//desktop();
	}
	else {
		//mobile();
		$('#mobile-navigation-bar').hide();

	}
};