;(function($, window){

  var defaults = {

    // whether to scroll to elements based on hash
    onLoad: true,

    // offset to apply to when scrolling to target elements
    offset: 0,

    // the selector used to bind elements to smooth scroll
    selector: 'a[data-href]',

    // function to run before starting the scroll,
    // receives the scrollType: 'hash' or 'click' and
    // an optional trigger when scroll behavior is invoked via a click
    beforeScroll: function( scrollType, trigger ){}
  };

  var Smoothy = function( elements, options ){
    this.elements = elements;
    this.options = $.extend( {}, defaults, options );
    this.init();
  };

  Smoothy.prototype = {

    _getById: function( id ){
      return $(id);
    },

    init: function(){

      var p = this,
        o = p.options
      ;

      if( o.onLoad ){
        p.scrollByHash();
      }

      p.elements.each(function(){
        $(o.selector).on('click', function( e ){
          p.scrollByClick( $(this), e );
        });
      });
    },

    scrollByHash: function(){

      var p = this,
        o = p.options,
        hash = window.location.hash
      ;

      if( !hash.length ) return;

      var $target = p._getById( hash );
      if( !$target.length ) return;

      $('html,body').hide();

      setTimeout( function(){

        $('html,body').scrollTop(0).show();

        if( typeof o.beforeScroll === 'function' ){
          o.beforeScroll( 'hash' );
        }

        p.scrollTo( $target );

      }, 0);
    },

    scrollByClick: function( $trigger, e ){

      var p = this,
        o = p.options,
        hash = $trigger.attr('data-href'),
        $target = p._getById( hash )
      ;

      if( !$target.length ) return;

      e.preventDefault();

      if( typeof o.beforeScroll === 'function' ){
        o.beforeScroll( 'click', $trigger );
      }

      p.scrollTo( $target );
    },

    scrollTo: function( $target ){

      var p = this,
        o = p.options
      ;

      if( !$target.length ) return;


      $('body').animate({
        scrollTop: $target.offset().top - p.options.offset
      });

    }
  };

  $.fn.smoothy = function( options ){

    var smoothy = new Smoothy( this, options ),
      $html = $('html')
    ;

    if( !$.data( $html, 'smoothy-loaded' ) ){
      $.data( $html, 'smoothy-loaded', smoothy );
    }
  }

})(jQuery, window);
