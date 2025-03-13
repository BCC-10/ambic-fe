import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import {useNavigate} from "react-router-dom"

interface Location {
    name: string;
    place_id: string;
    lat: number;
    long: number;
}

const Autocomplete = () => {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    // Ambil lokasi pengguna
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

    // Fetch lokasi berdasarkan input query
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
                        lat: latitude,
                        long: longitude,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });

                // console.log("API Response:", response.data);

                // if (!response.data.payload?.location) {
                //     console.error("Error: locations data is missing in API response");
                //     setSuggestions([]);
                //     return;
                // }

                if (response.data.payload?.locations) {
                    const validLocations = response.data.payload.locations.filter(loc => loc.place_id); // Filter hanya yang memiliki PlaceId
                    setSuggestions(validLocations);
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

    useEffect(() => {
        return () => {
            fetchLocations.cancel();
        };
    }, [fetchLocations]);

    // Handle perubahan input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setQuery(value);
        // console.log("Query value",  value); 
        fetchLocations(value);
    };
    // Handle klik pada suggestion
    const handleSelectLocation = async (location: Location) => {
        setQuery(location.name);
        setSuggestions([]); // Sembunyikan dropdown
        setSelectedLocation(location);
        if (!location.place_id) {
            console.error("Error: PlaceId is undefined");
            return;
        }

        // Fetch detail lokasi berdasarkan Place ID
        try {
            
            const response = await axios.get(`https://ambic.live:443/api/v1/locations/${location.place_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.payload?.location) {
                // console.log("Detail lokasi:", response.data.payload.location);
                setSelectedLocation(response.data.payload.location);
            }
            
        } catch (error) {
            console.error("Error fetching location details:", error);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="relative flex items-start w-full h-15 max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] flex-col z-50 placeholder:flex placeholder:justify-center rounded-lg">
            <input
                id="businessLocation"
                type="text"
                value={query || ""}
                onChange={handleChange}
                placeholder="Cari lokasi..."
                className="p-6 bg-white/85 focus:outline-none w-full rounded-xl h-15 text-xl font-Poppins font-semibold"
                disabled={!latitude || !longitude}
            />
            {/* Menampilkan hasil pencarian */}
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
                    {loading && <li className="p-2 text-gray-500">Loading...</li>}
                    {suggestions.map((location, idx) => (
                        <li
                            key={location.place_id || idx + 1}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelectLocation(location)
                                navigate("/order")
                            }}
                        >
                            {location.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
