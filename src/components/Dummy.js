import React, { useEffect, useRef, useState } from 'react';
import { Canvas, fabric, Group, Line, Triangle } from 'fabric';
import { setupCanvas } from '../helpers/canvasHelpers';

const Dummy = () => {
    const canvasRef = useRef(null);
    const [canvas, setcanvas] = useState(null)


    const downloadCanvas = (canvas, format = "png", filename = "canvas") => {
        // Backup current canvas state
        const currentWidth = canvas.getWidth();
        const currentHeight = canvas.getHeight();
        const currentZoom = canvas.getZoom();

        // Resize canvas to original dimensions for export
        canvas.setWidth(canvas.originalWidth);
        canvas.setHeight(canvas.originalHeight);
        canvas.setZoom(1);

        const dataURL = canvas.toDataURL({
            format,
            multiplier: 1,
            enableRetinaScaling: true,
        });

        // Restore canvas to scaled dimensions
        canvas.setWidth(currentWidth);
        canvas.setHeight(currentHeight);
        canvas.setZoom(currentZoom);

        // Trigger download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${filename}.${format}`;
        link.click();
    };




    // Set up the canvas with original dimensions



    useEffect(() => {
        const initCanvas = new Canvas(canvasRef.current);
        const responsiveCanvas = setupCanvas(initCanvas, 540, 540);
        setcanvas(responsiveCanvas);
        // Helper Function to Create a Grouped Arrow
        const createGroupedArrow = (x1, y1, x2, y2, color = 'black', width = 5) => {
            // Line (Arrow Tail)
            const line = new Line([x1, y1, x2, y2], {
                stroke: color,
                strokeWidth: width,
                selectable: false,
                originX: 'center',
                originY: 'center',
            });

            // Arrowhead (Triangle)
            const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
            const arrowHead = new Triangle({
                left: x2,
                top: y2,
                width: 20,
                height: 20,
                fill: color,
                angle: angle + 90,
                originX: 'center',
                originY: 'center',
            });

            // Group Both
            const group = new Group([line, arrowHead], {
                selectable: true,
                hasControls: true,
                originX: 'center',
                originY: 'center',
            });

            return group;
        };

        // Add Simple Grouped Arrow
        const simpleArrow = createGroupedArrow(50, 100, 150, 100, 'black', 5);
        initCanvas.add(simpleArrow);

        // Add Another Grouped Arrow (Diagonal)
        const diagonalArrow = createGroupedArrow(200, 200, 300, 300, 'blue', 5);
        initCanvas.add(diagonalArrow);

        // Add Dashed Grouped Arrow
        const dashedArrowLine = new Line([400, 400, 500, 400], {
            stroke: 'purple',
            strokeWidth: 5,
            strokeDashArray: [10, 5],
            selectable: false,
            originX: 'center',
            originY: 'center',
        });

        const dashedArrowHead = new Triangle({
            left: 500,
            top: 400,
            width: 20,
            height: 20,
            fill: 'purple',
            angle: 0 + 90,
            originX: 'center',
            originY: 'center',
        });

        const dashedArrow = new Group([dashedArrowLine, dashedArrowHead], {
            selectable: true,
            hasControls: true,
            originX: 'center',
            originY: 'center',
        });

        initCanvas.add(dashedArrow);

        return () => {
            initCanvas.dispose();
        };
    }, []);

    return <>
        <button onClick={() => downloadCanvas(canvas, "png", "my_canvas_image")} className="btn btn-success" type="button">downLoad</button>
        <canvas ref={canvasRef} />
    </>;
};

export default Dummy;
