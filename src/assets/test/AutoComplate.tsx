import React, { useState, useCallback, useEffect } from "react";
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
const [latitude, setLatitude] = useState<string | null>(null);
const [longitude, setLongitude] = useState<string | null>(null);

// Dapatkan lokasi pengguna saat komponen pertama kali dimuat
useEffect(() => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        },
        (error) => {
        console.error("Error getting location:", error);
        alert("Gagal mendapatkan lokasi, pastikan izin lokasi diaktifkan.");
        }
    );
    } else {
    alert("Geolocation tidak didukung di browser ini.");
    }
}, []);

// Fungsi untuk mengambil data lokasi dari API
const fetchLocations = useCallback(
    debounce(async (searchTerm) => {
    if (!searchTerm || !latitude || !longitude) {
        setSuggestions([]);
        return;
    }

    setLoading(true);
    try {
        const response = await axios.get("https://ambic.live:443/api/v1/locations", {
        params: {
            query: searchTerm,
            lat: latitude, // Menggunakan latitude dari state
            long: longitude, // Menggunakan longitude dari state
            radius: "20000",
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
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
    [latitude, longitude]
);

// Handle perubahan input
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        disabled={!latitude || !longitude} // Disable input jika lokasi belum tersedia
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
