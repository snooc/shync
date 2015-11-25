if (process.env.SHYNC_ENV === 'development') {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://localhost:35729/livereload.js';
  head.appendChild(script);
}
