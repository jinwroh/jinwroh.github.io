var chromeSmoothScroll = function(){

    var settings = {
        counter            : 0,
        minVal             : 0,
        maxVal             : $(window).height(),
        scrolling          : null,
        speed              : 80,
        offset             : 50,
        scrollHappen       : false,
        animTimeOut        : 20,
        mainTriggerElem    : 'html',
        animateTriggerElem : 'html, body',
        tempPos            : 0,
        animating          : false,
        updatedMaxVal      : false
    },

    init = function(){
        console.log("1?asdasdvasv")
        if( !isChrome() ) {
            return false;
        }
        if  (/Mac/.test(navigator.userAgent)) {
            return false;
        }

        $(settings.mainTriggerElem).bind('mousewheel', function(e){ 

            e.preventDefault();
            updateMaxVal();

            if( settings.scrollHappen == false && $(window).scrollTop() != 0 ) {
                updateCounter();
            }
            settings.scrollHappen = true;

            if (Math.abs(settings.counter - ($(window).scrollTop() / settings.offset)) > 9 ) {
                updateCounter();
            }


            if( e.originalEvent.wheelDelta  > 0 ) {
                settings.counter--;
            }
            else if( e.originalEvent.wheelDelta  < 0 ) {
                settings.counter++;
            }


            if( settings.counter < settings.minVal ) {
                settings.counter = 0;
            }
            else if( settings.counter * settings.offset > settings.maxVal ) {
                settings.counter = settings.maxVal / settings.offset;
            }

            if( settings.tempPos != settings.counter ) {
                doScroll();
            }
        });

        keyboard();
    },

    updateMaxVal = function(){
        settings.maxVal = $(document).height() < $(window).height() ? $(window).height() : $(document).height();
        settings.updatedMaxVal = true;
    },

    updateCounter = function(){
        settings.counter = $(window).scrollTop() / settings.offset;
    },

    doScroll = function(){
        clearTimeout(settings.scrolling);
        settings.scrolling = setTimeout(function(){
            settings.animating = true;
            $(settings.animateTriggerElem).stop().animate({ 
                scrollTop: settings.counter * settings.offset 
            }, settings.speed, 
            function(){ 
                settings.tempPos = settings.counter; 
                settings.animating = false;
            });
        }, settings.animTimeOut);
    },

    isChrome = function(){
        return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    },

    keyboard = function(){
        $(settings.mainTriggerElem).keydown(function (e) {
            switch (e.which) {
                case 38:
                    $(settings.animateTriggerElem).stop().animate({
                        scrollTop: $(window).scrollTop() - settings.offset * 2
                    }, settings.speed);
                    break;

                case 40:
                    $(settings.animateTriggerElem).stop().animate({
                        scrollTop: $(window).scrollTop() + settings.offset * 2
                    }, settings.speed);
                    break;
            }

            if(e.which == 38 || e.which == 40) return false;
        });
    };

    return { 
        init : init,
        updateCounter : updateCounter
    };
}();