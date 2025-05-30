import React from 'react'

const RadioButton = ({
                         label, selected = false, onChange = () => {
    }
                     }) => {
    return (
        <label className={`flex gap-3 items-center cursor-pointer mt-2 text-sm`}>
            <input type='radio' name={'sortOption'} checked={selected}
                   onChange={() => onChange(label)}/>
            <span className='font-light select-none'>{label}</span>
        </label>)
}
export default RadioButton
