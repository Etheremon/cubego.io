
export const ShareToFacebook = (url, callback) => {
  window.FB.ui({
    method: 'share',
    href: url,
  }, function(response){ callback && callback(response); });
};


export const ShareToTwitter = (url, callback) => {
  let w = 500, h = 300;
  let left = (screen.width/2)-(w/2);
  let top = (screen.height/2)-(h/2);
  let popup = window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Hello world')}&hashtags=Etheremon,dapps,game&url=${encodeURIComponent(url)}`, 'Etheremon', `height=${h},width=${w},top=${top},left=${left}`);
  if (popup) {
    let timer = setInterval(function () {
      if (popup.closed) {
        clearInterval(timer);
        callback && callback(true);
      }
    }, 1000);
  }
};


export const ShareImageToFacebook = (blob) => {
  window.FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
    } else if (response.status === "not_authorized") {
      window.FB.login(function (response) {
        postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
      }, {scope: "publish_actions"});
    } else {
      window.FB.login(function (response) {
        postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
      }, {scope: "publish_actions"});
    }
  });
};

function postImageToFacebook(token, filename, mimeType, imageData, message) {
  let fd = new FormData();
  fd.append("access_token", token);
  fd.append("source", imageData);
  fd.append("no_story", true);

  // Upload image to facebook without story(post to feed)
  $.ajax({
    url: "https://graph.facebook.com/me/photos?access_token=" + token,
    type: "POST",
    data: fd,
    processData: false,
    contentType: false,
    cache: false,
    success: function (data) {
      console.log("success: ", data);

      // Get image source url
      FB.api(
        "/" + data.id + "?fields=images",
        function (response) {
          if (response && !response.error) {
            //console.log(response.images[0].source);

            // Create facebook post using image
            FB.api(
              "/me/feed",
              "POST",
              {
                "message": "",
                "picture": response.images[0].source,
                "link": window.location.href,
                "name": 'Look at the cute panda!',
                "description": message,
                "privacy": {
                  value: 'SELF'
                }
              },
              function (response) {
                if (response && !response.error) {
                  /* handle the result */
                  console.log("Posted story to facebook");
                  console.log(response);
                }
              }
            );
          }
        }
      );
    },
    error: function (shr, status, data) {
      console.log("error " + data + " Status " + shr.status);
    },
    complete: function (data) {
      //console.log('Post to facebook Complete');
    }
  });
}