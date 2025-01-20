import * as fabric from 'fabric';
import React, { useEffect, useRef, useState } from 'react'
import placeHolderPath from '../Assets/Images/placeholder.png'
const Dummy = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const createBlobWithImage = (canvas, imageUrl) => {

        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.crossOrigin = "anonymous";

        imageElement.onload = () => {
            const imgW = imageElement.width;
            const imgH = imageElement.height;
            const canvasW = canvas.getWidth();
            const canvasH = canvas.getHeight();
            const scale = Math.min(100 / imgW, canvasH / imgH);
            canvas.renderAll();
            // console.log("ImageOptions", {
            //     left: Math.abs((canvasW - (imgW * scale)) / 2), // Center horizontally
            //     top: Math.abs((canvasW - (imgH * scale)) / 2),
            //     width: (imgW * scale),// Center vertically
            //     height: (imgH * scale)
            // });
            const blobPath = `
    M 150 50
    C 200 30, 250 80, 200 150
    C 150 220, 50 200, 60 150
    C 70 100, 100 70, 150 50
    Z
  `;
            const blob = new fabric.Path(blobPath, {
                left: 100,
                top: 100,
                scaleX: 1, // Scale the blob if needed
                scaleY: 1,
                fill: "transparent", // No fill for the blob itself
            });

            const fabricImage = new fabric.FabricImage(imageElement, {
                left: Math.abs((100 - (imgW * scale)) / 2), // Center horizontally
                top: Math.abs((100 - (imgH * scale)) / 2),
                scaleX: (scale),// Center vertically
                scaleY: (scale),
                //  clipPath: blob

            });
            canvas.add(blob);
            canvas.add(fabricImage);
            canvas.renderAll();
        };
    };

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new fabric.Canvas(canvasRef.current, {
                width: 540,
                height: 540,
                backgroundColor: '#ffffff'
            });

            // Define styles for subscript and superscript
            // text.styles = {
            //     0: {}, // No styles for the first character
            //     1: { fontSize: 10, deltaY: 10 }, // Subscript for "2" (smaller and lower)
            //     2: {}, // No styles for the last character
            // };

            // Add the text to the canvas
            initCanvas.renderAll()
            setCanvas(initCanvas);


            createBlobWithImage(
                initCanvas,
                "https://cdn.pixabay.com/photo/2016/11/21/03/56/landscape-1844226_960_720.png" // Replace with your image URL
            );
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