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

export class Grid {
    private grid: Array<Array<number>>;
    private width: number;
    private height: number;

    constructor() {

    }

    public setDimensions(x: number, y: number) {
        this.grid = []
        
        
        this.width = x;
        this.height = y;
        
        // console.log(this.grid[639][0])
        for(let i = 0; i <= this.height - 1; i++){
            this.grid[i] = []
            for (let j = 0; j <= this.width - 1; j++){
                this.grid[i][j] = 0
            }
        }

    }

    public getRectVal(x: number, y: number, width: number, height: number) {
        const temp_arr : Array<Number> = Array()

        x = Math.round(x)
        y = Math.round(y)

        if (x < 0){
            width = width + x
            x = 0
        }

        if (y < 0){
            height = height + y
            y = 0
        }

        if (y + height > this.height){
            height = this.height - (y + height) 
            // height = height>0?0:height
        }

        for (let i = y; i < y + height; i++){
            temp_arr.push(...this.grid[i].slice(x,x+width))
        }
        return +temp_arr.reduce(reducer,0) / temp_arr.length || 0
    }

    public setOne(coord:Vector2){

        let x = Math.round(coord.x)
        let y = Math.round(coord.y)

        if (x < 0){
            x = 0
        }

        if (y < 0){
            y = 0
        }

        this.grid[y][x] = 1;
    }

    public getOne(coord:Vector2){

        let x = Math.round(coord.x)
        let y = Math.round(coord.y)

        if (x < 0){
            x = 0
        }

        if (y < 0){
            y = 0
        }

        if (x > this.width){
            x = this.width
        }

        if (y > this.height){
            y = this.width
        }

        let val : number;

        try{
            val = this.grid[y][x];
        }catch{
            console.log(y,x)
        }

        return val
    }

    public unpack(){

        this.grid = this.grid.map(row => row.map(square => square = square - 0.02))

        let temp_arr = [];
        this.grid.forEach(row => temp_arr.push(...row))

        return temp_arr
    }

}

export const reducer = (a, c) : number => a + c