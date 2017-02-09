
$(function() {

  $("#emojis").click(function(e) {
    $("#video-container").show(200);
    $("#arrows").show(200);

    var clicked = $(e.target).parent()[0].id;
    var dataSearch;
    if (clicked === "happy-face") {
      $("#sad-face").hide('slow');
      $("#mad-face").hide('slow');
      

      dataSearch = ["funny animal compilations", "cute baby videos"];
    } else if (clicked === "sad-face") {
       $("#happy-face").hide('slow');
      $("#mad-face").hide('slow');
      
      dataSearch = ["cheer up videos", "empowerment and motivation"];
    } else {
      $("#sad-face").hide('slow');
      $("#happy-face").hide('slow');

      dataSearch = ["make me happy", "exitement"];
    }

    $("#emojis").animate({width: '16.222%'}, 600, function() {
      

      //get data for each search term
      var promise = new Promise(function(resolve, reject) {









      })
      dataSearch.forEach(function(data) {
        api.getYoutubeData(data).then(function(res) {
          
          var videoIds = api.getVideoIds(res); //get the video ID's
          api.addToQueue(videoIds); //add em to the queue
          console.log(api.queue);
        }).catch(function(err) {
          console.log(err)
        });
      })
      
      console.log('hi');
      //shuffle it
      //display it
      
    });

//         if (that.queue.length === 42) {
//           callback();
//         }




    //function to be called after the youtube data has been gather through ajax
    function processData() {
      api.shuffle(api.queue);
      api.displayVideos(api.displaying);
    }
  })

  $('.left-arrow').click(function() {
    api.previousThreeVideos();
  });

  $('.right-arrow').click(function() {
    api.nextThreeVideos();
  });


  $('body').click(function() {
    
    var displaying = api.displaying;
    console.log(displaying[2]);
    var rightArrow = $(".right-arrow");
    var leftArrow = $(".left-arrow");


    if(displaying[0] === 0) {
      leftArrow.hide();
    // } else if (displaying[2] >= 41) {
    //   rightArrow.hide();
    } else {
      leftArrow.show();
      rightArrow.show();
    }
  })
});

//calls right away from the html-page script to have the youtube api ready to use.
function init() {
  gapi.client.setApiKey('AIzaSyApfLVjHCSsyo-MZGWLaDAsGkKtrbukMU8');
  gapi.client.load('youtube', 'v3', function() {
    console.log('youtube api is ready!')
  });
}


