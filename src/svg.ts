import {Color, SVG} from "@svgdotjs/svg.js";
import {CurvyBlob, Blob} from "./blob";
import {fromTo} from "kute.js/dist/kute.js"


export class AnimatedCurvyBlob {
    mainBlob: Blob
    subordinateBlob: Blob

    domElem: any
    group: any

    tween: any

    /**
     *
     * @param objectSelector // any css selector will do
     * @param vertixCountFactor
     * @param centerX
     * @param centerY
     * @param radius
     * @param color color which both blobs wil have. Both blobs need to have the same color
     */
    constructor(objectSelector: string, vertixCountFactor = 0.5, centerX = 250, centerY = 250, radius = 125, color = Color.random("vibrant")) {
        this.mainBlob = new CurvyBlob(vertixCountFactor, centerX, centerY, radius, color)
        this.subordinateBlob = new CurvyBlob(vertixCountFactor, centerX, centerY, radius, color)

        this.domElem = SVG().addTo(objectSelector).size(centerX, centerY)
        this.group = this.domElem.group()

        const factor = 0.132

        let d1 = SVG()
        let path1 = d1.path(this.mainBlob.pathD)
        path1.fill(color).move(centerX*factor, centerY*factor)
        path1.attr("id", this.mainBlob.id)

        let d2 = SVG()
        let path2 = d2.path(this.subordinateBlob.pathD)
        path2.fill(color).move(0, 0)
        path2.attr("id", this.subordinateBlob.id)
        path2.hide() // needs to be hidden to be able to be animated

        this.group.add(path1)
        this.group.add(path2)

        this.tween = fromTo(
            "#"+path1.attr("id"),
            {path: "#"+path1.attr("id")},
            {path: "#"+path2.attr("id")},
            {repeat: Infinity, duration: 1000, yoyo: true},
        )

        this.tween.start();
    }
}