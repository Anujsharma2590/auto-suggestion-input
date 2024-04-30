import { AutoComplete } from "./components";
import { mockData } from "./mockData";
import "./App.css";

function App() {
  // mock api data
  // we can make API call here 
  const fetchData = async (query: string) => {
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
        label="Enter shopping cart items:"
        placeholder="Search users by ID, address, pincode or name"
        autoComplete={true}
        fetchData={fetchData}
        styles={{
          label: "label",
          input: "input",
        }}
      />
    </div>
  );
}

export default App;
