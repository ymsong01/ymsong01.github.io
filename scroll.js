
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}
// work by http://stackoverflow.com/questions/5007530/how-do-i-scroll-to-an-element-using-javascript