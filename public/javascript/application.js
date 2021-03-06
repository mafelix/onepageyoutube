// function for buttons to show and click
$(function() {
  // for modal sign in
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
  // sidebar menu and options
  // $(".button-collapse").sideNav();
  $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  // Show sideNav
  $('.menu').on('click',function(){
    $('.button-collapse').sideNav('show');
  })
  
  // Hide sideNav
  // $('.button-collapse').sideNav('hide');      

  // playlist query
  $('.input-field button').on('click', function(e){
    e.preventDefault();
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type:"playlist",
      q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
      maxResults: 1,
      order: "viewCount",
      publishedAfter: "2015-01-01T00:00:00Z"
    });
      request.execute(function(response){
        var results = response.result;
        console.log(results);
        $('#playlist').html("");
        $.each(results.items, function(index, item){
         var title = $('<h5>').text(item.snippet.title);
         var li = $('<li>').addClass('video-container');
         var iframe = document.createElement('iframe');
         iframe.setAttribute("src", '//www.youtube.com/embed/videoseries?list=' + item.id.playlistId);
         iframe.setAttribute("allowFullScreen", "");
         iframe.setAttribute("frameborder", "0");
         li.append(iframe);
         $('#playlist').append(li);

        })
      })
   })

  // $(".input-field button").on("click", function(e) {
  //  e.preventDefault();
  //      // prepare the request
  //      var request = gapi.client.youtube.search.list({
  //       part: "snippet",
  //       type: "video",
  //       q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
  //       maxResults: 1,
  //       order: "viewCount",
  //       publishedAfter: "2015-01-01T00:00:00Z"
  //     });
  //      // execute the request
  //      request.execute(function(response) {
  //         // console.log(response);
  //         var results = response.result;
  //         // console.log(results);
  //         $("#results").html("");
  //         $.each(results.items, function(index, item){
  //           var title = $('<h5>').text(item.snippet.title);
  //           var iframe = document.createElement('iframe');
  //           // var div = $('<div>').addClass('videos')
  //           iframe.setAttribute("src", '//www.youtube.com/embed/' + item.id.videoId);
  //           iframe.setAttribute("allowFullScreen", "");
  //           iframe.setAttribute("frameborder", "0");
  //           // div.append(title)
  //           // div.append(iframe)
  //           var li = $('<li>').addClass('video-container');
  //           li.append(iframe)
  //           // .append(title);;
  //           $('#results').append(li)
  //           // .append(title);
  //         });
  //         // $.each(results.items, function(index, item) {
  //           // $.get("tpl/item.html", function(data) {
  //               // $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
  //             });
  //    });
  resetVideoHeight();
});
    // });

    $(window).on("resize", resetVideoHeight);
// });

function resetVideoHeight() {
  $(".video").css("height", $("#results").width() * 9/16);
}
function init() {
  gapi.client.setApiKey("AIzaSyCckPqTgpsduKrG1kNmrYlif3FBJQpcxEc");
  gapi.client.load("youtube", "v3", function() {
        // yt api is ready
      });
}






// $(function(){
//    var mainPlayer = {
//
//      showPlaylist: function(data){
//        $('#results').find('tbody').empty();
//        data.forEach(function(music){
//
//          var tableRow = $("<tr>");
//
//          $("<td>").text(music.title).appendTo(tableRow);
//          $("<td>").html("<a href=" + music.url +" >Click</a>").appendTo(tableRow);
//          $(tableRow).appendTo('#results');
//          $("#newmusicForm").addClass('panel');
//          $("#results").removeClass('panel');
//          });
//      },
//
//      playlistBtn: function(){
//        $.get('/musics', mainPlayer.showPlaylist);
//      },
//
//      newmusicBtn: function(){
//        $('#results').addClass('panel');
//        $('#newmusicForm').removeClass('panel');
//      }
//
//    };
//
//    //clicking on the load playlist button runs the property playlistBtn
//    $('#load-playlist').on('click',mainPlayer.playlistBtn);
//    //clicking on the newmusicBtn should hide the playlist and show the new music form
//    $('#new-music').on('click',mainPlayer.newmusicBtn);
//
//    // add new music on submit
//    $('#saveMusic').on('click', function(event){
//      event.preventDefault();
//      var title = $("#new_title").val();
//      var url = $("#new_url") .val();
//
//      if (title == "" || url == ""){
//        alert("You must fill out all the forms");
//        return false;
//      }
//      $.post('/musics/new', {title: title, url: url}, function(){
//        alert("It worked");
//      },'json');
//
//      return false;
//
//    });
//  });



//second way of doing ajax from ajax-example exercise!
//   $.ajax({
//   url: '/musics',
//   method: 'GET',
//   success: function(musicdata){
//     musicdata.forEach(function(music){
//       var tableRow = $("<tr>");

//       $("<td>").text(music.title).appendTo(tableRow);
//       $("<td>").text(music.url).appendTo(tableRow);

//       $('#playlist').append(tableRow);
//     })
//   }
// })


// ta created jquery to use get method to retrieve and append data to table
// $.get('http://localhost:3000/musics', function(data){
//  data.forEach(function(item) {
//    var tableRow = $("<tr>");

//    $("<td>").text(item.title).appendTo(tableRow);
//    $("<td>").text(item.url).appendTo(tableRow);

//    $('#playlist').append(tableRow);
 // $('#playlist').append(item.title);
 // $('#musiclist').append(item.url);
//  });
// });
// });
