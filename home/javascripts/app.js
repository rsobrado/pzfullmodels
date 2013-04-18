;(function ($, window, undefined) {
  'use strict';
  var gallery_st;
  var $doc = $(document),
  Modernizr = window.Modernizr;

  var $flickrAPI_Key = 'c3cadcbf024df6f25639c5e6f94484a9';
  var $flickr_ID = '29587567%40N06';

  $(document).ready(function() {

   // flickr_photoset( $flickr_ID ,'72157630196621864');

    getGalleries($flickrAPI_Key,$flickr_ID);
  });

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

  function getGalleries(API_KEY,USER_ID) {

    $.ajax({ 
      

      type:"application/javascript",
      url: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key='+API_KEY+'&user_id='+USER_ID+'&format=json',
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi',
      success: function(data) {
        gallery_st = true; //to avoid reload info
        console.log(data);


        $.each(data.photosets.photoset, function(i,photoset){ 

          var gallery ='<li> <div class="gallery"><h1>'+photoset.title._content+'</h1></div></li>';
          $('#collections').append(gallery);

          
      });

      }     
    });
  }

  


  function flickr_photoset(API_KEY,PS_ID) {

    $.ajax({ 

      type:"application/javascript",
      url: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+API_KEY+'&photoset_id='+PS_ID+'&format=json',
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi',
      success: function(data) {
        gallery_st = true; //to avoid reload info

        $.each(data.photoset.photo, function(i,photo){ 

          var images ='<img src="http://farm5.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_m.jpg" class="box myphotos" rel="'+PS_ID+'" data-glisse-big="http://farm5.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_b.jpg" title="'+photo.title+'" />';

          $('#sets').append(images);  

          $('#sets').masonry({
            columnWidth: 300,
            itemSelector: '.box', 
            isAnimated: true,
            animationOptions: {
              duration: 1000,
              queue: false  
            }  
        }).imagesLoaded(function() {
            $('#sets').masonry('reload');
            });
      });

      $(function () {$('.myphotos').glisse({speed: 500, changeSpeed: 550, effect:'fade', fullscreen: true});}); 

      }     
    });
  }

})(jQuery, this);



