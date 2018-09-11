
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
  let popup = window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Join Etheremon, have fun & earn ETH')}&hashtags=Etheremon,dapps,game&url=${encodeURIComponent(url)}`, 'Etheremon', `height=${h},width=${w},top=${top},left=${left}`);
  if (popup) {
    let timer = setInterval(function () {
      if (popup.closed) {
        clearInterval(timer);
        callback && callback(true);
      }
    }, 1000);
  }
};