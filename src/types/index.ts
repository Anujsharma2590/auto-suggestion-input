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

export type AutoCompletePropsTypes = {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  autoComplete: boolean;
  styles: {
    label: string;
    input: string;
  };
  promise: (query: string) => Promise<UserDataType[]>;
};