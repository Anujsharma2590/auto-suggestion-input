import { AutoComplete } from "./components";
import { mockData } from "./mockData";
import "./App.css";

function App() {
  // mock api data
  // we can make API call here 
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
        promise={dataPromise}
        styles={{
          label: "",
          input: "",
        }}
      />
    </div>
  );
}

export default App;
