import React, { useEffect, useRef } from "react";
import { Canvas, Circle, Gradient, Rect } from "fabric";
import { convertPaletteToFabricGradient, convertPaletteToFabricGradientV2 } from "../Utils/common";

const Dummy = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Initialize Fabric.js canvas
        const canvas = new Canvas(canvasRef.current, {
            width: 800, // Canvas width
            height: 600, // Canvas height
            backgroundColor: "#000", // Background color
        });

        // Create a circle
        const rect = new Rect({
            left: 100,
            top: 100,
            width: 450,// Fill will be set to a gradient
            height: 450,// Fill will be set to a gradient
        });

        // Add the rect to the canvas
        canvas.add(rect);
        const colorObject = {
            "isGradient": true,
            "gradientType": "linear-gradient",
            "degrees": "90deg",
            "colors": [
                { "value": "rgba(38, 99, 150, 0.8)", "left": 100 },
                { "value": "rgba(85, 255, 0, 0.8)", "left": 50 },
            ]
        }


        rect.fill = new Gradient(convertPaletteToFabricGradientV2(rect, colorObject));
        // Create a gradient using the Gradient constructor

        // Apply the gradient to the circle


        // Render the canvas
        canvas.renderAll();

        // Cleanup on component unmount
        return () => {
            canvas.dispose();
        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="fabric-canvas" />
        </div>
    );
};

export default Dummy;
