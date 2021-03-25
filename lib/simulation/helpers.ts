export class Vector2 {

    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x ? x : 0
        this._y = y ? y : 0
    }

    public get x() {
        return this._x
    }

    public get y() {
        return this._y
    }

    public set x(x) {
        this._x = x
    }

    public set y(y) {
        this._y = y
    }

    public update = (x, y) => {
        this._x = x ? x : 0
        this._y = y ? y : 0
    }

    public sub = (a) => {
        return new Vector2(this.x - a.x, this.y - a.y)
    }

    public toString = () => {
        return `${this.x}, ${this.y}`
    }

    public pythag = (vector: Vector2): number => {
        return +Math.sqrt(vector.x * vector.x + vector.y * vector.y)
    }

    public normalised = (): Vector2 => {
        const hyp = this.pythag(new Vector2(this.x, this.y))
        return new Vector2(this.x / hyp, this.y / hyp)
    }

    public invert = (): Vector2 => {
        return new Vector2(this.x * -1, this.y * -1)
    }
}

export const reducer = (a,c) => a + c