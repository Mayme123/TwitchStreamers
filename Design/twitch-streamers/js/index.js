$(document).ready(function(){
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var streamData = [];
  var onlinePushed = false;
  var offlinePushed = false;
  
  $(".status-button-online").on('click', function(){
    $(this).toggleClass("active");
  });
  
  $("#online-button").on('click', function(){
    if(onlinePushed == false){
      onlinePushed = true;
    }else{
      onlinePushed = false;
    }
    destroyDivs();
    console.log(onlinePushed);
    streamers.forEach(function(element){
    getTwitchData(element);
    });
  });
  
  $("#offline-button").on('click', function(){
    if(offlinePushed == false){
      offlinePushed = true;
    }else{
      offlinePushed = false;
    }
    destroyDivs();
    console.log(offlinePushed);
    streamers.forEach(function(element){
    getTwitchData(element);
    });
  });
  
  function destroyDivs(){
    $('.streamer').remove();
  }
  
  
  function getTwitchData(streamer){
    var streamUrl = 'https://wind-bow.gomix.me/twitch-api/streams/' + streamer +'?callback=?';
    var channelUrl = 'https://wind-bow.gomix.me/twitch-api/channels/' + streamer +'?callback=?';
    
    $.getJSON(streamUrl, function(json){
      if(json.stream !== null && onlinePushed){
        //online
        $.getJSON(channelUrl, function(data){
          console.log(data);
          $('.streamers-divs').append("<div class='streamer' id=" + streamer +">"+
                                        "<div class='streamer-top'>"+
                                          "<div class='streamer-pic'>"+
                                          "</div>"+
                                          "<div class='status-box'>"+
                                          "</div>"+
                                        "</div>"+
                                      "</div>");
          $('#'+streamer+' .streamer-pic').css("background-image", "url(" + data.logo +")");
          $('#'+streamer+ ' .status-box').append("<img src='https://photos-5.dropbox.com/t/2/AACLWCjCTdDTwitM7Zj2xwsbwdtYkz61WJ0Ljtm5R8IRAg/12/373089556/png/32x32/1/_/1/2/Online-icon.png/EOit1vkCGN54IAcoBw/M9ZOi3Fl3gRrsu0ePFrh13bTIdLXHpiopbbYyvAFb2k?preserve_transparency=1&size=2048x1536&size_mode=3' class='status-blip'>")
          $('#'+streamer+' .status-box').append("<h5 class='status'>Online</h5>");
          $('#'+streamer+' .streamer-top').append("<a href='"+data.url+"' target='_blank'><h4>" + data.name +"</h4></a>");
          if(data.status !== null){
            $('#'+streamer).append("<p class='status-text'>" + data.status +"</p>");
          }
          
        });
      }else if(json.stream == null && offlinePushed == true){
        //offline
        $.getJSON(channelUrl, function(data){
          $('.streamers-divs').append("<div class='streamer' id=" + streamer +">"+
                                        "<div class='streamer-top'>"+
                                          "<div class='streamer-pic'>"+
                                          "</div>"+
                                          "<div class='status-box'>"+
                                          "</div>"+
                                        "</div>"+
                                      "</div>");
          $('#'+streamer+' .streamer-pic').css("background-image", "url(" + data.logo +")");
          $('#'+streamer+ ' .status-box').append("<img src='https://photos-3.dropbox.com/t/2/AAB0gMtfsofr9hlNXwAkCwiC60wrZhegG5dUEXSMw4ntTg/12/373089556/png/32x32/1/_/1/2/Offline-icon.png/EOit1vkCGN94IAcoBw/iRamIFyiS1HQaitnkSNEUqskGBWj1erjgoFPbUH27ds?preserve_transparency=1&size=2048x1536&size_mode=3' class='status-blip'>")
          $('#'+streamer+' .status-box').append("<h5 class='status'>Offline</h5>");
          $('#'+streamer+' .streamer-top').append("<a href='"+data.url+"' target='_blank'><h4>" + data.name +"</h4></a>");
          if(data.status !== null){
            $('#'+streamer).append("<p class='status-text'>" + data.status +"</p>");
          }
          ;
        });
      }
      
      
    });
  }
});



/*
online div append
        $('body').append("<div id=" + streamer +"></div>")
          $('#'+streamer).append("<img src = " + data.logo +">");
          $('#'+streamer).append("<img src='https://photos-5.dropbox.com/t/2/AACLWCjCTdDTwitM7Zj2xwsbwdtYkz61WJ0Ljtm5R8IRAg/12/373089556/png/32x32/1/_/1/2/Online-        icon.png/EOit1vkCGN54IAcoBw/M9ZOi3Fl3gRrsu0ePFrh13bTIdLXHpiopbbYyvAFb2k?preserve_transparency=1&size=2048x1536&size_mode=3'>")
          $('#'+streamer).append("<h3>" + data.name +"</h3>");
          $('#'+streamer).append("<p>" + data.status +"</p>");
*/