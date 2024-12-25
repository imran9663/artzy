import React, { useEffect } from 'react';
import { Circle, Layer, Rect, Stage, Text } from 'react-konva';
const Dummy = ({ designData }) => {
    const renderElements = () => {
        return designData.elements.map((element, index) => {
            const { type, props } = element;

            switch (type) {
                case 'Rect':
                    return <Rect key={index} {...props} />;
                case 'Text':
                    return <Text key={index} {...props} />;
                default:
                    return null; // Handle unknown types gracefully
            }
        });
    };
    useEffect(() => {
        console.log("renderElements", renderElements())
    }, [])

    return (
        <Stage width={1080} height={1080} style={{ border: '1px solid #ddd' }}>
            <Layer>{renderElements()}</Layer>
        </Stage>
    );
};

export default Dummy;
