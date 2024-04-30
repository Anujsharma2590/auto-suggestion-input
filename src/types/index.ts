import { RefObject } from "react";

export type UserDataType = {
  id: string;
  name: string;
  items: string[];
  address: string;
  pincode: string;
};

export enum KeyCodes {
  ENTER = "Enter",
  ARROW_DOWN = "ArrowDown",
  ARROW_UP = "ArrowUp",
}

export type AutoCompletePropsTypes<D> = {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  autoComplete: boolean;
  styles: AutoCompleteStyleType;

  fetchData: (query: string) => Promise<D[]>;
};

export type AutoCompleteStyleType = {
  label: string;
  input: string;
};

export type DropDownListPropsType = {
  items: UserDataType[];
  activeIndex: number | string | null;
  listBoxRef: RefObject<HTMLUListElement>;
  query: string;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
};

export const HIGHLIGHT_CLASS = "highlight";
export const QUERYTEXT_CLASS = "query-text";
