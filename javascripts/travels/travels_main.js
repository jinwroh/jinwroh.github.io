var WIDTH_MAIN_CUTOFF_POINT = 800;

$( document ).ready( function () {
	initialize();
});

$( window ).resize( function () {
	initialize();
});

$( window ).load( function() {

	$('#navigation-bar').hide();
	$('#container').hide();

	$('#all-container').css('visibility', '');
	
	$('#initial').fadeOut(1000, "linear", function() {
		$('#container').fadeIn();
		$('#navigation-bar').slideToggle(1000);
		$('body').css("overflow-y", '');
		$('#navigation-bar-links-mobile').click( function(event) {
			$('#mobile-navigation-bar').slideToggle('fast');
		});
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