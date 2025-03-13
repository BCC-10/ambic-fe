import { useState, useEffect } from "react";
import axios from "axios";

const useLocation = () => {
    const [regencyId, setRegencyId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation tidak didukung di browser ini.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                // 🔹 Gunakan API Nominatim untuk mendapatkan nama kota/kabupaten
                const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                const cityName = geoResponse.data.address.regency || geoResponse.data.address.city || geoResponse.data.address.county;
                
                if (!cityName) {
                    setError("Gagal mendapatkan nama kabupaten/kota.");
                    setLoading(false);
                    return;
                }

                // 🔹 Normalisasi Nama Kota/Kabupaten
                const normalizeCityName = (name: string) => {
                    return name
                        .toLowerCase()
                        .replace("kota ", "")    
                        .replace("kabupaten ", ""); 
                };

                // 🔹 Gunakan CORS Proxy (Alternatif jika tanpa backend)
                const proxyUrl = "https://corsproxy.io/?";
                const regenciesUrl = "https://emsifa.github.io/api-wilayah-indonesia/api/regencies.json";
                
                const provincesResponse = await axios.get(`${proxyUrl}${regenciesUrl}`);

                // 🔹 Cari regencyId berdasarkan nama yang sudah dinormalisasi
                const matchedRegency = provincesResponse.data.find((regency: any) => 
                    normalizeCityName(regency.name).includes(normalizeCityName(cityName))
                );

                if (matchedRegency) {
                    setRegencyId(matchedRegency.id);
                } else {
                    setError("Regency ID tidak ditemukan.");
                }

            } catch (err) {
                setError("Error mendapatkan lokasi.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, (err) => {
            setError("Gagal mendapatkan lokasi.");
            setLoading(false);
        });
    }, []);

    return { regencyId, loading, error };
};

export default useLocation;
