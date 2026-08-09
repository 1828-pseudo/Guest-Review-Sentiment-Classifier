import { useState } from "react";

function SearchDestination({ onSearch }) {

  const [destination, setDestination] = useState("");

  const handleSearch = () => {

    if (destination === "") return;

    onSearch(destination);

  };

  return (

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-10">

      <h2 className="text-2xl font-bold mb-4">
        📍 Choose Your Destination
      </h2>

      <div className="flex gap-4">

        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-3"
        >
          <option value="">Select Destination</option>
          <option value="Mussoorie">Mussoorie</option>
          <option value="Nainital">Nainital</option>
          <option value="Rishikesh">Rishikesh</option>
          <option value="Auli">Auli</option>
          <option value="Dehradun">Dehradun</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg"
        >
          Search
        </button>

      </div>

    </div>

  );
}

export default SearchDestination;