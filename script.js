
$(function() {

  $("#happy-face").click(function() {
    var request = gapi.client.youtube.search.list({
      part: 'snippet',
      type: 'video',
      q: 'cats',
      maxResults: 3
    });

    request.execute(function(response) {
      console.log(response);
    }) 
  })
});





function init() {
  gapi.client.setApiKey('AIzaSyApfLVjHCSsyo-MZGWLaDAsGkKtrbukMU8');
  gapi.client.load('youtube', 'v3', function() {
    console.log('youtube api is ready!')
  });
}


