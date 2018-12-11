
// Load jquery
var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(script);

setTimeout(start, 1000);
function start() {
    const linkText = $('script')[$('script').length-1].text;

    // Extract the url
    const url = /(?:file: \')(.*)\'/g.exec(linkText)[1];

    const urlPrefix = /(.*.mp4\/).*/g.exec(url)[1];

    const chunkListData = httpGet(url);
    const chunkListSuffix = /(chunklist.*)/g.exec(chunkListData)[0];

    const splitArr = chunkListSuffix.replace('chunklist', 'media').replace('m3u8', 'ts').split('.ts')

    const prefix = urlPrefix + splitArr[0] + "_";
    const suffix = ".ts" + splitArr[1];
    console.log(prefix + suffix);
    download(prefix, suffix);
}

function download(linkPrefix, linkSuffix) {
    let index = 0;
    let interval = setInterval(() => {
        try {
            downloadURLInBackground(linkPrefix + index + linkSuffix);
            index++;    
            if (index > 1000) clearInterval(interval);
        } catch (error) {
            clearInterval(interval);
            console.log(error);
        }
    }, 1500);
}

var $idown;  // Keep it outside of the function, so it's initialized once.
function downloadURLInBackground(url) {
  if ($idown) {
    $idown.attr('src',url);
  } else {
    $idown = $('<iframe>', { id:'idown', src:url }).hide().appendTo('body');
  }
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}