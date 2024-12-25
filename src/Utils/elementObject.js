export const rectangleOptions = {
    id: "",
    name: "rectangle",
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    fill: "#ff0000",
    draggable: true,
    cornerRadius: 0,
    stroke: "#000000",
    strokeWidth: 0,
    // strokeEnabled: true,
    shadowColor: "#3c4043",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0,
    opacity: 1,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,

}
export const circleOptions = {
    id: "",
    name: "circle",
    x: 0,
    y: 0,
    radius: 10, // Circle-specific property instead of width and height
    fill: "#ff0000", // Circle fill color
    draggable: true,
    stroke: "#000000", // Circle border color
    strokeWidth: 0, // Border thickness
    // strokeEnabled: true, // Uncomment if needed
    shadowColor: "#3c4043", // Shadow color
    shadowBlur: 10, // Blur amount for shadow
    shadowOffsetX: 10, // Horizontal offset of shadow
    shadowOffsetY: 10, // Vertical offset of shadow
    shadowOpacity: 0, // Opacity of shadow
    opacity: 1, // Opacity of circle
    rotation: 0, // Rotation (not commonly used for circles)
    scaleX: 1, // Horizontal scale factor
    scaleY: 1, // Vertical scale factor
};
export const arrowOptions = {
    id: "",
    name: "arrow",
    points: [0, 0, 50, 50], // Starting and ending coordinates (x1, y1, x2, y2)
    pointerLength: 10, // Length of the arrowhead
    pointerWidth: 10, // Width of the arrowhead
    fill: "#ff0000", // Fill color of the arrowhead
    stroke: "#000000", // Border color of the arrow body
    strokeWidth: 2, // Thickness of the arrow line
    draggable: true, // Enables dragging
    shadowColor: "#333", // Shadow color
    shadowBlur: 10, // Blur amount for shadow
    shadowOffsetX: 5, // Horizontal shadow offset
    shadowOffsetY: 5, // Vertical shadow offset
    shadowOpacity: 0, // Shadow opacity
    opacity: 1, // Arrow opacity
    rotation: 0, // Rotation of the arrow
    scaleX: 1, // Horizontal scale factor
    scaleY: 1, // Vertical scale factor
    tension: 0, // Curve tension for a smooth, curvy arrow
    lineCap: "round", // Line cap style ("butt", "round", "square")
    draggable: true
};

