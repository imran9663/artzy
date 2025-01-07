import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Circle, fabric, Rect } from 'fabric';

const Dummy = () => {
    const canvasRef = useRef(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, target: null });

    useEffect(() => {
        // Initialize js Canvas
        const canvas = new Canvas(canvasRef.current, {
            width: 800,
            height: 600,
            backgroundColor: '#f0f0f0',
            fireRightClick: true, 
        });

        // Add some objects
        const rect = new Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: 'blue',
        });

        const circle = new Circle({
            left: 300,
            top: 100,
            radius: 50,
            fill: 'red',
        });

        canvas.add(rect, circle);
        // Handle right-click (mouse:down event)
        canvas.on('mouse:down', (event) => {
            event.e.preventDefault();
            if (event.e.button === 2) {
                const target = canvas.getActiveObject();
                if (target) {
                    console.log("target", target);
                    setContextMenu({
                        visible: true,
                        x: event.e.clientX,
                        y: event.e.clientY,
                        target,
                    });
                } else {
                    setContextMenu({ visible: false, x: 0, y: 0, target: null });
                }

                // Prevent default context menu
                event.e.preventDefault();
            }
        });
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        });

        // Hide context menu on canvas click
        const handleClickOutside = (e) => {
            const clickedInsideCanvas = canvas.upperCanvasEl.contains(e.target);
            const activeObject = canvas.getActiveObject();

            // Hide menu if clicked outside the canvas or no active object is selected
            if (!clickedInsideCanvas || !activeObject) {
                setContextMenu({ visible: false, x: 0, y: 0, target: null });
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup
        return () => {
            canvas.dispose();
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('contextmenu', event => {
                event.preventDefault();
            });
        };
    }, []);



    // Render context menu
    return (
        <div>
            <canvas ref={canvasRef} id="fabric-canvas" oncontextmenu="return false;" />

            {contextMenu.visible && (
                <ul
                    style={{
                        position: 'absolute',
                        top: contextMenu.y,
                        left: contextMenu.x,
                        backgroundColor: '#ffffff',
                        border: '1px solid #ccc',
                        padding: '10px',
                        zIndex: 1000,
                        listStyle: 'none',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <li onClick={() => alert('Option 1')}>Option 1</li>
                    <li onClick={() => alert('Option 2')}>Option 2</li>
                    <li
                        onClick={() => {
                            if (contextMenu.target) {
                                contextMenu.target.set({ fill: 'green' });
                                contextMenu.target.canvas.renderAll();
                            }
                            setContextMenu({ visible: false, x: 0, y: 0, target: null });
                        }}
                    >
                        Change to Green
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Dummy;
