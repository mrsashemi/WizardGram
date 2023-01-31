import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addVignetteForNewImage, adjustImageValue, cancelImageValue, rotateNewImage } from "../../../features/posts/newPostSlice";

export function EditManual () {
    const dispatch = useDispatch();
    const [selectedSetting, setSetting] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(200);
    const [value, setValue] = useState(100);
    const [property, setProperty] = useState("brightness")
    const [defaultOptions, setDefaultOptions] = useState([
        {
            name: 'Rotate',
            property: 'rotate',
            value: 0,
            range: {
                min: 0,
                max: 360,
            },
            unit: 'deg'
        },
        {
            name: 'Brightness',
            property: 'brightness',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Contrast',
            property: 'contrast',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Saturate',
            property: 'saturate',
            value: 100,
            range: {
                min: 0,
                max: 200,
            },
            unit: '%'
        },
        {
            name: 'Grayscale',
            property: 'grayscale',
            value: 0,
            range: {
                min: 0,
                max: 100,
            },
            unit: '%'
        },
        {
            name: 'Sepia',
            property: 'sepia',
            value: 0,
            range: {
                min: 0,
                max: 100,
            },
            unit: '%'
        },
        {
            name: 'Hue Rotate',
            property: 'hue-rotate',
            value: 0,
            range: {
                min: 0,
                max: 360,
            },
            unit: 'deg'
        },
        {
            name: 'Fade',
            property: 'opacity',
            value: 100,
            range: {
                min: 0,
                max: 100,
            },
            unit: '%'
        },
        {
            name: 'Blur',
            property: 'blur',
            value: 0,
            range: {
                min: 0,
                max: 20,
            },
            unit: 'px'
        },
        {
            name: 'Vignette',
            property: 'box-shadow',
            value: 0,
            range: {
                min: 0,
                max: 100,
            },
            unit: 'px'
        }
    ])

    useEffect(() => {
        if (selectedIndex && selectedSetting) {
            document.getElementById(`filtertile-${selectedIndex}`).scrollIntoView();
        }
    }, [selectedSetting, selectedIndex])

    const goToSetting = (index, pMin, pMax, pVal, pProperty) => {
        setSelectedIndex(index)
        setSetting(false);
        setMin(pMin)
        setMax(pMax)
        setValue(pVal);
        setProperty(pProperty);

        if (pProperty === "rotate") {
            dispatch(rotateNewImage(true));
        }

        if (pProperty === "box-shadow") {
            dispatch(addVignetteForNewImage());
        }
    }

    const cancelSetting = () => {
        dispatch(rotateNewImage(false));
        setSetting(true);
        dispatch(cancelImageValue(property))

        setDefaultOptions([...defaultOptions].map(object => {
            if (object.property === property) {
                return {
                    ...object,
                    value: (property === "brightness" || property === "contrast" || property === "saturate" || property === "opacity") ? 100 : 0
                }
            } else {
                return object;
            }
        }))
    }

    const finishSetting = () => {
        dispatch(rotateNewImage(false));
        setSetting(true);
        setDefaultOptions([...defaultOptions].map(object => {
            if (object.property === property) {
                return {
                    ...object,
                    value: value
                }
            } else {
                return object;
            }
        }))
    }

    const adjustValue = (e) => {
        setValue(e.target.value)
        dispatch(adjustImageValue([property, value]))
    }

    return (
        <React.Fragment>
            {selectedSetting
                ? <div className="filterContainer">
                    {defaultOptions.map((option, index) => 
                    <div className="filterTile" key={index} id={`filtertile-${index}`}>
                        <h5 className="filterTitle">{option.name}</h5>
                        <div className="optionSquareContainer">
                                <button className={`filterSquare optionSquare`}
                                    onClick={() => {goToSetting(index, option.range.min, option.range.max, option.value, option.property)}}></button>
                            </div>
                    </div>)}
                </div>
                : <div className="optionSettingContainer">
                    <input type="range" min={min} max={max} value={value} step="1" className="settingRangeSlider" onChange={adjustValue}></input>
                    <div className="settingSelectButtons">
                        <button className="settingCancel" onClick={cancelSetting}>Cancel</button>
                        <button className="settingDone" onClick={finishSetting}>Done</button>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}