import { Line } from "fabric";

const snappingDistance = 10;
const guidelinesExists = (canvas, id) => {
    const objects = canvas.getObjects('line');
    return objects.some((obj) => obj.id === id)
}
export const handleObjectMoving = (canvas, obj, guidelines, setGuidelines) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const top = obj.top;
    const left = obj.left;
    const right = left + (obj.width * obj.scaleX);
    const bottom = top + (obj.height * obj.scaleY);

    const centerX = left + (obj.width * obj.scaleX) / 2;
    const centerY = top + (obj.height * obj.scaleY) / 2;

    let newGuideLines = []
    clearGuideLines(canvas);
    let snapped = false;
    if (Math.abs(left) < snappingDistance) {
        obj.set({ left: 0 });
        if (!guidelinesExists(canvas, 'vertical-left')) {
            const line = createVerticalGuideLine(canvas, 0, 'vertical-left');
            newGuideLines.push(line);
            canvas.add(line)
        }
        snapped = true
    }
    if (Math.abs(top) < snappingDistance) {
        obj.set({ top: 0 });
        if (!guidelinesExists(canvas, 'horizontal-top')) {
            const line = createHorizontalGuideLine(canvas, 0, 'horizontal-top');
            newGuideLines.push(line);
            canvas.add(line)
        }
        snapped = true
    }
    if (Math.abs(right - canvasWidth) < snappingDistance) {
        obj.set({ left: canvasWidth - obj.width * obj.scaleX });
        if (!guidelinesExists(canvas, 'vertical-right')) {
            const line = createVerticalGuideLine(canvas, canvasWidth, 'vertical-right');
            newGuideLines.push(line);
            canvas.add(line)
        }
        snapped = true
    }
    if (Math.abs(bottom - canvasHeight) < snappingDistance) {
        obj.set({ top: canvasHeight - obj.height * obj.scaleY });
        if (!guidelinesExists(canvas, 'horizontal-bottom')) {
            const line = createHorizontalGuideLine(canvas, canvasHeight, 'horizontal-bottom');
            newGuideLines.push(line);
            canvas.add(line)
        }
        snapped = true
    }
    if (Math.abs(centerX - canvasWidth / 2) < snappingDistance) {
        obj.set({ left: canvasWidth / 2 - (obj.width * obj.scaleX) / 2 });
        if (!guidelinesExists(canvas, 'vertical-center')) {
            const line = createVerticalGuideLine(canvas, canvasWidth / 2, 'vertical-center');
            newGuideLines.push(line);
            canvas.add(line)
        }
        snapped = true

    }
    if (Math.abs(centerY - canvasHeight / 2) < snappingDistance) {
        obj.set({ top: canvasHeight / 2 - (obj.height * obj.scaleY) / 2 });
        if (!guidelinesExists(canvas, 'horizontal-center')) {
            const line = createHorizontalGuideLine(canvas, canvasWidth / 2, 'horizontal-center');
            newGuideLines.push(line);
            canvas.add(line)
        }
        snapped = true

    }
    if (!snapped) {
        clearGuideLines(canvas)
    } else {
        setGuidelines(newGuideLines)
    }
    canvas.renderAll()
}
export const createVerticalGuideLine = (canvas, x, id) => {
    return new Line([x, 0, x, canvas.height], {
        id,
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        strokeDashArray: [5, 5],
        opacity: 0.6
    })
}
export const createHorizontalGuideLine = (canvas, y, id) => {
    return new Line([0, y, canvas.width, y], {
        id,
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        strokeDashArray: [5, 5],
        opacity: 0.6
    })
}

export const clearGuideLines = (canvas) => {
    const objects = canvas.getObjects('line');
    objects.forEach(obj => {
        if ((obj.id && obj.id.startsWith('vertical-')) ||
            (obj.id && obj.id.startsWith('horizontal-'))
        ) {
            canvas.remove(obj)
        }
    });
    canvas.renderAll()
}