export const ShareToFacebook = (url, callback) => {
  window.FB.ui({
    method: 'share',
    href: url,
  }, (response) => { callback && callback(response); });
};

export const ShareImageToFacebook = (blob) => {
  window.FB.getLoginStatus((response) => {
    if (response.status === 'connected') {
      postImageToFacebook(
        response.authResponse.accessToken,
        'Canvas to Facebook/Twitter',
        'image/png',
        blob,
        window.location.href,
      );
    } else if (response.status === 'not_authorized') {
      window.FB.login((response) => {
        postImageToFacebook(response.authResponse.accessToken, 'Canvas to Facebook/Twitter', 'image/png', blob, window.location.href);
      }, { scope: 'publish_actions' });
    } else {
      window.FB.login((response) => {
        postImageToFacebook(response.authResponse.accessToken, 'Canvas to Facebook/Twitter', 'image/png', blob, window.location.href);
      }, { scope: 'publish_actions' });
    }
  });
};

function postImageToFacebook(token, filename, mimeType, imageData, message) {
  const fd = new FormData();
  fd.append('access_token', token);
  fd.append('source', imageData);
  fd.append('no_story', true);

  // Upload image to facebook without story(post to feed)
  $.ajax({
    url: `https://graph.facebook.com/me/photos?access_token=${token}`,
    type: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    cache: false,
    success(data) {
      console.log('success: ', data);

      // Get image source url
      FB.api(
        `/${data.id}?fields=images`,
        (response) => {
          if (response && !response.error) {
            // console.log(response.images[0].source);

            // Create facebook post using image
            FB.api(
              '/me/feed',
              'POST',
              {
                message: '',
                picture: response.images[0].source,
                link: window.location.href,
                name: 'Look at the cute panda!',
                description: message,
                privacy: {
                  value: 'SELF',
                },
              },
              (response) => {
                if (response && !response.error) {
                  /* handle the result */
                  console.log('Posted story to facebook');
                  console.log(response);
                }
              },
            );
          }
        },
      );
    },
    error(shr, status, data) {
      console.log(`error ${data} Status ${shr.status}`);
    },
    complete(data) {
      // console.log('Post to facebook Complete');
    },
  });
}
