export function youtube_parser(url) {
    const regExp = /(?:youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : false;
}