import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

interface Location {
  place_id: string;
  name: string;
}

const Autocomplete = ({ onChange, name, value }) => {
  const [query, setQuery] = useState('');
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
          console.error('Error getting location:', error);
          alert('Gagal mendapatkan lokasi, pastikan izin lokasi diaktifkan.');
        }
      );
    } else {
      alert('Geolocation tidak didukung di browser ini.');
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
        const response = await axios.get(
          import.meta.env.VITE_API_URL + '/api/v1/locations',
          {
            params: {
              query: searchTerm,
              lat: latitude, // Menggunakan latitude dari state
              long: longitude, // Menggunakan longitude dari state
              radius: '20000',
            },
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );

        if (response.data.payload && response.data.payload.locations) {
          setSuggestions(response.data.payload.locations);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
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

  // Handle klik pada suggestion
  const handleSelectLocation = (name: string) => {
    setQuery(name); // Set input dengan lokasi yang dipilih
    setSuggestions([]); // Sembunyikan dropdown setelah memilih
  };

  return (
    <div className="relative flex items-start w-[55%] max-sm:w-full max-lg:w-[90%] max-xl:w-[90%] flex-col z-100">
      <label
        htmlFor="businessLocation"
        className="font-Poppins text-md font-semibold text-teal-700"
      >
        Posisi Bisnis
      </label>
      <input
        id="businessLocation"
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        placeholder="Cari lokasi..."
        className="p-2 bg-gray-200 focus:outline-none w-full rounded-xl"
        disabled={!latitude || !longitude} // Disable jika lokasi belum tersedia
      />
      {/* Menampilkan hasil pencarian */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-50 max-h-60 overflow-y-auto ">
          {loading && <li className="p-2 text-gray-500">Loading...</li>}
          {suggestions.map((location) => (
            <li
              key={location.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSelectLocation(location.name)}
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
