import { Gradient } from "fabric";

export const randId = () => "id" + Math.random().toString(16).slice(2)
export function generateRandomHex () {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        const randomValue = Math.floor(Math.random() * 16); // Generate a random number from 0 to 15
        hex += randomValue.toString(16); // Convert to hex and append
    }
    return hex;
}
export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}
export function rgbToHex (rgb) {
    // Extract the RGB values using a regular expression
    const rgbValues = rgb.match(/\d+/g);

    if (!rgbValues || rgbValues.length < 3) return


    // Convert each RGB value to a two-digit hex code
    const hex = rgbValues.slice(0, 3).map((value) => {
        const hexValue = parseInt(value).toString(16);
        return hexValue.padStart(2, "0"); // Ensure two-digit format
    });

    // Join the hex values and prefix with '#'
    return `#${hex.join("")}`;
}
export function rgbaToHex (rgba) {
    // Extract the RGBA values using a regular expression
    const rgbaValues = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);

    if (!rgbaValues) {
        throw new Error("Invalid RGBA format");
    }

    // Extract red, green, blue, and alpha components
    const red = parseInt(rgbaValues[1]);
    const green = parseInt(rgbaValues[2]);
    const blue = parseInt(rgbaValues[3]);
    const alpha = parseFloat(rgbaValues[4]);

    // Ensure values are within valid ranges
    if (
        red < 0 || red > 255 ||
        green < 0 || green > 255 ||
        blue < 0 || blue > 255 ||
        alpha < 0 || alpha > 1
    ) {
        throw new Error("RGBA values out of range");
    }

    // Convert each component to hex
    const hexRed = red.toString(16).padStart(2, "0");
    const hexGreen = green.toString(16).padStart(2, "0");
    const hexBlue = blue.toString(16).padStart(2, "0");
    const hexAlpha = Math.round(alpha * 255).toString(16).padStart(2, "0");

    // Combine into a HEXA color code
    return `#${hexRed}${hexGreen}${hexBlue}${hexAlpha}`;
}
export function hexToRgb (hex) {
    // Ensure the hex string is valid


    // Normalize 3-digit hex to 6-digit hex
    if (hex.length === 4) {
        hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }

    // Extract the red, green, and blue components
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);

    // Return the RGB string
    return `rgba(${red}, ${green}, ${blue})`;
}
export function hexToRgbaWithAlpha (hex) {
    // Validate the hex format
    if (!/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/.test(hex)) {
        throw new Error("Invalid hex color format");
    }

    // Normalize 3-digit and 4-digit hex to 6-digit and 8-digit hex
    if (hex.length === 4) {
        hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}ff`;
    } else if (hex.length === 5) {
        hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}${hex[4]}${hex[4]}`;
    } else if (hex.length === 7) {
        hex += "ff"; // Add full opacity if no alpha is provided
    }

    // Extract red, green, blue, and alpha components
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);
    const alpha = parseInt(hex.slice(7, 9), 16) / 255; // Normalize alpha to 0–1 range

    // Return the RGBA string
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
export const convertPaletteToFabricGradientV2 = (object, colorObject) => {
    if (!object || !colorObject || !colorObject.isGradient) {
        throw new Error("Invalid input: Canvas and gradient color object are required.");
    }
    const { gradientType, degrees, colors } = colorObject;
    // Validate gradient type
    const isLinear = gradientType === "linear-gradient";
    const isRadial = gradientType === "radial-gradient";
    if (!isLinear && !isRadial) {
        throw new Error("Unsupported gradient type. Only linear and radial gradients are supported.");
    }

    // Convert RGBA to HEX with Alpha
    const rgbaToHexWithAlpha = (rgba) => {
        const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)/);
        if (!match) throw new Error(`Invalid RGBA color format: ${rgba}`);
        const [r, g, b, a] = match.slice(1).map((value, index) => {
            return index < 3 ? parseInt(value, 10) : Math.round(parseFloat(value) * 255);
        });
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}${a.toString(16).padStart(2, '0').toUpperCase()}`;
    };

    // Parse color stops
    const colorStops = [];
    colors.forEach((color) => {
        colorStops.push({
            offset: color.left / 100,
            color: color?.value?.startsWith('#') ? color.value : rgbaToHexWithAlpha(color.value)
        }); // Normalize offset to 0-1
    });

    // Define gradient coordinates
    // Define gradient coordinates
    const coords = isLinear
        ? (() => {
            const angle = parseFloat(degrees) || 0;
            const radians = (angle * Math.PI) / 180;

            // Compute the coordinates based on the angle and object's dimensions
            const x1 = 0.5 * object.width - 0.5 * object.width * Math.cos(radians);
            const y1 = 0.5 * object.height - 0.5 * object.height * Math.sin(radians);
            const x2 = 0.5 * object.width + 0.5 * object.width * Math.cos(radians);
            const y2 = 0.5 * object.height + 0.5 * object.height * Math.sin(radians);

            return { x1, y1, x2, y2 };
        })()
        : {
            x1: object.width / 2, // Center of the inner circle
            y1: object.height / 2,
            r1: 0, // Inner radius
            x2: object.width / 2, // Center of the outer circle
            y2: object.height / 2,
            r2: Math.max(object.width, object.height) / 2, // Full object radius
        };


    // Create the Fabric.js gradient object
    const gradient = {
        type: isLinear ? "linear" : "radial",
        coords,
        colorStops,
    };

    return gradient;
};

