'use strict';

jQuery(document).ready(function($) {

  var lastId,
    topMenu = $("#top-navigation"),
    topMenuHeight = topMenu.outerHeight(),
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function() {
      var href = $(this).attr("href");
      if (href.indexOf("#") === 0) {
        var item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      }
    });

  //Get width of container
  var containerWidth = $('.section .container').width();


  $('input, textarea').placeholder();

  // Bind to scroll
  $(window).scroll(function() {

    //Display or hide scroll to top button
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }

    if ($(this).scrollTop() > 130) {
      $('.navbar').addClass('navbar-fixed-top animated fadeInDown');
    } else {
      $('.navbar').removeClass('navbar-fixed-top animated fadeInDown');
    }

    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight + 10;

    // Get id of current scroll item
    var cur = scrollItems.map(function() {
      if ($(this).offset().top < fromTop)
        return this;
    });

    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("[href=#" + id + "]").parent().addClass("active");
    }
  });

  /*
  Function for scroliing to top
  ************************************/
  $('.scrollup').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() == 0) {
      $('.nav li:first-child').addClass('active');
    }
  });

  $(window).load(function() {
    function filterPath(string) {
      return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
    }
    $('a[href*=#]').each(function() {
      if (filterPath(location.pathname) == filterPath(this.pathname) && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
        var $targetId = $(this.hash),
          $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
        var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;

        if ($target) {

          $(this).click(function() {

            //Hack collapse top navigation after clicking
            topMenu.parent().attr('style', 'height:0px').removeClass('in'); //Close navigation
            $('.navbar .btn-navbar').addClass('collapsed');

            var targetOffset = $target.offset().top - 63;
            $('html, body').animate({
              scrollTop: targetOffset
            }, 800);
            return false;
          });
        }
      }
    });
  });

  /*
  Sand mail
  **********************************************************************/
  $("#send-mail").click(function() {

    var name = $('input#name').val(); // get the value of the input field
    var error = false;
    if (name == "" || name == " ") {
      $('#err-name').show(500);
      $('#err-name').delay(4000);
      $('#err-name').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    var emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
    var email = $('input#email').val().toLowerCase(); // get the value of the input field
    if (email == "" || email == " " || !emailCompare.test(email)) {
      $('#err-email').show(500);
      $('#err-email').delay(4000);
      $('#err-email').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    var contactNumberCompare = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // Syntax to compare against input
    var phone = $('input#contactNumber').val().toLowerCase(); // get the value of the input field
    if (phone == "" || phone == " " || !contactNumberCompare.test(phone)) {
      $('#err-contactNumber').show(500);
      $('#err-contactNumber').delay(4000);
      $('#err-contactNumber').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    var choice = $("#choice").val(); // get the value of the input field
    if (!choice || $("#choice")[0].selectedIndex === 0) {
      $('#err-choice').show(500);
      $('#err-choice').delay(4000);
      $('#err-choice').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    var city = $("#city").val(); // get the value of the input field
    if (!city || $("#city")[0].selectedIndex === 0) {
      $('#err-city').show(500);
      $('#err-city').delay(4000);
      $('#err-city').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    if (error == false) {
      var dataString = $('#contact-form').serialize(); // Collect data from form
      $.ajax({
        type: "POST",
        url: $('#contact-form').attr('action'),
        data: dataString,
        dataType: "html",
        timeout: 6000,
        success: function(response) {
          response = $.parseJSON(response);
          if (response.success) {
            $('#successSend').show();
            $("#name").val('');
            $("#email").val('');
            $("#contactNumber").val('');
            $("#choice").val('');
            $('#choice').prop('selectedIndex', 0);
            $('#city').prop('selectedIndex', 0);
          } else {
            $('#errorSend').show();
          }
        },
        error: function(request, error) {}
      });
      return false;
    }

    return false; // stops user browser being directed to the php file
  });


  /*
  Send service form e-mail
  **********************************************************************/
  $("#service-form-send-mail").click(function() {

    var name = $('input#serviceFormName').val(); // get the value of the input field
    var error = false;
    if (name == "" || name == " ") {
      $('#service-form-err-name').show(500);
      $('#service-form-err-name').delay(4000);
      $('#service-form-err-name').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    var emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
    var email = $('input#serviceFormEmail').val().toLowerCase(); // get the value of the input field
    if (email == "" || email == " " || !emailCompare.test(email)) {
      $('#service-form-err-email').show(500);
      $('#service-form-err-email').delay(4000);
      $('#service-form-err-email').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    var phoneCompare = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // Syntax to compare against input
    var phone = $('input#servicePhoneNumber').val().toLowerCase(); // get the value of the input field
    if (phone == "" || phone == " " || !phoneCompare.test(phone)) {
      $('#service-form-err-phone').show(500);
      $('#service-form-err-phone').delay(4000);
      $('#service-form-err-phone').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    var choice = $("#serviceFormChoice").val(); // get the value of the input field
    if (!choice || $("#serviceFormChoice")[0].selectedIndex === 0) {
      $('#service-form-err-choice').show(500);
      $('#service-form-err-choice').delay(4000);
      $('#service-form-err-choice').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    var city = $("#serviceSelectCity").val(); // get the value of the input field
    if (!city || $("#serviceSelectCity")[0].selectedIndex === 0) {
      $('#service-form-err-city').show(500);
      $('#service-form-err-city').delay(4000);
      $('#service-form-err-city').animate({
        height: 'toggle'
      }, 500, function() {
        // Animation complete.
      });
      error = true; // change the error state to true
    }

    if (error == false) {
      var dataString = $('#contact-service-form').serialize(); // Collect data from form
      $.ajax({
        type: "POST",
        url: $('#contact-service-form').attr('action'),
        data: dataString,
        dataType: "html",
        timeout: 6000,
        success: function(response) {
          response = $.parseJSON(response);
          if (response.success) {
            $('#service-form-successSend').show();
            $("#serviceFormName").val('');
            $("#serviceFormEmail").val('');
            $("#servicePhoneNumber").val('');
            $("#serviceFormChoice").val('');
            $('#serviceFormChoice').prop('selectedIndex', 0);
            $('#serviceSelectCity').prop('selectedIndex', 0);
            setTimeout(function() {
              $("#service-form-successSend").hide();
            }, 5000);
          } else {
            $('#service-form-errorSend').show();
          }
        },
        error: function(request, error) {}
      });
      return false;
    }

    return false; // stops user browser being directed to the php file
  });


  /************************
  Animate elements
  *************************/

  //Animate skill bars
  jQuery('.skills > li > span').one('inview', function(event, visible) {
    if (visible == true) {
      jQuery(this).each(function() {
        jQuery(this).animate({
          width: jQuery(this).attr('data-width')
        }, 3000);
      });
    }
  });

  //service tab-content

  $('ul.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  });

  //brand logo

  $('.brand').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
  });

  //Json data callback

  /*AJAX Call*/
  var data = {};
  var siteData;
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "json/data.json",
    data: JSON.stringify(data),
    dataType: 'json',
    timeout: 600000,
    success: function(data) {
      siteData = data;
    },
    error: function(e) {
      console.log("ERROR: ", e);
    }
  });

  /*Ajax call end*/

  $('.selector').click(function(e) {
    var index = $(this).attr("data-id");
    $.each(siteData.igcse, function(key, value) {
      if (index == value.id) {
        renderBlock(value);
      }
    });

    $.each(siteData.ib, function(key, value) {
      if (index == value.id) {
        renderBlock(value);
      }
    });

  });

  function renderBlock(item) {
    $('body').css('overflow-y', 'hidden');
    $('.services-data').show();
    $('.section-title').html(item.topic);
    $('.section-heading').html(item.heading);
    $('.section-img img').attr("src", item.image);
    $('.section-description').html(item.description);
  }

  $('.close-services').click(function() {
    $('.services-data').hide();
    $('body').css('overflow-y', 'scroll');
  });

  $('.skype-section .close-services').click(function() {
    $('.skype-section').slideUp();
    $('html, body').animate({
      scrollTop: $(".skype-option").offset().top
    }, 1000);
  });

  $('.skype-section-open').click(function() {
    $('.skype-section').slideDown();
  });
  //Json data callback end

  //News carousel
  var newsItem = $("#news");
  var newsItemTimer = 8000;
  newsItem.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: newsItemTimer,
    autoplayHoverPause: true,
    autoHeight: true
  });

  newsItem.on('mouseenter', function() {
    newsItem.trigger('stop.owl.autoplay');
  });

  newsItem.on('mouseleave', function() {
    newsItem.trigger('play.owl.autoplay', [newsItemTimer]);
  });
  //News carousel end

  // Performers carousel
  var performersItem = $("#performers-carousel");
  var performersItemTimer = 5000;
  performersItem.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: performersItemTimer,
    autoplayHoverPause: true,
    responsiveClass:true,
    autoHeight: true
  });

  performersItem.on('mouseenter', function() {
    performersItem.trigger('stop.owl.autoplay');
  });

  performersItem.on('mouseleave', function() {
    performersItem.trigger('play.owl.autoplay', [performersItemTimer]);
  });
  // Performers carousel end


});

//Initialize google map for contact setion with your location.

function initializeMap() {

  var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Pune', 18.520430, 73.856744],
        ['Mumbai', 19.075984, 72.877656],
        ['Ahmedabad', 23.022505, 72.571362]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h4>Pune aimIB7&trade;</h4>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>Mumbai aimIB7&trade;</h4>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>Ahmedabad aimIB7&trade;</h4>' + '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        google.maps.event.removeListener(boundsListener);
    });

}
