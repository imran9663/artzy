
import * as fabric from 'fabric'
import { elementStylesWhenSelected } from '../Utils/elementOptions';



export const setupCanvas = (propCanvas, parentID, originalWidth, originalHeight) => {
    // Set the original dimensions for export
    const parent = document.getElementById(parentID);
    propCanvas.originalWidth = originalWidth;
    propCanvas.originalHeight = originalHeight;


    // Calculate scale to fit the viewport while maintaining aspect ratio
    const viewportWidth = parent.clientWidth;
    const viewportHeight = parent.clientHeight;

    const scaleWidth = viewportWidth / originalWidth;
    const scaleHeight = viewportHeight / originalHeight;
    const scaleFactor = (Math.min(scaleWidth, scaleHeight));
    const scaledWidth = originalWidth * scaleFactor;
    const scaledHeight = originalHeight * scaleFactor;

    // Resize propCanvas to fit the viewport
    propCanvas.setWidth(scaledWidth);
    propCanvas.setHeight(scaledHeight);
    propCanvas.setZoom(scaleFactor);
    propCanvas.set({ ...elementStylesWhenSelected })
    propCanvas.renderAll()
    return propCanvas
};
export function enableScaleOnScroll (divId) {
    const element = document.getElementById(divId);

    if (!element) {
        console.error("Element not found");
        return;
    }

    // Set initial scale
    let scale = 1;

    // Add wheel event listener
    element.addEventListener("wheel", (event) => {
        event.preventDefault(); // Prevent default scroll behavior

        // Adjust scale based on scroll direction
        const delta = event.deltaY > 0 ? -0.1 : 0.1; // Scroll up increases scale, scroll down decreases
        scale = Math.min(Math.max(scale + delta, 0.5), 3); // Clamp scale between 0.5 and 3

        // Apply the scale transformation
        element.style.transform = `scale(${scale})`;
    });
}
export const downloadCanvas = (canvas, format = "png", filename = "canvas") => {
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
export function createStar (points, radius) {
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
export const generatePolygonPoints = (sides, radius) => {
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
export const createBlobWithImage = (canvas, imageUrl) => {
    const objWidth = 150;
    const objHeight = 150;
    const objScaleX = 1;
    const objScaleY = 1;
    const zoom = canvas.getZoom();
    const scaledWidth = objWidth * objScaleX
    const scaledHeight = objHeight * objScaleY
    const canvasWidth = canvas.getWidth() / zoom;
    const canvasHeight = canvas.getHeight() / zoom;

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
            left: (canvasWidth / 2) - ((scaledWidth) / 2),
            top: (canvasHeight / 2) - (scaledHeight / 2),
            scaleX: 1, // Scale the blob if needed
            scaleY: 1,
            fill: "transparent", // No fill for the blob itself
            stroke: "#000000", // No fill for the blob itself
            strokeWidth: 1, // No fill for the blob itself
        });
        console.log('blob', blob);
        blob.set({
            width: 520,
            height: 520
        })


        const blobW = blob.width;
        const blobH = blob.height;

        const fabricImage = new fabric.FabricImage(imageElement, {
            left: Math.abs((blobW - (imgW * scale)) / 2), // Center horizontally
            top: Math.abs((blobH - (imgH * scale)) / 2),
            scaleX: (scale),// Center vertically
            scaleY: (scale),
            clipPath: blob

        });
        canvas.add(blob);
        canvas.add(fabricImage);
        canvas.renderAll();
    };
};
export const bringObjToCenter = (canvas, selectedObject) => {
    const objWidth = selectedObject.width;
    const objHeight = selectedObject.height;
    const objScaleX = selectedObject.scaleX;
    const objScaleY = selectedObject.scaleY;
    const zoom = canvas.getZoom();
    const scaledWidth = objWidth * objScaleX
    const scaledHeight = objHeight * objScaleY
    const canvasWidth = canvas.getWidth() / zoom;
    const canvasHeight = canvas.getHeight() / zoom;
    selectedObject.set({
        left: (canvasWidth / 2) - ((scaledWidth) / 2),
        top: (canvasHeight / 2) - (scaledHeight / 2)
    });
    canvas.add(selectedObject);
    canvas.renderAll()
}

export function handleImageToCanvas (canvas, imageUrl) {
    // Ensure the canvas object is initialized
    if (!canvas || !imageUrl) {
        console.error("Canvas or Image URL is missing.");
        return;
    }

    // Add the image to the canvas

    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.crossOrigin = "anonymous";

    imageElement.onload = () => {
        const imgW = imageElement.width;
        const imgH = imageElement.height;
        const canvasW = canvas.getWidth();
        const canvasH = canvas.getHeight();
        const scale = Math.min(canvasW / imgW, canvasH / imgH);



        const fabricImage = new fabric.FabricImage(imageElement, {
            // left: Math.abs((canvasW - (imgW * scale)) / 2), // Center horizontally
            // top: Math.abs((canvasW - (imgH * scale)) / 2),
            scaleX: (scale),// Center vertically
            scaleY: (scale)

        });
        bringObjToCenter(canvas, fabricImage)
    };
}