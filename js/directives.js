/* Directives */


angular.module('Spice.directives', [])
.directive('scrollOnClick', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.on('click', function() {
                $("body").animate({scrollTop: $(attrs.href).offset().top-100}, "slow");
            });
        }
    };
})
.directive('header', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            $(window).on('scroll', function() {
                var y = $(window).scrollTop();
                if(y > 550){
                    elm.addClass('header2');
                }else {
                    elm.removeClass('header2');    
                }
            });
        }
    };
})
.directive('slideIn', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            $(window).on('scroll', function() {
                var y = $(window).scrollTop();
                if(y > $(elm).offset().top-500){
                    elm.addClass('wine-in');
                }else {
                    elm.removeClass('wine-in');
                }
            });
        }
    };
})
.directive('slideUp', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            $(window).on('scroll', function() {
                var y = $(window).scrollTop();
                if(y > 80){
                    elm.addClass('header-in');
                }else {
                    elm.removeClass('header-in');
                }
            });
        }
    };
})
.directive('googleTrack', function($window){
    return{
        restrict: 'A',
        link: function(scope, elm, attr, ctrl) {
            elm.bind('click', function () {
                var tracks = attr.googleTrack.split("|");
                ga('send', 'event', tracks[0], tracks[1], tracks[2], tracks[3]);
            });
        }
    };
});
