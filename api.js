var api = {
  queue: [], //will hold the video id's
  displaying: [0,1,2], //these three items are used as indexes for displaying from the queue.
  getYoutubeData: function(data) { //gets data from youtube
    var request = gapi.client.youtube.search.list({
      part: 'snippet',
      type: 'video',
      q: data,
      maxResults: 21
    });

    //return a promise
    var promise = new Promise(function(resolve, reject) {
      request.execute(function(response) {
        resolve(response);
      });
    })
    
    return promise;
  },
  getVideoIds: function(youTubeObj) { //extract video id's
    var ids = [];

    youTubeObj.result.items.forEach(function(item) {
      var videoId = item.id.videoId;
      ids.push(videoId);
    });

    return ids;
  },
  addToQueue: function(videoIds) {
    this.queue = this.queue.concat(videoIds);
  },
  makeIframes: function(videoIds) { //makes the html iframes and returns them
    var iFrames = [];

    var iFrame = ['<iframe width="0%" height="100%" src="', '" frameborder="0" allowfullscreen></iframe>'];
    var url = 'https://www.youtube.com/embed/';

    videoIds.forEach(function(id) {
      iFrames.push( (iFrame[0] + url + id + iFrame[1]) );
    });

    return iFrames;
  },
  displayVideos: function() { //display the videos 
    var ids = [ this.queue[this.displaying[0]], this.queue[this.displaying[1]], this.queue[this.displaying[2]] ];
    var iFrames = this.makeIframes(ids);


    var domContainer = $('#video-container');
    
    iFrames.forEach(function(iframe) {
      var videoContainer = $('<div class="video"></div>');

      videoContainer.append(iframe);
      videoContainer.appendTo(domContainer);
      $('iframe').animate({
        width: '100%'
      }, 600);
    });
  },
  shuffle: function shuffle(arr) { //randomized the videos
    var currentIndex = arr.length, temp, randomIndex;

    while (currentIndex > 0) { // While there are elements in the array
      randomIndex = Math.floor(Math.random() * currentIndex); // Pick a random index

      currentIndex--; // Decrease currentIndex by 1

      // And swap the last element with it
      temp = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temp;
    }

    return arr;
  },
  nextThreeVideos: function() {
    var that = this;
    that.displaying.forEach(function(num, i) {
      that.displaying[i] = num + 3;
    });

    this.removeVideos();  
  },
  previousThreeVideos: function() {
    var that = this;
    that.displaying.forEach(function(num, i) {
      that.displaying[i] = num - 3;
    });

    this.removeVideos();  
  },
  removeVideos: function() {
    var that = this;
    
    $(".video iframe").animate({
      width: 0,
      opacity: 0.4
    }, 500).promise().then(function() { //after the animation remove the video and display the new ones.
      $('.video').remove()
      that.displayVideos(that.displaying);
    });
  }
};