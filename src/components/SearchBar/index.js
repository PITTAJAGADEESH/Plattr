import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 search-form">
      <Form.Control
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        className="search-input"
      />
      <Button type="submit" className="mt-2 search-btn" variant="primary" block>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
