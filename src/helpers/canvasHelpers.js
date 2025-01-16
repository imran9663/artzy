
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
    // const line = new fabric.Line([0, originalHeight / 2, originalWidth, originalHeight / 2], {
    //     stroke: "red",
    //     selectable: false
    // });
    // propCanvas.add(line)
    // const line2 = new fabric.Line([originalWidth / 2, 0, originalWidth / 2, originalHeight], {
    //     stroke: "blue",
    //     selectable: false
    // });
    // propCanvas.add(line2)
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