import { AutoComplete } from "./components";
import "./App.css";
import { mockData } from "./types/mockData";

function App() {

  //  const dataPromise = async (query :  string, signal  : AbortSignal) =>
  //   await fetch(`https://swapi.py4e.com/api/people/?search=${query}`, {
  //     signal,
  //   });

  const dataPromise = async (query: string) => {
  const filteredData = mockData.filter((user) => {
    return Object.values(user).some((field) =>
      field.toString().toLowerCase().includes(query.toLowerCase())
    );
  });
  return filteredData;
};

  return (
    <div className="App">
      <h1>SuggestionBox</h1>
      <AutoComplete
        id="shoppingCart"
        name="shoppingCart"
        label="Enter Shopping Cart:"
        placeholder="Search users by ID, address, pincode or name"
        autoComplete={true}
        styles={{
          label: '',
          input: '',
        }}
        promise={dataPromise}
      />
    </div>
  );
}

export default App;
