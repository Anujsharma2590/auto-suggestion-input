import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  FC,
  useRef,
} from "react";
import DropDownList from "./DropDownList";
import useFetchUserData from "./useFetchUserData";
import "./styles.css"
import { KeyCodes } from "../types";
type Props = {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  autoComplete: boolean;

  styles: {
    label: string;
    input: string;
  };

  promise: (query: string, signal: AbortSignal) => Promise<Response>;
};
const AutoComplete: FC<Props> = ({
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
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.key;
    if (keyCode === KeyCodes.ENTER) {
      //user enter
      if (activeIndex === null) return;
      setQuery(data?.[activeIndex].name ?? "");
      setData(null);
      setActiveIndex(null);
      setIsAutoComplete(false);
      return;
    }
    setIsAutoComplete(true);
    if (!data || data.length === 0) return;
    if (keyCode === KeyCodes.ARROW_DOWN)  {
      //move down
      if (activeIndex === null || activeIndex === data.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prev) => (prev === null ? 0 : prev + 1));
      }
        if (listBoxRef.current &&  activeIndex !== null) {
        listBoxRef.current.children[activeIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else if (keyCode === KeyCodes.ARROW_UP) {
      //move up
      if (activeIndex === 0) {
        setActiveIndex(data.length - 1);
      } else {
        setActiveIndex((prev) => (prev === null ? data.length - 1 : prev - 1));
      }
        if (listBoxRef.current &&  activeIndex !== null) {
        listBoxRef.current.children[activeIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
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
        <DropDownList items={data} activeIndex={activeIndex} listBoxRef={listBoxRef} />
      )}
      {query && data && data.length === 0 && <div>Result not found</div>}
      {error && <div>Something went wrong</div>}
    </>
  );
};

export default AutoComplete;
