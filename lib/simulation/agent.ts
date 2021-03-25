import { Vector2, reducer } from "./helpers"

export default class Agent {

    private _position = new Vector2(0, 0)
    private _dimensions = new Vector2(10, 10)
    private _bounds = new Vector2(100, 100)
    private _direction = new Vector2(Math.round(Math.random())?1:-1, Math.round(Math.random())?1:-1)
    private _speed:number = 100

    constructor() {

    }

    private get _center() {
        return new Vector2(this._position.x + (this._dimensions.x / 2), this._position.y + (this._dimensions.y / 2))
    }

    public get dimensions(){
        return this._dimensions
    }

    public get position(){
        return this._position
    }

    setBounds = (bounds: Vector2) => {
        this._bounds = bounds
        this._position = new Vector2((Math.random() * this._bounds.x) - this._dimensions.x, (Math.random() * this._bounds.y) - this._dimensions.y)
    }

    setDirection = (mousePos: Vector2, ctx:CanvasRenderingContext2D) => {
        const underAgent = ctx.getImageData(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y).data
        // up
        ctx.fillStyle="red"
        // ctx.fillRect(this.position.x, this.position.y - 40, this.dimensions.x, this.dimensions.y)
        // // left
        // ctx.fillStyle="blue"
        // ctx.fillRect(this.position.x - 40, this.position.y, this.dimensions.x, this.dimensions.y)
        // // down 
        // ctx.fillStyle="yellow"
        // ctx.fillRect(this.position.x , this.position.y + 40,  this.dimensions.x, this.dimensions.y)
        // // right 
        // ctx.fillStyle="green"
        // ctx.fillRect(this.position.x + 40, this.position.y, this.dimensions.x, this.dimensions.y)

        ctx.fillStyle="white"

        const up = ctx.getImageData(this.position.x, this.position.y - 40, this.dimensions.x, this.dimensions.y).data
        const upScore = up.reduce(reducer)/up.length

        const down = ctx.getImageData(this.position.x , this.position.y + 40,  this.dimensions.x, this.dimensions.y).data
        const downScore = down.reduce(reducer)/down.length

        const left = ctx.getImageData(this.position.x - 40, this.position.y, this.dimensions.x, this.dimensions.y).data
        const leftScore = left.reduce(reducer)/left.length

        const right = ctx.getImageData(this.position.x + 40, this.position.y, this.dimensions.x, this.dimensions.y).data
        const rightScore = right.reduce(reducer)/right.length

        const horizontal = rightScore === leftScore?0: rightScore>leftScore?1:-1
        const vertical = upScore === downScore?0: downScore>upScore?1:-1

        this._direction.x += (horizontal/20)
        this._direction.y += (vertical/20)

    }

    collide = () => {
        this._direction = this._direction.invert()
    }

    checkCollision = (agent: Agent) => {
        // if (
            // this.position.x > agent.position.x && this.position.x < agent.position.x + agent.dimensions.x ||
            // agent.position.x > this.position.x && agent.position.x < this.position.x + this.dimensions.x
            // ){
            // if (
            //     this.position.y > agent.position.y && this.position.y < agent.position.y + agent.dimensions.y ||
            //     agent.position.y > this.position.y && agent.position.y < this.position.y + agent.dimensions.y
            //     ){
                    // this.collide()
                    // agent.collide()
            // }
        // }
    }

    move = (elapsed:number) => {


        if ((this._position.x) + this._direction.x < 0) {
            this._direction.x *= -1
        }

        if (this._position.y + this._direction.y < 0) {
            this._direction.y *= -1
        }

        if (this._position.x + this._direction.x + this._dimensions.x > this._bounds.x) {
            this._direction.x *= -1
        }

        if (this._position.y + this._direction.y + this._dimensions.y > this._bounds.y) {
            this._direction.y *= -1
        }

        this._position.x = this._position.x + this._direction.x * (elapsed / 1000) * this._speed
        this._position.y = this._position.y + this._direction.y * (elapsed / 1000) * this._speed
        // console.log(this._position)
    }

    tick = (ctx: CanvasRenderingContext2D, mousePos: Vector2, elapsed : number) => {
        this.setDirection(mousePos,ctx)
        this.move(elapsed)
        ctx.fillRect((this._position.x), (this._position.y), this._dimensions.x, this._dimensions.y)


    }

}