import JSZip from "jszip";
import { saveAs } from "file-saver";
import * as fabric from "fabric";
import React, { useEffect, useRef, useState } from "react";

const Dummy = () => {
    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);
    const [multipleCanvas, setMultipleCanvas] = useState([])
    // const downloadShapesAsSVG = (canvas) => {
    //     const zip = new JSZip();
    //     const folder = zip.folder("shapes");

    //     const objects = canvas.getObjects();
    //     objects.forEach((obj) => {
    //         const svgData = obj.toSVG();
    //         const wrappedSVG = `
    //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width="150" height="150">
    //     ${svgData}
    //   </svg>
    // `;
    //         folder.file(`${obj.id}.svg`, wrappedSVG);
    //     });

    //     // Generate and download the ZIP file
    //     zip.generateAsync({ type: "blob" }).then((content) => {
    //         saveAs(content, "shapes.zip");
    //     });
    // };

    // Example usage



    // Add some shapes
    const addShapesToCanvas = () => {
        const shapes = [
            "Circle",
            "Square",
            "Rectangle",
            "Triangle",
            "Rhombus",
            "Trapezoid",
            "Pentagon",
            "Hexagon",
            "Heptagon",
            "Octagon",
            "Nonagon",
            "Decagon",
            "Parallelogram",
            "Kite",
            "IsoscelesTrapezoid",
            "ScaleneTriangle",
            "IsoscelesTriangle",
            "EquilateralTriangle",
            "RightTriangle",
            "ObtuseTriangle",
            "AcuteTriangle",
            "Pentagram",
            "Hexagram",
            "Octagram",
            "Ellipse",
            "Parabola",
            "Hyperbola",
            "Crescent",
            "Cross",
            "Quadrilateral",
            "DoubleArrow",
            "BlockArrow",
        ];

        function createStar (points, radius) {
            const step = Math.PI / points;
            let vertices = [];

            // Calculate vertices for the star shape
            for (let i = 0; i < points * 2; i++) {
                const angle = step * i;
                const rad = i % 2 === 0 ? radius * 0.5 : (radius * 0.5) / 2; // Alternating radius
                const x = Math.cos(angle) * rad;
                const y = Math.sin(angle) * rad;
                vertices.push({ x, y });
            }
            return vertices;
        }


        const nonImplementedShapes = [];
        shapes.forEach((shape) => {
            const canvasId = shape;
            const canvasElement = document.createElement('canvas');
            canvasElement.id = canvasId;
            canvasElement.width = 75;
            canvasElement.height = 75;
            canvasContainerRef.current.appendChild(canvasElement);

            const fabricCanvas = new fabric.Canvas(canvasId);
            const size = 50; // Default size for shapes
            let x = (fabricCanvas.getWidth() - size) / 2; // Starting X coordinate
            let y = (fabricCanvas.getHeight() - size) / 2;; // Starting Y coordinate
            let fabricShape;

            switch (shape) {
                case "Circle":
                    fabricShape = new fabric.Circle({
                        id: shape,
                        left: x,
                        top: y,
                        radius: size / 2,
                        fill: "#9e9e9e",
                    });
                    break;
                case "Square":
                    fabricShape = new fabric.Rect({
                        id: shape,
                        left: x,
                        top: y,
                        width: size,
                        height: size,
                        fill: "#9e9e9e",
                    });
                    break;

                case "Rectangle":
                    fabricShape = new fabric.Rect({
                        id: shape,
                        left: x,
                        top: y,
                        width: size * 1.2,
                        height: size,
                        fill: "#9e9e9e",
                    });
                    break;

                case "Triangle":
                    fabricShape = new fabric.Triangle({
                        id: shape,
                        left: x,
                        top: y,
                        width: size,
                        height: size,
                        fill: "#9e9e9e",
                    });
                    break;

                case "Rhombus":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size / 2, y: 0 },
                            { x: size, y: size / 2 },
                            { x: size / 2, y: size },
                            { x: 0, y: size / 2 },
                        ],
                        {
                            id: shape,
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "Trapezoid":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size * 0.2, y: 0 },
                            { x: size * 0.8, y: 0 },
                            { x: size, y: size },
                            { x: 0, y: size },
                        ],
                        {
                            id: shape,
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "Pentagon":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size / 2, y: 0 },
                            { x: size, y: size * 0.38 },
                            { x: size * 0.81, y: size },
                            { x: size * 0.19, y: size },
                            { x: 0, y: size * 0.38 },
                        ],
                        {
                            id: shape,
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "Hexagon":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size * 0.5, y: 0 },
                            { x: size, y: size * 0.25 },
                            { x: size, y: size * 0.75 },
                            { x: size * 0.5, y: size },
                            { x: 0, y: size * 0.75 },
                            { x: 0, y: size * 0.25 },
                        ],
                        {
                            id: shape,
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "Heptagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(7, size / 2), {
                        id: shape,
                        left: x,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;

                case "Octagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(8, size / 2), {
                        id: shape,
                        left: x,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;

                case "Nonagon":
                    fabricShape = new fabric.Polygon(generatePolygonPoints(9, size / 2), {
                        id: shape,
                        left: x,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;

                case "Decagon":
                    fabricShape = new fabric.Polygon(
                        generatePolygonPoints(10, size / 2),
                        {
                            id: shape,
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "Parallelogram":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size * 0.2, y: 0 },
                            { x: size, y: 0 },
                            { x: size * 0.8, y: size },
                            { x: 0, y: size },
                        ],
                        {
                            id: shape,
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "Kite":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: size / 2, y: 0 },
                            { x: size, y: size / 2 },
                            { x: size / 2, y: size },
                            { x: 0, y: size / 2 },
                        ],
                        {
                            id: shape,
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "IsoscelesTrapezoid":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 10, y: 0 },
                            { x: 40, y: 0 },
                            { x: 50, y: 30 },
                            { x: 0, y: 30 },
                        ],
                        {
                            d: shape,
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;
                case "ScaleneTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 50, y: 0 },
                            { x: 30, y: 40 },
                        ],
                        {
                            left: x,
                            id: shape,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;
                case "IsoscelesTriangle":
                    fabricShape = new fabric.Triangle({
                        width: 50,
                        height: 50,
                        left: x,
                        id: shape,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;
                case "EquilateralTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 25, y: 0 },
                            { x: 50, y: 43 },
                            { x: 0, y: 43 },
                        ],
                        {
                            left: x,
                            id: shape,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;
                case "RightTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 50, y: 0 },
                            { x: 0, y: 50 },
                        ],
                        {
                            left: x,
                            id: shape,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;
                case "ObtuseTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 70, y: 0 },
                            { x: 20, y: 50 },
                        ],
                        {
                            left: x,
                            id: shape,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;
                case "AcuteTriangle":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 10, y: 0 },
                            { x: 50, y: 0 },
                            { x: 30, y: 40 },
                        ],
                        {
                            left: x,
                            id: shape,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "Pentagram":
                    const pentVertices = createStar(5, size);
                    fabricShape = new fabric.Polygon(pentVertices, {
                        left: x,
                        id: shape,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;
                case "Hexagram":
                    // Comment: Hexagram is a six-pointed star and can be created by combining two triangles.
                    const vertices = createStar(6, size);
                    fabricShape = new fabric.Polygon(vertices, {
                        left: x,
                        id: shape,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;
                case "Octagram":
                    // Comment: Octagram is an eight-pointed star and can be created with overlapping squares.
                    const eightVertices = createStar(8, size);
                    fabricShape = new fabric.Polygon(eightVertices, {
                        left: x,
                        id: shape,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;
                case "Ellipse":
                    fabricShape = new fabric.Ellipse({
                        rx: 25,
                        ry: 15,
                        left: x,
                        id: shape,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;
                case "Parabola":
                    // Comment: Parabola is not natively supported in Fabric.js and requires a custom path.
                    fabricShape = new fabric.Path("M 0 50 Q 25 0 50 50", {
                        left: x,
                        id: shape,
                        top: y,
                        fill: "",
                        stroke: "#9e9e9e",
                        strokeWidth: 2,
                    });
                    break;
                case "Hyperbola":
                    // Comment: Hyperbola is not natively supported in Fabric.js and requires a custom path.
                    fabricShape = new fabric.Path("M 0 25 Q 25 50 50 25", {
                        left: x,
                        id: shape,
                        top: y,
                        fill: "",
                        stroke: "#9e9e9e",
                        strokeWidth: 2,
                    });
                    break;
                case "Arrow":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 10 },
                            { x: 40, y: 10 },
                            { x: 40, y: 0 },
                            { x: 60, y: 20 },
                            { x: 40, y: 40 },
                            { x: 40, y: 30 },
                            { x: 0, y: 30 },
                        ],
                        {
                            left: x,
                            id: shape,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;
                case "Crescent":
                    // Comment: Crescent requires two overlapping circles with different radii.
                    fabricShape = new fabric.Group(
                        [
                            new fabric.Circle({
                                radius: 20,
                                left: 10,
                                top: 10,
                                fill: "#9e9e9e",
                            }),
                            new fabric.Circle({
                                radius: 15,
                                left: 15,
                                top: 15,
                                fill: "#e3e3e3",
                            }),
                        ],
                        { left: x, id: shape, top: y }
                    );
                    break;
                case "Cross":
                    fabricShape = new fabric.Group(
                        [
                            new fabric.Rect({
                                width: 10,
                                height: 40,
                                left: 15,
                                top: 0,
                                fill: "#9e9e9e",
                            }),
                            new fabric.Rect({
                                width: 40,
                                height: 10,
                                left: 0,
                                top: 15,
                                fill: "#9e9e9e",
                            }),
                        ],
                        { left: x, id: shape, top: y }
                    );
                    break;
                case "Heart":
                    fabricShape = new fabric.Path("M 0 30 Q 25 0 50 30 T 0 30 Z", {
                        left: x,
                        id: shape,
                        top: y,
                        fill: "#9e9e9e",
                    });
                    break;
                case "Quadrilateral":
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 50, y: 10 },
                            { x: 40, y: 50 },
                            { x: 10, y: 40 },
                        ],
                        {
                            left: x,
                            id: shape,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;
                case "StraightArrow":
                    // A simple straight arrow using Polyline
                    fabricShape = new fabric.Polyline(
                        [
                            { x: 0, y: 0 },
                            { x: size, y: 0 },
                            { x: size - 10, y: -10 },
                            { x: size, y: 0 },
                            { x: size - 10, y: 10 },
                        ],
                        {
                            left: x,
                            top: y,
                            fill: "transparent",
                            stroke: "black",
                            strokeWidth: 2,
                        }
                    );
                    break;

                case "CurvedArrow":
                    // A curved arrow using Polyline
                    fabricShape = new fabric.Polyline(
                        [
                            { x: 0, y: 0 },
                            { x: size / 2, y: -size / 3 },
                            { x: size, y: 0 },
                            { x: size - 10, y: -10 },
                            { x: size, y: 0 },
                            { x: size - 10, y: 10 },
                        ],
                        {
                            left: x,
                            top: y,
                            fill: "transparent",
                            stroke: "black",
                            strokeWidth: 2,
                        }
                    );
                    break;

                case "DoubleArrow":
                    // Double-ended arrow using Polygon
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: 10, y: -10 },
                            { x: 10, y: -5 },
                            { x: size - 10, y: -5 },
                            { x: size - 10, y: -10 },
                            { x: size, y: 0 },
                            { x: size - 10, y: 10 },
                            { x: size - 10, y: 5 },
                            { x: 10, y: 5 },
                            { x: 10, y: 10 },
                        ],
                        {
                            left: x,
                            top: y,
                            fill: "#9e9e9e",
                        }
                    );
                    break;

                case "BlockArrow":
                    // A block arrow using Polygon
                    fabricShape = new fabric.Polygon(
                        [
                            { x: 0, y: 0 },
                            { x: size - 20, y: 0 },
                            { x: size - 20, y: -10 },
                            { x: size, y: 10 },
                            { x: size - 20, y: 30 },
                            { x: size - 20, y: 20 },
                            { x: 0, y: 20 },
                        ],
                        {
                            left: x,
                            top: y,
                            fill: "#9e9e9e",

                        }
                    );
                    break;

                default:
                    console.warn(`Shape not implemented: ${shape}`);
                    nonImplementedShapes.push(shape);
                    break;
            }

            if (fabricShape) {
                fabricCanvas.add(fabricShape);
                fabricCanvas.renderAll();
                setMultipleCanvas((prev) => [...prev, { id: canvasId, fabricCanvas }])
            }
        });
        console.log("nonInpmShapes", nonImplementedShapes);
    };

    const generatePolygonPoints = (sides, radius) => {
        const points = [];
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            points.push({
                x: radius + radius * Math.cos(angle),
                y: radius + radius * Math.sin(angle),
            });
        }
        return points;
    };
    const downloadAllCanvases = async (format = 'png') => {
        const zip = new JSZip();

        for (const { id, fabricCanvas } of multipleCanvas) {
            let dataURL;
            if (format === 'svg') {
                dataURL = fabricCanvas.toSVG();
                zip.file(`${id}.svg`, dataURL);
            } else {
                dataURL = fabricCanvas.toDataURL({ format: 'png' });
                const response = await fetch(dataURL);
                const blob = await response.blob();
                zip.file(`${id}.png`, blob);
            }
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `canvases.zip`);
    };
    const handleUploadBtnClick = (id) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.png, .jpeg, .jpg, .png, .svg, .webp';
        input.onchange = (event) => {
            console.log("event", input.files);

        }
        input.click()
    }
    return (
        <div className="">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse d-flex flex-row justify-content-between" id="collapsibleNavId">
                        <button onClick={() => handleUploadBtnClick("upload-")} className="btn btn-warning">UPLOAD</button>
                        <button
                            onClick={() => downloadAllCanvases('svg')}
                            className="btn btn-success"
                        >
                            Download
                        </button>
                        <button
                            onClick={() => addShapesToCanvas()}
                            className="btn btn-danger"
                        >
                            Add shapes
                        </button>
                    </div>
                </div>
            </nav>


            <div ref={canvasContainerRef} className="d-flex flex-row my-2 gap-2 flex-wrap">


            </div>
        </div>
    );
};

export default Dummy;
