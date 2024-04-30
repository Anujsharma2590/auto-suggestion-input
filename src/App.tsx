import { AutoComplete } from "./components";
import "./App.css";

function App() {

   const dataPromise = async (query :  string, signal  : AbortSignal) =>
    await fetch(`https://swapi.py4e.com/api/people/?search=${query}`, {
      signal,
    });

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
