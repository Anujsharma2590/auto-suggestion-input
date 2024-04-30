import React, { FC, RefObject } from 'react'
import { UserDataType } from '../types'
import './styles.css'

type DropDownListPropsType = {
  items: UserDataType[],
    activeIndex: number | string | null
    listBoxRef: RefObject<HTMLUListElement>;
}
const DropDownList:FC<DropDownListPropsType> = ({ items, activeIndex, listBoxRef }) => {
  return (
     <ul ref={listBoxRef} className="listBoxContainer">
      {items.map((item, index) => (
        <li
          className={`listBoxItem ${
            index === activeIndex ? 'activeItem' : ' '
          }`}
          key={index}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}

export default DropDownList