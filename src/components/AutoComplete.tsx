import { useState, ChangeEvent, KeyboardEvent, FC, useRef } from "react";
import DropDownList from "./DropDownList";
import useFetchUserData from "./useFetchUserData";
import { AutoCompletePropsTypes, KeyCodes } from "../types";
import "./styles.css";

const AutoComplete: FC<AutoCompletePropsTypes> = ({
  id,
  name,
  placeholder,
  label,
  autoComplete,
  styles,
  promise,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAutoComplete, setIsAutoComplete] = useState<boolean>(autoComplete);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const [data, setData, error] = useFetchUserData(
    query,
    promise,
    isAutoComplete
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (!event.target.value.length) setActiveIndex(null);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.key;
    if (!data || data.length === 0) return;

    if (listBoxRef.current && activeIndex !== null) {
      const listBoxItem = listBoxRef.current.children[activeIndex];
      if (listBoxItem) {
        listBoxItem.scrollIntoView({
          behavior: "smooth",
          block: keyCode === KeyCodes.ARROW_UP ? "center" : "center",
        });
      }
    }

    switch (keyCode) {
      case KeyCodes.ENTER: {
        if (activeIndex !== null) {
          setQuery(data[activeIndex].name);
          setData(null);
          setActiveIndex(null);
          setIsAutoComplete(false);
        }
        break;
      }
      case KeyCodes.ARROW_DOWN: {
        setActiveIndex((prev) => {
          if (prev === null || prev === data.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
        break;
      }
      case KeyCodes.ARROW_UP: {
        setActiveIndex((prev) => {
          if (prev === null || prev === 0) {
            return data.length - 1;
          } else {
            return prev - 1;
          }
        });
        break;
      }
      default:
        setIsAutoComplete(true);
    }
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        value={query}
        autoComplete="off"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {data && data.length > 0 && (
        <DropDownList
          items={data}
          activeIndex={activeIndex}
          listBoxRef={listBoxRef}
          query={query}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
      {query && data && data.length === 0 && (
        <div className="not-found">No User Found</div>
      )}
      {error && <div>Something went wrong</div>}
    </>
  );
};

export default AutoComplete;
