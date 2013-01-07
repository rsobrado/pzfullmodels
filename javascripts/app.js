;(function ($, window, undefined) {
  'use strict';
  var gallery_st;
  var $doc = $(document),
  Modernizr = window.Modernizr;

  $(document).ready(function() {

    flickr_photoset('c3cadcbf024df6f25639c5e6f94484a9','72157630196621864');
    load_masonry();

    

  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

  function flickr_photoset(USER_ID,PS_ID) {
    $.ajax({ 

      type:"application/javascript",
      url: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+USER_ID+'&photoset_id='+PS_ID+'&format=json',
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi',
      success: function(data) {
        gallery_st = true; //to avoid reload info

        $.each(data.photoset.photo, function(i,photo){ 

          var images = '<div class="box">';
          images +='<a href="http://farm5.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg" rel="lightbox[roadtrip]">';
          images += '<img src="http://farm5.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg"/>';
          images += '</a> </div>';
          $('#sets').append(images);  

          $('#sets').masonry({
            columnWidth: 300,
            itemSelector: '.box', 
            isAnimated: true,
            animationOptions: {
              duration: 400,
              queue: false  
            }  
        }).imagesLoaded(function() {
            $('#sets').masonry('reload');
            });  

        }); 
      }     
    });
  }

})(jQuery, this);



