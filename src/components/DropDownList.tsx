import  { FC } from "react";
import { DropDownListPropsType, HIGHLIGHT_CLASS, QUERYTEXT_CLASS } from "../types";
import "./styles.css";


const DropDownList: FC<DropDownListPropsType> = ({
  items,
  activeIndex,
  listBoxRef,
  query,
  onMouseEnter,
  onMouseLeave,
}) => {
  const highlightRegex = new RegExp(`(${query})`, "i");

  const highlightMatch = (text: string): string => {
    return text.replace(
      highlightRegex,
      (match) => `<span class=${HIGHLIGHT_CLASS}>${match}</span>`
    );
  };

  const matchingTextInItems = (item: string[]) => {
    const queryMatch = item.find(
      (item) => item.toLowerCase() === query.toLowerCase()
    );

    if (queryMatch) {
      return `<span> <span class=${QUERYTEXT_CLASS}>"${queryMatch}" </span> found in items</span>`;
    }

    return "";
  };

  return (
    <ul ref={listBoxRef} className="listBoxContainer">
      {items.map((item, index) => (
        <li
          className={`listBoxItem ${
            index === activeIndex 
              ? "activeItem"
              : ""
          }`}
          key={index}
          onMouseEnter={(e) => { e.stopPropagation(); onMouseEnter(index) }}
          onMouseLeave={onMouseLeave}
          style={{ cursor: "default" }}
        >
          <div>
            <strong
              dangerouslySetInnerHTML={{ __html: highlightMatch(item.id) }}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: highlightMatch(item.name) }}
          />

          <div
            dangerouslySetInnerHTML={{
              __html: matchingTextInItems(item.items),
            }}
          />

          <div
            dangerouslySetInnerHTML={{ __html: highlightMatch(item.address) }}
          />
        </li>
      ))}
    </ul>
  );
};

export default DropDownList;
