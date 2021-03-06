( function () {
  var $next_height              = document.getElementById( "next-height" ),
      $header__nav              = document.getElementsByClassName( "header__nav" ),
      $form                     = document.getElementById( "form" ),
      $fieldset                 = document.getElementsByClassName( "fieldset" ),
      $fieldset__li             = document.getElementsByClassName( "fieldset__li" ),
      $fieldset__next           = document.getElementsByClassName( "fieldset__next" ),
      $fieldset__next__inactive = document.getElementsByClassName( "fieldset__next--inactive" ),
      $footer                   = document.getElementById( "footer__nav" );

  $next_height.addEventListener( "click", function ( event ) {
    event.preventDefault();
    event.stopPropagation();

    $form.classList.add( "form--active" );

    $header__nav[ 0 ].classList.add( "header__nav--active" );

    $fieldset[ 0 ].classList.add( "fieldset--active" );

    $footer.classList.add( "footer__nav--active" );
  } );

  Array.from( $fieldset__li ).forEach( function( element ) {
    element.addEventListener( "click", function ( event ) {
      event.preventDefault();
      event.stopPropagation();

      $fieldset__li_active  = document.getElementsByClassName( "fieldset__li" );

      Array.from( $fieldset__li_active ).forEach( function( element ) {
        element.classList.remove( "fieldset__li--active" );
      } );

      event.currentTarget.classList.add( "fieldset__li--active" );
      const $fieldset__next = event.currentTarget.parentElement.parentElement.children[ 2 ].children[ 1 ];
      $fieldset__next.classList.remove( "fieldset__next--inactive" );
      $fieldset__next.classList.add( "fieldset__next--active" );
      $fieldset__next.removeAttribute( "disabled" );
    } );
  } );

  Array.from( $fieldset__next__inactive ).forEach( function( element ) {
    element.addEventListener( "click", function ( event ) {
      event.preventDefault();
      event.stopPropagation();
    } );
  } );
} )();

$( function () {
  var $header__li       = $( ".header__li" ),
      $form             = $( ".form" ),
      $fieldset         = $( "fieldset" ),
      $fieldset__li     = $( ".fieldset__li" ),
      $fieldset__cancel = $( ".fieldset__cancel" ),
      $fieldset__next   = $( ".fieldset__next" ),
      $overlay          = $( ".overlay" ),
      $results          = $( ".results" ),
      $results__clear   = $( ".results__clear" ),
      $footer__li       = $( ".footer__li" ),
      $menu__a          = $( ".header__a, .footer__a" ),
      counter           = 0;

  $menu__a.on( 'click', function ( event ) {
    event.stopPropagation();
    event.preventDefault();

    var __index  = $( event.currentTarget ).data( "index" );
    $header__li.removeClass( "header__li--active" );
    $fieldset.removeClass( "fieldset--active" );
    $footer__li.removeClass( "footer__li--active" );

    $header__li.map( function ( index, domElement ) {
      if ( index < __index ) {
        $( domElement ).addClass( "header__li--active" );
      }
    } );
    $fieldset.map( function ( index, domElement ) {
      if ( index < __index ) {
        $( domElement ).addClass( "fieldset--active" );
      }
    } );
    $footer__li.map( function ( index, domElement ) {
      if ( index < __index ) {
        $( domElement ).addClass( "footer__li--active" );
      }
      counter = __index - 1;
    } );
  } );

  $fieldset__cancel.on( 'click', function ( event ) {
    event.stopPropagation();
    event.preventDefault();

    restartForm();
  } );

  $fieldset__next.on( 'click', function ( event ) {
    event.preventDefault();
    event.stopPropagation();

    var $section            = "#" + $( event.currentTarget ).data( "section" ),
        $slideClassActive   = "fieldset--active";

    if ( $section == "#results" ) {
      $slideClassActive   = "results--active";
    }

    counter++;

    $header__li.eq( counter ).addClass( "header__li--active" );
    $footer__li.eq( counter ).addClass( "footer__li--active" );

    if ( $( event.currentTarget ).hasClass( "last" ) ) {
      $overlay.addClass( "overlay--active" );

      $.ajax( {
        url: "assets/js/response.min.json",
        method: "POST",
        dataType: "json",
        data: {
          height: $( 'input[name="height"]' ).val(),
          age: $( 'input[name="age"]' ).val(),
          behavior: $( 'input[name="behavior"]' ).val(),
          size: $( 'input[name="size"]' ).val(),
          game: $( 'input[name="game"]' ).val(),
          social: $( 'input[name="social"]' ).val(),
          care: $( 'input[name="care"]' ).val()
        },
        contentType: "application/json; charset=UTF-8",
        error: function ( jqXHR, textStatus, errorThrown ) {},
      } ).fail( function ( jqXHR, textStatus, errorThrown ) {
        console.log( "fail" );
        console.log( "jqXHR: ", jqXHR );
        console.log( "textStatus: ", textStatus );
        console.log( "errorThrown: ", errorThrown );
      } ).done( function ( data, textStatus, jqXHR ) {
        var dogImg            = data.dogImg,
            dogImgAlt         = data.dogImgAlt,
            title             = data.title,
            message           = data.message,
            productImg        = data.productImg,
            productImgAlt     = data.productImgAlt,
            $dog_img          = $( "#dog-img" ),
            $results_title    = $( "#results-title" ),
            $results_message  = $( ".results__message" ),
            $product_img      = $( "#product-img" );

        $dog_img.attr( "src", "" );
        $dog_img.attr( "alt", "" );
        $results_title.text( "" );
        $results_message.empty();
        $product_img.attr( "src", "" );
        $product_img.attr( "alt", "" );

        $dog_img.attr( "src", dogImg );
        $dog_img.attr( "alt", dogImgAlt );
        $results_title.text( title );
        $results_message.append( message );
        $product_img.attr( "src", productImg );
        $product_img.attr( "alt", productImg );

        $( $section ).addClass( $slideClassActive );
        setTimeout( function () {
          $overlay.removeClass( "overlay--active" );
          $form.removeClass( "form--active" );
        }, 3000 );
      } );
    } else {
      $( $section ).addClass( $slideClassActive );
    }
  } );

  $results__clear.on( "click", function ( event ) {
    event.preventDefault();
    event.stopPropagation();

    restartForm();
  } );

  function restartForm ( ) {
    counter = 0;

    $header__li.removeClass( "header__li--active" );
    $header__li.eq( 0 ).addClass( "header__li--active" );

    document.getElementsByTagName( "form" )[ 0 ].clear;
    $form.addClass( "form--overlay" );

    $fieldset.removeClass( "fieldset--active fieldset-down fieldset--active-down" );
    $fieldset.eq( 0 ).addClass( "fieldset-down fieldset--active-down" );

    $fieldset__li.removeClass( "fieldset__li--active" );

    $fieldset__next.removeClass( "fieldset__next--active" );
    $fieldset__next.attr( "disabled", "disabled" );

    $footer__li.removeClass( "footer__li--active" );
    $footer__li.eq( 0 ).addClass( "footer__li--active" );

    setTimeout( function () {
      $results.removeClass( "results--active" );
      $form.addClass( "form--active " );
      $form.removeClass( "form--overlay" );
    }, 3000 );
  }
} );