import React from "react";

const list = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pineapple",
  "Grapes",
  "Guava",
  "Papaya",
  "Watermelon",
  "Kiwi",
  "Strawberry",
];
const AutoSuggest = () => {
  const [value, setValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState(list);

  const handleChange = (e) => {
    const value = e.target.value;
    const filteredSuggestions = list.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setValue(value);
  };

  const highlightMatch = (text) => {
    if (!value) return text;

    const searchValue = value.toLowerCase();
    const itemLower = text.toLowerCase();
    const startIndex = itemLower.indexOf(searchValue);

    if (startIndex === -1) return text;

    const beforeMatch = text.slice(0, startIndex);
    const match = text.slice(startIndex, startIndex + searchValue.length);
    const afterMatch = text.slice(startIndex + searchValue.length);

    return (
      <>
        {beforeMatch}
        <strong className="font-bold">{match}</strong>
        {afterMatch}
      </>
    );
  };

  return (
    <div>
      <h1>AutoSuggest</h1>
      <input type="text" onChange={handleChange} value={value} />
      <ul
        style={{
          listStyleType: "none",
          backgroundColor: "#f9f9f9",
          color: "#333",
          padding: "10px",
        }}
      >
        {suggestions.map((item) => (
          <li
            key={item}
            style={{ borderBottom: "1px solid" }}
            onClick={() => setValue(item)}
          >
            {" "}
            {highlightMatch(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoSuggest;
