// export function youtube_parser(url) {
//     const regExp = /(?:youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]{11})/;
//     const match = url.match(regExp);
//     return match ? match[1] : false;
// }

export function youtube_parser(url) {
  var regExp =
    /((http|https)\:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
  return url.match(regExp) ? RegExp.$3 : false;
}
