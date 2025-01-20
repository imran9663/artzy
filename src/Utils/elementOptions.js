export const rectOptions = {
  // Positioning
  left: 0, // X-coordinate on the canvas
  top: 0, // Y-coordinate on the canvas

  // Size
  width: 100, // Width of the rectangle
  height: 100, // Height of the rectangle

  // Corner Radius
  rx: 0, // Horizontal corner radius
  ry: 0, // Vertical corner radius

  // Fill and Stroke
  fill: "red", // Fill color or pattern
  stroke: "black", // Stroke (border) color
  strokeWidth: 1, // Width of the stroke
  strokeDashArray: null, // Pattern of dashes and gaps [dash, gap, dash, gap, ...]
  strokeDashOffset: 0, // Offset of the dash pattern
  strokeLineCap: "butt", // Line cap style for stroke ("butt", "round", "square")
  strokeLineJoin: "miter", // Line join style for stroke ("miter", "round", "bevel")
  strokeUniform: false, // Whether the stroke width scales with object scaling
  strokeMiterLimit: 4, // Limit for miter joins (applies when strokeLineJoin is "miter")

  // Background and Shadow
  backgroundColor: "", // Background color of the object
  shadow: null, // Shadow object or string representation (e.g., "2px 2px 5px rgba(0,0,0,0.5)")

  // Opacity
  opacity: 1, // Opacity (0 is transparent, 1 is fully opaque)

  // Transformations
  scaleX: 1, // Horizontal scaling factor
  scaleY: 1, // Vertical scaling factor
  angle: 0, // Rotation angle (degrees)
  skewX: 0, // Skew on the X-axis
  skewY: 0, // Skew on the Y-axis

  // Object Constraints
  flipX: false, // Whether to flip horizontally
  flipY: false, // Whether to flip vertically
  originX: "left", // Horizontal origin ("left", "center", "right")
  originY: "top", // Vertical origin ("top", "center", "bottom")
  lockMovementX: false, // Lock horizontal movement
  lockMovementY: false, // Lock vertical movement
  lockRotation: false, // Lock rotation
  lockScalingX: false, // Lock horizontal scaling
  lockScalingY: false, // Lock vertical scaling
  lockSkewingX: false, // Lock skewing on X-axis
  lockSkewingY: false, // Lock skewing on Y-axis
  lockScalingFlip: false, // Prevent flipping while scaling

  // Interactivity
  selectable: true, // Whether the object can be selected
  evented: true, // Whether the object emits events
  hoverCursor: "move", // Cursor style when hovering over the object
  moveCursor: "move", // Cursor style when moving the object

  // Border and Control Styles
  borderColor: "blue", // Color of the object's border when selected
  cornerColor: "red", // Color of the object's control corners
  cornerStrokeColor: "black", // Stroke color of the control corners
  cornerSize: 13, // Size of the control corners
  cornerStyle: "rect", // Corner style ("rect" or "circle")
  transparentCorners: true, // Whether corners are transparent
  rotatingPointOffset: 40, // Distance from the center for rotation controls

  // Custom Properties
  id: null, // Custom ID or unique identifier for the object

  // Clipping
  clipPath: null, // Another fabric object to act as a clipping mask

  // Rendering Options
  visible: true, // Whether the object is visible
  hasBorders: true, // Whether the object displays borders when selected
  hasControls: true, // Whether the object displays controls when selected
  hasRotatingPoint: true, // Whether the object has a rotating point
  perPixelTargetFind: false, // Whether per-pixel detection is used for events
  includeDefaultValues: true, // Include default values in serialized JSON

  // Animation
  dirty: true, // Mark the object as dirty for re-rendering
  cacheProperties: [ /* Array of properties to cache */],
  stateProperties: [ /* Array of properties to monitor for changes */],
};

export const textOptions = {
  // Content and Text
  text: "Sample Text", // The text content
  fontSize: 40, // Font size in pixels
  fontWeight: "normal", // Font weight ("normal", "bold", or a number like 400)
  fontFamily: "Arial", // Font family
  fontStyle: "normal", // Font style ("normal", "italic", "oblique")
  lineHeight: 1.16, // Line height (multiplier)
  textAlign: "left", // Text alignment ("left", "center", "right", "justify")
  fill: "#000000", // Fill color for the text
  stroke: null, // Stroke color for the text
  strokeWidth: 0, // Width of the text stroke
  textBackgroundColor: "", // Background color behind the text
  charSpacing: 0, // Character spacing in 1/1000 units of em
  direction: "ltr", // Text direction ("ltr", "rtl")

  // Advanced Text Styling
  styles: {}, // Object to apply styles to specific characters or ranges
  underline: false, // Whether the text is underlined
  overline: false, // Whether the text has an overline
  linethrough: false, // Whether the text has a line-through
  shadow: null, // Shadow for the text (string or shadow object)

  // Editing and Interactivity
  editable: true, // Whether the text is editable (fabric.IText)
  cursorColor: "#000000", // Color of the editing cursor
  cursorWidth: 2, // Width of the editing cursor
  cursorDelay: 1000, // Delay before cursor starts blinking (ms)
  cursorDuration: 600, // Duration of a single cursor blink (ms)
  selectionColor: "rgba(17, 119, 255, 0.3)", // Background color of text selection
  useNative: true, // Use native text editing features
  selectionStart: 0, // Start index of the selected text
  selectionEnd: 0, // End index of the selected text

  // Positioning and Dimensions
  left: 0, // X-coordinate on the canvas
  top: 0, // Y-coordinate on the canvas
  width: null, // Width of the textbox (fabric.Textbox)
  height: null, // Height of the textbox (fabric.Textbox)
  angle: 0, // Rotation angle in degrees
  scaleX: 1, // Horizontal scaling factor
  scaleY: 1, // Vertical scaling factor
  skewX: 0, // Skew along the X-axis
  skewY: 0, // Skew along the Y-axis

  // Object Constraints
  flipX: false, // Flip horizontally
  flipY: false, // Flip vertically
  lockMovementX: false, // Lock horizontal movement
  lockMovementY: false, // Lock vertical movement
  lockRotation: false, // Lock rotation
  lockScalingX: false, // Lock horizontal scaling
  lockScalingY: false, // Lock vertical scaling
  lockSkewingX: false, // Lock skewing on X-axis
  lockSkewingY: false, // Lock skewing on Y-axis
  lockScalingFlip: false, // Prevent flipping while scaling

  // Border and Controls
  hasBorders: true, // Display borders when selected
  hasControls: true, // Display controls for scaling and rotation
  cornerColor: "blue", // Color of the selection corners
  borderColor: "red", // Color of the selection border
  transparentCorners: true, // Transparent corners for selection

  // Rendering and Visibility
  visible: true, // Whether the text is visible
  opacity: 1, // Opacity (0 = fully transparent, 1 = fully opaque)

  // Clipping and Advanced Properties
  clipPath: null, // Clipping object
  dirty: true, // Marks the object as needing a re-render
  cacheProperties: [], // Properties to cache for performance
  stateProperties: [], // Properties to track for changes
};

export const elementStylesWhenSelected = {
  borderColor: "#ffb703",
  cornerColor: "transparent",
  cornerStrokeColor: "#ffb703",
  cornerSize: 10,
  cornerStyle: "circle",
  transparentCorners: false,
}