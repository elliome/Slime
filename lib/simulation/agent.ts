import { Vector2, reducer, Grid } from "./helpers"

export default class Agent {

    private _position = new Vector2(0, 0)
    private _dimensions = new Vector2(1, 1)
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

    public set direction(x:Vector2){
        if (x.x > 1){
            x.x = 1
        }

        if (x.x < -1){
            x.x = -1
        }

        if (x.y > 1){
            x.y = 1
        }

        if (x.y < -1){
            x.y = -1
        }

        this._direction = x
    }

    setBounds = (bounds: Vector2) => {
        this._bounds = bounds
        this._position = new Vector2((Math.random() * this._bounds.x) - this._dimensions.x, (Math.random() * this._bounds.y) - this._dimensions.y)
    }

    setDirection = (mousePos: Vector2, ctx:CanvasRenderingContext2D, pheromones:Grid) => {

        // console.log(pheromones.getRectVal(this.position.x - 20, this.position.y - (this.dimensions.y/2) - 40, 40, 40))

        // up
        // ctx.fillStyle="red"
        // ctx.fillRect(this.position.x - 20, this.position.y - (this.dimensions.y/2) - 40 - 5, 40, 40)
        const upScore = pheromones.getRectVal(this.position.x - 20, this.position.y - (this.dimensions.y/2) - 40 - 5, 40, 40)
        // left
        // ctx.fillStyle="blue"
        // ctx.fillRect(this.position.x - (this.dimensions.y/2) - 40 - 5, this.position.y - 20, 40,40)
        const leftScore = pheromones.getRectVal(this.position.x - (this.dimensions.y/2) - 40 - 5, this.position.y - 20, 40,40)
        // down 
        // ctx.fillStyle="yellow"
        // ctx.fillRect(this.position.x - 20 , this.position.y + (this.dimensions.y/2) + 5,  40, 40)
        const downScore = pheromones.getRectVal(this.position.x - 20 , this.position.y + (this.dimensions.y/2) + 5,  40, 40)

        // // right 
        // ctx.fillStyle="green"
        // ctx.fillRect(this.position.x + 5, this.position.y - 20, 40, 40)
        const rightScore = pheromones.getRectVal(this.position.x + 5, this.position.y - 20, 40, 40)

        ctx.fillStyle="white"

        const upDown = (upScore===downScore?0:upScore>downScore?-.01:.01)
        const leftRight = (leftScore === downScore?0:leftScore>rightScore?-.01:.01)
        // console.log(upScore,downScore)

        this.direction = new Vector2(this._direction.x + leftRight, this._direction.y + upDown)


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


        if ((this._position.x) + (this._direction.x * (elapsed / 1000) * this._speed) < 0) {
            this._direction.x *= -1
        }

        if (this._position.y + (this._direction.y * (elapsed / 1000) * this._speed) < 0) {
            this._direction.y *= -1
        }

        if (this._position.x + (this._direction.x * (elapsed / 1000) * this._speed) + this._dimensions.x > this._bounds.x) {
            this._direction.x *= -1
        }

        if (this._position.y + (this._direction.y * (elapsed / 1000) * this._speed) + this._dimensions.y > this._bounds.y) {
            this._direction.y *= -1
        }

        this._position.x = this._position.x + this._direction.x * (elapsed / 1000) * this._speed
        this._position.y = this._position.y + this._direction.y * (elapsed / 1000) * this._speed
        // console.log(this._position)
    }

    tick = (ctx: CanvasRenderingContext2D, mousePos: Vector2, elapsed : number, pheromones:Grid) => {
        this.setDirection(mousePos,ctx,pheromones)
        this.move(elapsed)
        ctx.fillRect((this._position.x), (this._position.y), this._dimensions.x, this._dimensions.y)
        return this.position

    }

}
