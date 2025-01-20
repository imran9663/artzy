export const randId = () => "id" + Math.random().toString(16).slice(2);
export function generateRandomHex () {
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        const randomValue = Math.floor(Math.random() * 16); // Generate a random number from 0 to 15
        hex += randomValue.toString(16); // Convert to hex and append
    }
    return hex;
}
export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
};
export function hexToRgbaWithAlpha (hex) {
// Validate the hex format
    if (
        !/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/.test(
            hex
        )
    ) {
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
export function rgbOrRgbaToHex (input) {
    // Match RGB or RGBA values using a regular expression
    const match = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);

    if (!match) {
        throw new Error("Invalid RGB or RGBA format");
    }

    // Extract red, green, blue, and optional alpha values
    const red = parseInt(match[1]);
    const green = parseInt(match[2]);
    const blue = parseInt(match[3]);
    const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;

    // Validate RGB and alpha ranges
    if (
        red < 0 ||
        red > 255 ||
        green < 0 ||
        green > 255 ||
        blue < 0 ||
        blue > 255 ||
        alpha < 0 ||
        alpha > 1
    ) {
        throw new Error("RGB or alpha values out of range");
    }

    // Convert RGB to two-digit hex values
    const hexRed = red.toString(16).padStart(2, "0");
    const hexGreen = green.toString(16).padStart(2, "0");
    const hexBlue = blue.toString(16).padStart(2, "0");

    // Convert alpha to two-digit hex (scaled to 0–255)
    const hexAlpha = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0");

    // Return the HEX color code
    return `#${hexRed}${hexGreen}${hexBlue}${hexAlpha}`;
}
export const convertPaletteToFabricGradientV2 = (object, colorObject) => {
    if (!object || !colorObject || !colorObject.isGradient) {
        throw new Error(
            "Invalid input: Canvas and gradient color object are required."
        );
    }
    const { gradientType, degrees, colors } = colorObject;
    // Validate gradient type
    const isLinear = gradientType === "linear-gradient";
    const isRadial = gradientType === "radial-gradient";
    if (!isLinear && !isRadial) {
        throw new Error(
            "Unsupported gradient type. Only linear and radial gradients are supported."
        );
    }

    // Convert RGBA to HEX with Alpha
    const rgbaToHexWithAlpha = (rgba) => {
        const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)/);
        if (!match) throw new Error(`Invalid RGBA color format: ${rgba}`);
        const [r, g, b, a] = match.slice(1).map((value, index) => {
            return index < 3
                ? parseInt(value, 10)
                : Math.round(parseFloat(value) * 255);
        });
        return `#${((1 << 24) | (r << 16) | (g << 8) | b)
            .toString(16)
            .slice(1)
            .toUpperCase()}${a.toString(16).padStart(2, "0").toUpperCase()}`;
    };

    // Parse color stops
    const colorStops = [];
    colors.forEach((color) => {
        colorStops.push({
            offset: color.left / 100,
            color: color?.value?.startsWith("#")
                ? color.value
                : rgbaToHexWithAlpha(color.value),
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
            const y1 =
                0.5 * object.height - 0.5 * object.height * Math.sin(radians);
            const x2 = 0.5 * object.width + 0.5 * object.width * Math.cos(radians);
            const y2 =
                0.5 * object.height + 0.5 * object.height * Math.sin(radians);

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
export const googleFonts = [
    "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Source Sans Pro",
    "Roboto Slab", "Playfair Display", "Nunito", "Merriweather", "Raleway",
    "Ubuntu", "PT Sans", "PT Serif", "Oswald", "Work Sans", "Noto Sans",
    "Noto Serif", "Inter", "Quicksand", "Karla", "Manrope", "IBM Plex Sans",
    "Space Grotesk", "Space Mono", "Heebo", "Asap", "Barlow", "Fira Sans",
    "Overpass", "Cabin", "Josefin Sans", "Varela Round", "Crimson Pro",
    "Arvo", "Mukta", "Titillium Web", "Dosis", "Cairo", "Mulish", "Libre Baskerville",
    "Bebas Neue", "Anton", "Zilla Slab", "Spectral", "DM Sans", "DM Serif Display",
    "Lexend", "Chivo", "Hind", "Epilogue", "Teko", "Monda", "Exo 2", "Prompt",
    "Rufina", "ABeeZee", "Fjalla One", "Lora", "Cardo", "Amatic SC", "Dancing Script",
    "Shadows Into Light", "Indie Flower", "Cookie", "Pacifico", "Caveat", "Baloo 2",
    "Sarabun", "Alfa Slab One", "Archivo", "Vollkorn", "Cinzel", "Alegreya",
    "Alegreya Sans", "Comfortaa", "Signika", "Signika Negative", "Libre Franklin",
    "Kanit", "Rubik", "Encode Sans", "Bitter", "Quattrocento", "Play",
    "Nanum Gothic", "Nanum Myeongjo", "Gothic A1", "Great Vibes", "Parisienne",
    "Courgette", "Sacramento", "Gloria Hallelujah", "Fredoka One", "Expletus Sans",
    "Patua One", "Abril Fatface", "Cormorant Garamond", "Cormorant Infant",
    "El Messiri", "Piazzolla", "Aref Ruqaa", "Literata", "Archivo Narrow"
];
export const filterFonts = (data) => {
    const filteredFonts = data && googleFonts.map(fontName => data.filter(fontFamily => fontFamily.family === fontName)[0])
    const newValueFonts = filteredFonts.filter(item => !!item).sort((fmA, fmB) => {
        if (fmA.family.toUpperCase() > fmB.family.toUpperCase()) return 1
        if (fmA.family.toUpperCase() < fmB.family.toUpperCase()) return -1
        return 0
    })
    return newValueFonts
}
