export const setupCanvas = (propCanvas, parentID, originalWidth, originalHeight) => {
    // Set the original dimensions for export
    const parent = document.getElementById(parentID);
    propCanvas.originalWidth = originalWidth;
    propCanvas.originalHeight = originalHeight;

    console.log("parent.clientWidth", parent.clientWidth, parent.clientHeight);

    // Calculate scale to fit the viewport while maintaining aspect ratio
    const viewportWidth = parent.clientWidth;
    const viewportHeight = parent.clientHeight;

    const scaleWidth = viewportWidth / originalWidth;
    const scaleHeight = viewportHeight / originalHeight;
    const scaleFactor = Math.min(scaleWidth, scaleHeight);

    const scaledWidth = originalWidth * scaleFactor;
    const scaledHeight = originalHeight * scaleFactor;

    // Resize propCanvas to fit the viewport
    propCanvas.setWidth(scaledWidth);
    propCanvas.setHeight(scaledHeight);
    propCanvas.setZoom(scaleFactor);

    propCanvas.renderAll()
    return propCanvas
};
export function enableScaleOnScroll (divId) {
    console.log("divId", divId);

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