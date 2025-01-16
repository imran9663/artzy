import React from 'react';
import './style.css';
import * as Tb from 'react-icons/tb';
import RangeSlider from '../UtilComponents/RangeSlider/Index';
const Footer = (props) => {
    const { canvasZoom, setCanvasZoom } = props;

    const handleZoomChange = (e) => {
        const { value } = e.target;
        setCanvasZoom(value / 100)
    }
    const handleResetZoom = () => {
        setCanvasZoom(1);
    }
    const handleIncrement = () => {
        if (canvasZoom < 2) {
            setCanvasZoom(() => canvasZoom + 0.1)
        }
    }
    const handleDecrement = () => {
        if (canvasZoom > 0.5) {
            setCanvasZoom(canvasZoom - 0.1)
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark foo-bar">
                <div className="d-flex flex-row gap-1  p-2 mb-1 rounded border border-warning ">
                    <button onClick={handleResetZoom} type="button" className="btn btn-dark btn-sm">
                        <Tb.TbRestore />
                    </button>
                    <button onClick={handleIncrement} type="button" className="btn btn-dark btn-sm">
                        <Tb.TbPlus />
                    </button>
                    <button onClick={handleDecrement} type="button" className="btn btn-dark btn-sm">
                        <Tb.TbMinus />
                    </button>
                    <RangeSlider id={'zoomControl'} name={'zoomControl'} label={''} value={(canvasZoom * 100)} min={50} max={200} steps={1} handleChange={handleZoomChange} />
                    <span style={{ lineHeight: "32px", }} className='text-light'>%</span>
                </div>
            </nav>
        </>
    )
}

export default Footer