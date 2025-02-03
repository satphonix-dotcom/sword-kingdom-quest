import { useState } from "react";
import { countries } from "@/constants/countries";

export const useCountrySearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredCountries,
  };
};