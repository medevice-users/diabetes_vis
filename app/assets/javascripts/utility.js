/*
 * Use this object to define helper methods
 */

window.Utility = {}

/*
 * xOffset is the xvalue that you'd like to get the point of.
 * path is the svg path element
 */
Utility.getPointOnPath = function(xOffset, path) {

  var x = xOffset
  var beginning = 0, end = path.getTotalLength(), target;
  while (true) {
    target = Math.floor((beginning + end) / 2);
    pos = path.getPointAtLength(target);
    if ((target === end || target === beginning) && pos.x !== x) {
        break;
    }
    if (pos.x > x)      end = target;
    else if (pos.x < x) beginning = target;
    else                break; //position found
  }

  return pos

}

Utility.GLUCOSE_HIGH = 180
Utility.GLUCOSE_LOW = 80

Utility.glucoseLowScale = d3.scale.linear()
    .domain([40, 80])
    .range([20, 95])

Utility.glucoseHighScale = d3.scale.linear()
    .domain([180, 400])
    .range([95, 20])

Utility.getGlucoseColor = function(glucose) {
  if (glucose <= this.GLUCOSE_LOW) {
    var lightness = this.glucoseLowScale(glucose)
    return "hsl(" + 229 + ",100%," + lightness + "%)";
  }
  else if (glucose >= this.GLUCOSE_HIGH) {
    var lightness = this.glucoseHighScale(glucose)
    return "hsl(" + 9 + ",100%," + lightness + "%)";
  } else {
    return "#ffffff"
  }
}
