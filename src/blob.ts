import {Color} from "@svgdotjs/svg.js"
import {createHash} from "crypto";

export interface Blob {
    id: string;
    pathD: string;

    radius: number
    centerX: number
    centerY: number
    vertixCountFactor: number
    visible: boolean

    color: Color
}

/**
 * uses the pathD-value of a blob to generate its id attribute.
 * The id attribute of an svg path has to start with a character, therefore the string "id" is used as a suffix to
 * ensure that this is always the case *
 * @param blob
 */
function createIdHashFromBlobPathD(blob: Blob) {
    if (blob.pathD == undefined || blob.pathD == "") {
        throw new Error('cannot create hash of empty pathD attribute');
    }
    return "id" + createHash('sha1').update(blob.pathD).digest('hex').toString();
}

type Coordinate = {
    x: number,
    y: number,
}

export class CurvyBlob implements Blob {
    id: string;
    pathD: string;

    radius: number
    centerX: number
    centerY: number
    vertixCountFactor: number
    visible: boolean

    color: Color

    private pathCoordinates: Coordinate[] = [];

    /**
     * constructor of CurvyBlob
     * @param vertixCountFactor
     * @param centerX
     * @param centerY
     * @param radius
     * @param color
     */
    constructor(vertixCountFactor = 0.5, centerX = 100, centerY = 100, radius = 100, color = Color.random("vibrant")) {
        this.pathD = "";
        this.vertixCountFactor = vertixCountFactor;
        this.radius = radius;
        this.centerX = centerX;
        this.centerY = centerY;
        this.color = color

        this.generateCurvyShape()

        this.id = createIdHashFromBlobPathD(this)
        console.log(this.id)
    }

    /**
     * generate coordinates which will later be used to build the path
     */
    private generateCoords() {
        for (let i = 0; i < 2 * Math.PI; i += this.vertixCountFactor) {
            let x = (this.radius * Math.cos(i) + this.centerX) + CurvyBlob.getRandomRadiusModifier();
            let y = (this.radius * Math.sin(i) + this.centerY) + CurvyBlob.getRandomRadiusModifier();
            this.pathCoordinates.push({x, y});
            if (i + this.vertixCountFactor >= 2 * Math.PI) {
                this.pathCoordinates.push(this.pathCoordinates[0])
            }
        }
    }


    private catmullRom2bezier() {

        let d = "";
        this.pathCoordinates.forEach((coord, index, array) => {
            let p = [];
            if (index === 0) {
                d += `M${coord.x},${coord.y} `;
                p.push(array[array.length - 3]);
                p.push(array[index]);
                p.push(array[index + 1]);
                p.push(array[index + 2]);
            } else if (index === array.length - 2) {
                p.push(array[index - 1]);
                p.push(array[index]);
                p.push(array[index + 1]);
                p.push(array[0]);
            } else if (index === array.length - 1) {
                return
            } else {
                p.push(array[index - 1]);
                p.push(array[index]);
                p.push(array[index + 1]);
                p.push(array[index + 2]);
            }
            let bp = [];
            bp.push({x: p[1].x, y: p[1].y});
            bp.push({x: ((-p[0].x + 6 * p[1].x + p[2].x) / 6), y: ((-p[0].y + 6 * p[1].y + p[2].y) / 6)});
            bp.push({x: ((p[1].x + 6 * p[2].x - p[3].x) / 6), y: ((p[1].y + 6 * p[2].y - p[3].y) / 6)});
            bp.push({x: p[2].x, y: p[2].y});
            d += "C" + bp[1].x + "," + bp[1].y + " " + bp[2].x + "," + bp[2].y + " " + bp[3].x + "," + bp[3].y + " ";

        })

        return d;
    };

    private generateCurvyShape() {
        this.generateCoords();
        this.pathD = this.catmullRom2bezier();
    };


    private static getRandomRadiusModifier(factor = 10) {
        let num = Math.floor(Math.random() * factor) + 1;
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        return num
    }
}

// module.exports = {CurvyBlob, foo, Blob}

