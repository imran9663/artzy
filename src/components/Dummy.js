import { Canvas, Gradient, IText } from 'fabric';
import React, { useEffect, useRef, useState } from 'react'

const Dummy = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 540,
                height: 540,
                backgroundColor: '#ffffff'
            });
            const gradient = new Gradient("#294951FF")
            // Create an IText object
            const text = new IText("Imran Pasha I", {
                left: 50,
                top: 50,
                fontSize: 40,
                fontFamily: "Arial",
                charSpacing: 500
            });

            // Define styles for subscript and superscript
            // text.styles = {
            //     0: {}, // No styles for the first character
            //     1: { fontSize: 10, deltaY: 10 }, // Subscript for "2" (smaller and lower)
            //     2: {}, // No styles for the last character
            // };

            // Add the text to the canvas
            initCanvas.add(text)
            initCanvas.renderAll()
            setCanvas(initCanvas)
            return (() => {
                initCanvas.dispose()
            })
        }

    }, [])

    return (
        <div className="w-100 h-100 bg-light d-flex justify-content-center align-items-center">
            <canvas ref={canvasRef} className="canvas"></canvas>
        </div>
    )
}

export default Dummy