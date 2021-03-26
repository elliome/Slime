import styles from '../styles/components/simulation.module.scss'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import * as StackBlur from 'stackblur-canvas';
import Agent from '../lib/simulation/agent'
import { reducer, Vector2, Grid } from '../lib/simulation/helpers';

const Simulation = () => {


    let speed = 0
    let pheromoneDrawSpeed = 5
    const canvasRef = useRef()
    let canvas: HTMLCanvasElement
    let canvasRect: DOMRect
    let ctx: CanvasRenderingContext2D
    let start: number
    let frame: number = 0
    let lastFrame: number = Date.now()
    const agents : Array<Agent> = []
    const mousePos: Vector2 = new Vector2(0, 0)
    const pheromones = new Grid()

    useEffect(() => {
        canvas = canvasRef.current
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight
        ctx = canvas.getContext('2d')
        canvasRect = canvas.getBoundingClientRect()

        pheromones.setDimensions(canvas.width, canvas.height)

        for(let i = 0; i < 100; i++){
            agents.push(new Agent())
        }

        agents.forEach(agent => {
            agent.setBounds(new Vector2(canvas.width, canvas.height))
        })

        requestAnimationFrame(loop)
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        mousePos.update(e.clientX - canvasRect.left, e.clientY - canvasRect.top)
    }

    const loop = (timestamp: number): FrameRequestCallback => {
        requestAnimationFrame(loop)
        const thisFrame = Date.now()
        const elapsed: number = thisFrame - lastFrame

        if (elapsed < speed) {
            return
        }

        // Draw start
        lastFrame = thisFrame
        frame++

        if (frame % pheromoneDrawSpeed === 0){
            // StackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, 1);
            const tempImageData = ctx.getImageData(0,0,canvas.width, canvas.height)
            const data = tempImageData.data;

            let unpacked = pheromones.unpack()

            for (let i = 0; i < data.length; i+=4){
                data[i] = 0
                data[i + 1] = unpacked[i/4] * (255/2)
                data[i + 2] = 0
                data[i + 3] = 255
            }


            ctx.putImageData(tempImageData,0,0)

        }
        // ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "#ffffff"
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
        agents.forEach(agent => {

            // Check collisions
            for (let i = 0; i < agents.length; i++){
                for (let j = i; j < agents.length; j++){
                    agents[i].checkCollision(agents[j])
                }
            }

            const pos : Vector2 = agent.tick(ctx, mousePos, elapsed, pheromones)
            pheromones.setOne(pos);

        })

        return
    }

    return (
        <div className={styles.container}>
            <canvas ref={canvasRef} className={styles.canvas} onMouseMove={(e) => handleMouseMove(e)}></canvas>
            <p>Speed: {speed}</p>
            <input type="range" min="1" max="1000" defaultValue={speed} onChange={(e) => speed = (+e.target.value)} />
        </div>
    )
}

export default Simulation