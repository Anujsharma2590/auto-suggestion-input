import { useState, ChangeEvent, FC, useRef, useEffect, useCallback } from "react";

import useFetchUserData from "./useFetchUserData";
import { AutoCompletePropsTypes, KeyCodes, UserDataType } from "../types";
import AutocompleteList from "./AutocompleteList";
import "./styles.css";

const AutoComplete: FC<AutoCompletePropsTypes<UserDataType>> = ({
  id,
  name,
  placeholder,
  label,
  autoComplete,
  styles,
  fetchData,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [data, error] = useFetchUserData(query, fetchData, autoComplete);
  const listBoxRef = useRef<HTMLUListElement>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (!value) {
      setActiveIndex(null);
    }
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    if (!isKeyboardActive) setActiveIndex(index);
  }, [isKeyboardActive]);

  const handleMouseLeave = useCallback(() => {
    if (!isKeyboardActive) setActiveIndex(null);
  }, [isKeyboardActive]);

    const navigate = useCallback((step: number) => {
    setActiveIndex((prevSelectedItem) => {
      if (prevSelectedItem === null) {
        return 0;
      } else {
        let newIndex = prevSelectedItem + step;
        if (newIndex < 0) {
          return data.length - 1;
        } else if (newIndex >= data.length) {
          return 0;
        } else {
          return newIndex;
        }
      }
    });
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      setIsKeyboardActive(true);
      if (!data || data.length === 0) return;

      if (event.key === KeyCodes.ARROW_UP) {
        event.preventDefault();
        navigate(-1);
      } else if (event.key === KeyCodes.ARROW_DOWN) {
        event.preventDefault();
        navigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isKeyboardActive, data, navigate]);

  useEffect(() => {
    if (activeIndex !== null && listBoxRef.current) {
      const listBoxItem = listBoxRef.current.children[activeIndex];
      listBoxItem?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIndex]);


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
      />
      {data && !!data.length && (
        <div onMouseMove={() => setIsKeyboardActive(false)}>
          <AutocompleteList
            items={data}
            activeIndex={activeIndex}
            listBoxRef={listBoxRef}
            query={query}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      )}
      {query && data && !data.length && (
        <div className="not-found">No User Found</div>
      )}
      {error && <div>Something went wrong</div>}
    </>
  );
};

export default AutoComplete;
