var DESKTOP_NAVBAR_HEIGHT = 110;
var DESKTOP_NAVBAR_HEIGHT_SMALL = 80;
var MOBILE_NAVBAR_HEIGHT = 55;
var GREETING_TOP_OFFSET_PERCENTAGE = 0.34;    
var GREETING_NUDGE_PERCENTAGE = 0.24;
var WIDTH_MAIN_CUTOFF_POINT = 800;
var greetingTop;
var hiimTop;
var bangTop;

$(document).ready(function () {
  initialize();
});

$(window).resize(function () {
  initialize();
});

$(window).load(function() {
  $('#greeting').hide();
  $('#navigation-bar').hide();
  $('#all-container').css('visibility', 'visible');

  $('#initial').fadeOut(1000, "linear", function() {
    $('#greeting').fadeIn(2000, "easeOutCubic");
    $('#navigation-bar').slideToggle(1000);
    $('body').css("position", 'static');
  });

  $('#navigation-bar-links-mobile').click(function(event) {
    $('#mobile-navigation-bar').slideToggle('fast');
  });
 }); 


function initialize() {
  var currentWindowWidth = $('body').innerWidth();
  if (currentWindowWidth > WIDTH_MAIN_CUTOFF_POINT) {
    initializeDesktop();
  } else {
    mobile();
    $(window).unbind('scroll');
    $('#footer').css('bottom', "0px");
  }
}


function initializeDesktop() {
  var $window = $(window);
  var $navbar = $('#navigation-bar');
  var $main = $('#main');
  var $mainFirst = $('#main-first');
  var $mainSecond = $('#main-second');
  var $greeting = $('#greeting');
  var $introOne = $('#introduction-one');
  var $hi = $('#hiim');
  var $bang = $('#bang');
  var $contact = $('#contact');
  var $contactOverlay = $('#contact-overlay');
  var $ampersand = $('#ampersand');
  var $introTwo = $('#intro-two');
  var $quote = $('#quote');

  var $animatePreHiddenClass = $('.animate-pre-hidden');

  var $projectsSection = $('#projects')
  var $aboutSection = $('#about')
  var $contactSection = $('#contact')

  var nav = $('#navigation-bar');

  var windowWidth = $window.width();
  var windowHeight = $window.height();

  var rangeOne = (windowHeight - DESKTOP_NAVBAR_HEIGHT) * GREETING_NUDGE_PERCENTAGE;
  var rangeTwo = rangeOne + 250;

  $window.unbind('scroll');
  $window.scroll(onDesktopScroll);
  layoutElements();
  setupListeners();

  function layoutElements() {
    $navbar.data('size', 'big');
    $navbar.height(DESKTOP_NAVBAR_HEIGHT + "px");

    $main.height((windowHeight + rangeTwo) + "px");
    $mainFirst.css('top', '0px');
    $mainFirst.height(windowHeight * 1.2);
    $mainFirst.show();

    $mainSecond.css('top', '0px');
    $mainSecond.height(windowHeight * 1.2);

    $greeting.css('top', windowHeight * GREETING_TOP_OFFSET_PERCENTAGE);
    $greeting.css('font-size', Math.min((windowWidth / 8.2), (windowHeight / 5.2)) + "px" );
    $greeting.css('left', ((windowWidth / 2) - ($greeting.width() / 2)) + "px" );

    $introOne.css('top', windowHeight * 0.1);

    $hi.width($greeting.width() / 4);
    $hi.css('top', windowHeight * GREETING_TOP_OFFSET_PERCENTAGE * 0.6);
    $hi.css('left', $greeting.position().left - ($hi.width() / 1.2) );

    $bang.width($greeting.width() / 9);
    $bang.css('top', windowHeight * GREETING_TOP_OFFSET_PERCENTAGE * 1.0);
    $bang.css('left', $greeting.position().left + $greeting.width() + $bang.width() / 3 );

    $contact.height(windowHeight);
    $contactOverlay.height(windowHeight);

    greetingTop = $greeting.position().top;
    hiimTop = $hi.position().top;
    bangTop = $bang.position().top;

    $hi.css('opacity', 0);
    $bang.css('opacity', 0);
    $ampersand.css('opacity', 0);
    $introTwo.css('opacity', 0);
    $hi.css('display', '');
    $bang.css('display', '');

    $animatePreHiddenClass.css({
      'visibility' : 'hidden',
    });
    $('.slided').removeClass('slided');

    setCoverElementsPositions($(this).scrollTop());
    fadeInElementsIfVisible();
  }

  function setupListeners() {
    $('#personal-logo').click(function (event) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: 0
      }, 1000, 'easeOutCubic');
    });
    $('#homelink').click(function (event) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $("#main").offset().top
      }, 1000, 'easeOutCubic');
    });
    $('#projectlink').click(function (event) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $("#projects").offset().top
      }, 1000, 'easeOutCubic');
    });
    $('#aboutlink').click(function (event) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $("#about").offset().top
      }, 1000, 'easeOutCubic');
    });
    $('#contactlink').click(function (event) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $("#contact").offset().top
      }, 1000, 'easeOutCubic');
    });
    $('#portrait-container img').mouseover(function() { 
      $('#portrait-container').removeClass('animated bounce');
      setTimeout(function() {
        $('#portrait-container').addClass('animated bounce');
      }, 10);
    });
  }

  function onDesktopScroll() {
    var currentScrollPosition = $(this).scrollTop();

    // 1. Cover parallax effects!
    setCoverElementsPositions(currentScrollPosition);

    // 2, Fade in css animations
    fadeInElementsIfVisible();

    // 3. Bounce portrait!
    if ($quote.visible(true)) {
      $('#portrait-container').delay(100).queue( function() {
        $(this).addClass('animated bounce');
      });
    }
    
    // 4. Nav bar sizing switch
    if (currentScrollPosition > ($main.height() - DESKTOP_NAVBAR_HEIGHT + 30) ) {
      if (nav.data('size') == 'big') {
        nav.data('size', 'small').stop().animate({
          height: DESKTOP_NAVBAR_HEIGHT_SMALL + 'px'
        }, 600);
        $('.cl-effect-13 a').stop().animate({
          marginTop: '4.8%'
        }, 600);
        $('#navigation-bar-overlay').stop().animate({
          opacity: '0.94'
        }, 600);
      }
    } else {
      if (nav.data('size') == 'small') {
        nav.data('size','big').stop().animate({
          height: DESKTOP_NAVBAR_HEIGHT + 'px'
        }, 600);
        $('.cl-effect-13 a').stop().animate({
          marginTop: '8%'
        }, 600);
        $('#navigation-bar-overlay').stop().animate({
          opacity: '1'
        }, 600);
      }
    }

    // 5. Navigation bar
    if (currentScrollPosition < $projectsSection.position().top - DESKTOP_NAVBAR_HEIGHT_SMALL) {
      if (!$('#homelink').hasClass('linkactive')) {
        $('.linkactive').removeClass('linkactive');
        $('#homelink').addClass('linkactive');
      }
    } else if (currentScrollPosition < $aboutSection.position().top - DESKTOP_NAVBAR_HEIGHT_SMALL) {
      if (!$('#projectlink').hasClass('linkactive')) {
        $('.linkactive').removeClass('linkactive');
        $('#projectlink').addClass('linkactive');
      }
    } else if (currentScrollPosition < $contactSection.position().top - DESKTOP_NAVBAR_HEIGHT_SMALL) {
      if (!$('#aboutlink').hasClass('linkactive')) {
        $('.linkactive').removeClass('linkactive');
        $('#aboutlink').addClass('linkactive');
      }
    } else {
      if (!$('#contactlink').hasClass('linkactive')) {
        $('.linkactive').removeClass('linkactive');
        $('#contactlink').addClass('linkactive');
      }
    }
  }

  function setCoverElementsPositions(currentScrollPosition) {
    if (currentScrollPosition < rangeOne) {
      $greeting.css('top', 
        ((windowHeight * GREETING_TOP_OFFSET_PERCENTAGE) - (currentScrollPosition / 4.0) ) + "px");
      greetingTop = $('#greeting').position().top;
      $mainSecond.css('top', '0px');
      $hi.css('top', hiimTop);
      $bang.css('top', bangTop);

      $hi.css('opacity', 0);
      $bang.css('opacity', 0);
      $ampersand.css('opacity', 0);
      $introTwo.css('opacity', 0);
    } else if (currentScrollPosition < rangeTwo) {      
      $hi.css('opacity', 1);
      $bang.css('opacity', 1);
      $ampersand.css('opacity', 1);
      $introTwo.css('opacity', 1);
      $greeting.css('opacity', 1);

      // move the pixelated triangles with respect to the end of the first range
      var delta = currentScrollPosition - rangeOne;
      $mainSecond.css('top', ( -1 * delta / 3.2) + "px");
    } else {    

      // move the pixelated triangles with respect to the end of the FIRST range
      var previousDelta = currentScrollPosition - rangeOne;
      $mainSecond.css('top', ( -1 * previousDelta / 3.2) + "px");

      // Other movements are with respect to the SECOND, this rage
      var currentDelta = currentScrollPosition - rangeTwo;
      $greeting.css('top', (parseFloat(greetingTop) + -1 * currentDelta / 3.2) + "px");
      $hi.css('top', (parseFloat(hiimTop) + -1 * currentDelta / 3.2) + "px");
      $bang.css('top', (parseFloat(bangTop) + -1 * currentDelta / 3.2) + "px");

      $greeting.css('opacity', 1 - (currentDelta * 0.0015) );
      $hi.css('opacity', 1 - (currentDelta * 0.0015) );
      $bang.css('opacity', 1 - (currentDelta * 0.0015) );
    }
    var opacityValue = 1 - currentScrollPosition / windowHeight * 8;
    $mainFirst.css('opacity', opacityValue);
  }

  function fadeInElementsIfVisible() {
    $animatePreHiddenClass.each(function(i, el) {
      if ($(el).parent().visible(true) && !$(el).hasClass("slided")) {
        $(el).css('visibility', '');
        if ($(el).hasClass('from-left')) {
          $(el).addClass("slided animation-delay fadeInLeft"); 
        } else {
          $(el).addClass("slided animation-delay fadeInRight"); 
        }
      } 
    });
  }
}

function mobile() {
  $('#mobile-navigation-bar').hide();

  var currentWindowWidth = $(window).width();
  var currentWindowHeight = $(window).height();

  $('#navigation-bar').height( MOBILE_NAVBAR_HEIGHT + "px" );

  $('#main').height( (currentWindowHeight / 1.0) + "px" );

  $('#main-first').hide();

  $('#main-second').height( currentWindowHeight );
  $('#main-second').css('top', '0px');

  $('#greeting').css('font-size', Math.min((currentWindowWidth / 6.2), (currentWindowHeight / 4.9)) + "px" );
  $('#greeting').css('left', ((currentWindowWidth / 2) - ($('#greeting').width() / 2)) + "px" );

  $('#hiim').css('display', 'none');
  $('#bang').css('display', 'none');

  $('#ampersand').css('display', '');
  $('#intro-two').css('display', '');

  $('#greeting').css('opacity', 1 );
  $('#greeting').css('top', (($('#main').height() - $('#greeting').height() ) / 2.0) * 1.045);

  $('#contact').height( currentWindowHeight );
  $('#contact-overlay').height( currentWindowHeight );

  $('.animate-pre-hidden').css({
      'visibility' : '',
    });

  // Force navigation bar opacity to 1
  $('#navigation-bar-overlay').css('opacity', "1");


  $('#mhomelink').click( function () {
      $('html, body').stop().animate({
        scrollTop: $("#main").offset().top
    }, 1000);
    $('#mobile-navigation-bar').hide();
    return false;
    });
    $('#mprojectlink').click( function () {
      $('html, body').stop().animate({
        scrollTop: $("#projects").offset().top
    }, 1000);
    $('#mobile-navigation-bar').hide();
    return false;
    });
    $('#maboutlink').click( function () {
      $('html, body').stop().animate({
        scrollTop: $("#about").offset().top
    }, 1000);
    $('#mobile-navigation-bar').hide();
    return false;
    });
    $('#mcontactlink').click( function () {
      $('html, body').stop().animate({
        scrollTop: $("#contact").offset().top
    }, 1000);
    $('#mobile-navigation-bar').hide();
    return false;
    });
};

function mobileScroll (e) {
  //$('html').unbind('mousewheel');
}