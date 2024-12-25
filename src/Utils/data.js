export const elementShapes = [
    {
        "type": "Rect",
        "props": {
            "x": 0,
            "y": 0,
            "width": 300,
            "height": 300,
            "fill": "#ffcccb" // Light Red
            , "draggable": true
            , "draggable": true
        }
    },
    {
        "type": "Rect",
        "props": {
            "x": 50,
            "y": 50,
            "width": 200,
            "height": 200,
            "fill": "#add8e6" // Light Blue
            , "draggable": true
        }
    },
    {
        "type": "Text",
        "props": {
            "x": 100,
            "y": 100,
            "text": "Hello, World!",
            "fontSize": 20,
            "fill": "#00008b", // Dark Blue
            "fontFamily": "Arial"
            , "draggable": true
        }
    },
    {
        "type": "Circle",
        "props": {
            "x": 150,
            "y": 150,
            "radius": 50,
            "fill": "#90ee90" // Light Green
            , "draggable": true
        }
    },
    {
        "type": "Line",
        "props": {
            "points": [0, 0, 300, 300],
            "stroke": "#ffa500", // Orange
            "strokeWidth": 5
            , "draggable": true
        }
    },
    {
        "type": "Polygon",
        "props": {
            "points": [50, 50, 250, 50, 150, 200],
            "fill": "#800080", // Purple
            "stroke": "#4b0082", // Indigo
            "strokeWidth": 2
            , "draggable": true
        }
    },
    {
        "type": "Star",
        "props": {
            "x": 200,
            "y": 200,
            "numPoints": 5,
            "innerRadius": 20,
            "outerRadius": 40,
            "fill": "#ffff00", // Yellow
            "stroke": "#ff0000", // Red
            "strokeWidth": 2
            , "draggable": true
        }
    },
    {
        "type": "Arc",
        "props": {
            "x": 150,
            "y": 150,
            "innerRadius": 30,
            "outerRadius": 50,
            "angle": 180,
            "fill": "#4682b4" // Steel Blue
            , "draggable": true
        }
    }
]