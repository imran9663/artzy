import React, { useEffect, useState } from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import { googleFonts } from '../../../Utils/common';
import './styles.css';

const CustomDropDown = (props) => {
    const allFonts = googleFonts.sort()
    const [ddData, setDdData] = useState(allFonts);
    const [ddShow, setDdShow] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [defaultSelectedFont, setDefaultSelectedFont] = useState(props.selectedFont)
    const handleInputChange = (e) => {
        const { value } = e.target
        setSearchValue(value);
        const filteredValues = allFonts.filter((list) => {
            if (list.toLowerCase().includes(value.toLowerCase())) return list
            if (value === '') return list
        })
        setDdData(filteredValues)
    }

    const handleSleetedFont = (font) => {
        props.onSelect(font);
        setDefaultSelectedFont(font);
        setSearchValue('')
        setDdData(allFonts)
        setDdShow(() => !ddShow)
    }
    return (
        <>
            <div className="w-100 h-100 d-flex flex-row justify-content-center align-items-center">
                <div className="custom-dd-wrapper">
                    <div className="custom-dd-head btn-sm">
                        <input style={{ fontFamily: defaultSelectedFont }} onChange={handleInputChange} placeholder={defaultSelectedFont} type="text" value={searchValue} className="dd-head-input" />
                        <button onClick={() => setDdShow(() => !ddShow)} className="btn font-dark-bg dd-head-btn">
                            {ddShow ? <TbChevronUp /> : <TbChevronDown />}
                        </button>
                    </div>
                    <div className={`custom-dd-body bg-dark ${ddShow && 'dd-open'} `}>
                        {ddData.map(font => <button onClick={() => handleSleetedFont(font)} style={{ fontFamily: font }} className={`btn  dd-list-item ${defaultSelectedFont === font && "btn-warning text-dark"}`}>{font}</button>)}
                    </div>
                </div>
            </div>


        </>
    )
}

export default CustomDropDown