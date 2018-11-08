export const CustomTrackList = {
  firstRegister: 'first-register',
};

export const AutoTrack = (page) => {
  if (!page) page = location.pathname;
  typeof gtag !== 'undefined' && gtag('config', GA_TRACKING_ID, {page_path: `/${page}`});
};