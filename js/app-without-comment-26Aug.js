'use strict';

jQuery(document).ready(function($) {

  var lastId,
    topMenu = $("#top-navigation"),
    topMenuHeight = topMenu.outerHeight(),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function() {
      var href = $(this).attr("href");
      if (href.indexOf("#") === 0) {
        var item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      }
    });

  
  var containerWidth = $('.section .container').width();


  $('input, textarea').placeholder();

  
  $(window).scroll(function() {

  
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

  
    var fromTop = $(this).scrollTop() + topMenuHeight + 10;

  
    var cur = scrollItems.map(function() {
      if ($(this).offset().top < fromTop)
        return this;
    });

  
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
  
      menuItems
        .parent().removeClass("active")
        .end().filter("[href=#" + id + "]").parent().addClass("active");
    }
  });

  
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

  
            topMenu.parent().attr('style', 'height:0px').removeClass('in'); 
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

  
  $("#send-mail").click(function() {

    var name = $('input#name').val(); 
    var error = false;
    if (name == "" || name == " ") {
      $('#err-name').show(500);
      $('#err-name').delay(4000);
      $('#err-name').animate({
        height: 'toggle'
      }, 500, function() {
        
      });
      error = true; 
    }

    var emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; 
    var email = $('input#email').val().toLowerCase(); 
    if (email == "" || email == " " || !emailCompare.test(email)) {
      $('#err-email').show(500);
      $('#err-email').delay(4000);
      $('#err-email').animate({
        height: 'toggle'
      }, 500, function() {
        
      });
      error = true; 
    }

    var contactNumberCompare = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    var phone = $('input#contactNumber').val().toLowerCase(); 
    if (phone == "" || phone == " " || !contactNumberCompare.test(phone)) {
      $('#err-contactNumber').show(500);
      $('#err-contactNumber').delay(4000);
      $('#err-contactNumber').animate({
        height: 'toggle'
      }, 500, function() {
        
      });
      error = true; 
    }

    var choice = $("#choice").val();
    if (!choice || $("#choice")[0].selectedIndex === 0) {
      $('#err-choice').show(500);
      $('#err-choice').delay(4000);
      $('#err-choice').animate({
        height: 'toggle'
      }, 500, function() {
        
      });
      error = true; 
    }

    var city = $("#city").val();
    if (!city || $("#city")[0].selectedIndex === 0) {
      $('#err-city').show(500);
      $('#err-city').delay(4000);
      $('#err-city').animate({
        height: 'toggle'
      }, 500, function() {
        
      });
      error = true;
    }

    if (error == false) {
      var dataString = $('#contact-form').serialize();
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

    return false; 
  });


  $("#service-form-send-mail").click(function() {

    var name = $('input#serviceFormName').val(); 
    var error = false;
    if (name == "" || name == " ") {
      $('#service-form-err-name').show(500);
      $('#service-form-err-name').delay(4000);
      $('#service-form-err-name').animate({
        height: 'toggle'
      }, 500, function() {
       
      });
      error = true; 
    }

    var emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; 
    var email = $('input#serviceFormEmail').val().toLowerCase(); 
    if (email == "" || email == " " || !emailCompare.test(email)) {
      $('#service-form-err-email').show(500);
      $('#service-form-err-email').delay(4000);
      $('#service-form-err-email').animate({
        height: 'toggle'
      }, 500, function() {
        
      });
      error = true; 
    }

    var phoneCompare = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
    var phone = $('input#servicePhoneNumber').val().toLowerCase(); 
    if (phone == "" || phone == " " || !phoneCompare.test(phone)) {
      $('#service-form-err-phone').show(500);
      $('#service-form-err-phone').delay(4000);
      $('#service-form-err-phone').animate({
        height: 'toggle'
      }, 500, function() {
       
      });
      error = true; 
    }

    var choice = $("#serviceFormChoice").val();
    if (!choice || $("#serviceFormChoice")[0].selectedIndex === 0) {
      $('#service-form-err-choice').show(500);
      $('#service-form-err-choice').delay(4000);
      $('#service-form-err-choice').animate({
        height: 'toggle'
      }, 500, function() {
        
      });
      error = true; 
    }

    var city = $("#serviceSelectCity").val();
    if (!city || $("#serviceSelectCity")[0].selectedIndex === 0) {
      $('#service-form-err-city').show(500);
      $('#service-form-err-city').delay(4000);
      $('#service-form-err-city').animate({
        height: 'toggle'
      }, 500, function() {
        
      });
      error = true; 
    }

    if (error == false) {
      var dataString = $('#contact-service-form').serialize(); 
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

    return false; 
  });



  jQuery('.skills > li > span').one('inview', function(event, visible) {
    if (visible == true) {
      jQuery(this).each(function() {
        jQuery(this).animate({
          width: jQuery(this).attr('data-width')
        }, 3000);
      });
    }
  });

  
  $('ul.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  });



  $('.brand').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
  });



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

  var owlItem = $("#news");
  var timer = 8000;
  owlItem.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: timer,
    autoplayHoverPause: true,
    autoHeight: true
  });

  $("#news").on('mouseenter', function() {
    owlItem.trigger('stop.owl.autoplay');
  });

  $("#news").on('mouseleave', function() {
    owlItem.trigger('play.owl.autoplay', [timer]);
  });


});



function initializeMap() {

  var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.setTilt(45);


    var markers = [
        ['Pune', 18.520430, 73.856744],
        ['Mumbai', 19.075984, 72.877656],
        ['Ahmedabad', 23.022505, 72.571362]
    ];

    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h4>Pune aimIB7</h4>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>Mumbai aimIB7</h4>' + '</div>'],
        ['<div class="info_content">' +
        '<h4>Ahmedabad aimIB7</h4>' + '</div>']
    ];


    var infoWindow = new google.maps.InfoWindow(), marker, i;

    
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

       
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        
        map.fitBounds(bounds);
    }

    
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        google.maps.event.removeListener(boundsListener);
    });

}
