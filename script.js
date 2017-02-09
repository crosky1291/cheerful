
$(function() {
  var emojiClickedOunce = true;

  $("#emojis").click(function(e) {
    if (emojiClickedOunce) {
      emojiClickedOunce = false; //turn this off

      $("#video-container").show(200);
      $("#arrows").show(200);

      var clicked = $(e.target).parent()[0].id; //targets the face clicked
      var dataSearch;

      if (clicked === "happy-face") { //do this for happy-face
        $("#sad-face").hide('slow');
        $("#mad-face").hide('slow');
        dataSearch = ["funny animal compilations", "cute baby videos"];

      } else if (clicked === "sad-face") { //do this for sad-face
         $("#happy-face").hide('slow');
        $("#mad-face").hide('slow');
        dataSearch = ["cheer up videos", "empowerment and motivation"];

      } else { //do this for mad-face
        $("#sad-face").hide('slow');
        $("#happy-face").hide('slow');

        dataSearch = ["make me happy", "exitement"];
      }

      $("#emojis").animate({width: '16.222%'}, 600, function() { //do whats inside here AFTER the width is animated
        
        var numOfSearches = dataSearch.length; //this variable keeps track how many asynch searches will happen ounce finished it will trigger the promise to completion.
        var promise = new Promise(function(resolve, reject) {
          
          dataSearch.forEach(function(data) { //get data for each search term
            api.getYoutubeData(data).then(function(res) { //then
              
              var videoIds = api.getVideoIds(res); //get the video ID's
              api.addToQueue(videoIds); //add em to the queue
              numOfSearches--

              if (numOfSearches === 0) { //resolve promise when done searching youtube 
                resolve();
              }

            }).catch(function(err) { //catch any erros
              console.log(err)
            });
          });
        }).then(function() {
          api.shuffle(api.queue); //shuffle the array of video ids
          api.displayVideos(); //and finally display them
        });
      }); 
    } //if-statement-end
  }) //click-event-END
 
  //do this when the left/right arrows are clicked
  $('body').click(function(e) {
    var arrowClicked = e.target.id;
    var rightArrow = $(".right-arrow");
    var leftArrow = $(".left-arrow");

    //display next or previous three videos
    if( arrowClicked === "right-arrow") {
      api.nextThreeVideos();

    } else if (arrowClicked === "left-arrow") {
      api.previousThreeVideos();
    }

    var isFirstVideoUp = api.displaying[0] <= 0;
    var isLastVideoUp = api.displaying[2] >= (api.queue.length - 1);

    //hide the arrows depending on the first or last video displaying
    if(isFirstVideoUp) {
      leftArrow.hide();

    } else if(isLastVideoUp) {
      rightArrow.hide()

    } else {
      leftArrow.show();
      rightArrow.show();
    }
  });
});

//calls right away from the html-page script to have the youtube api ready to use.
function init() {
  gapi.client.setApiKey('AIzaSyApfLVjHCSsyo-MZGWLaDAsGkKtrbukMU8');
  gapi.client.load('youtube', 'v3', function() {
    console.log('youtube api is ready!')
  });
}


