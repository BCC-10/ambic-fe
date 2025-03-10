import React, { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";

interface Location {
    place_id: string;
    name: string;
}

const Autocomplete = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);

    // Fungsi untuk mengambil data lokasi dari API
    const fetchLocations = useCallback(
    debounce(async (searchTerm) => {
        if (!searchTerm) {
        setSuggestions([]);
        return;
        }

        setLoading(true);
        try {
        const response = await axios.get("https://ambic.live:443/api/v1/partners/location", {
            params: {
            query: searchTerm,
            lat: "-7.9611019", // Ganti dengan latitude pengguna jika tersedia
            long: "112.6066882", // Ganti dengan longitude pengguna jika tersedia
            radius: "20000", // Radius dalam meter
            },
            headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN", // Ganti dengan token autentikasi Anda
            },
        });

        if (response.data.payload && response.data.payload.locations) {
            setSuggestions(response.data.payload.locations);
        } else {
            setSuggestions([]);
        }
        } catch (error) {
        console.error("Error fetching locations:", error);
        setSuggestions([]);
        } finally {
        setLoading(false);
        }
    }, 500),
    []
    );

    // Handle perubahan input
    const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    fetchLocations(value);
    };

    return (
    <div className="autocomplete-container">
        <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Cari lokasi..."
        className="autocomplete-input"
        />
        {loading && <p>Loading...</p>}
        {suggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
            {suggestions.map((location) => (
            <li key={location.place_id} className="autocomplete-suggestion">
                {location.name}
            </li>
            ))}
        </ul>
        )}
    </div>
    );
};

export default Autocomplete;
