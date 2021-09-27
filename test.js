const b = require("@lilalump/lavalampsvgblobs");
const {SVG} = require("@svgdotjs/svg.js");
c = new b.default
// alert(c.pathD)

var draw = SVG().addTo('body').size(300, 300)

var path = draw.path(c.pathD)
path.fill("#f06").move(0,0)
//rect.stroke({ color: '#f06', opacity: 0.6, width: 5 })
//path.stroke('#f06')

setTimeout(function(){
    window.location.reload(1);
}, 500);
