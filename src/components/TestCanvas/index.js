import React from 'react';
import * as Icons from '../../Assets/Icons/index';

const shapes = [
    "Circle",
    "Square",
    "Rectangle",
    "Triangle",
    "Rhombus"
];

const TestCanvas = () => {
    return (
        <div className='d-flex flex-row flex-wrap bg-dark'>
            {shapes.map((shape) => {
                // Dynamically fetch the corresponding icon component
                const IconComponent = Icons[shape];

                return (
                    <button className='btn ' key={shape}>
                        {/* Render the icon if it exists */}
                        {IconComponent ? <IconComponent /> : null}
                        <span>{shape}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default TestCanvas;
