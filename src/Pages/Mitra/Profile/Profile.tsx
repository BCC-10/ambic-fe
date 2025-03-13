import React, { useState, useEffect } from "react";
import Navbar from "../../../Layouts/Navbar";
import Modal from "../../../Componets/Elements/Navbar/ModalLocate";
import SideBar from "../Component/SideBar";
import ChangePicture from "./ChangeProfile";
import Information from "../Profile/Information";
import Footer from "../../../Layouts/Footer";
import axios from "axios";
import Swal from "sweetalert2";

interface partnerData {
  id: string;
  name: string;
  address: string;
  business_type: string;
  city: string;
  instagram: string;
  logitude: number;
  latitude: number;
  photo: File | null;
}

const Profile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [partnerData, setPartnerData] = useState<partnerData>({
    id: "",
    name: "",
    address: "",
    business_type: "",
    city: "",
    instagram: "",
    logitude: 0,
    latitude: 0,
    photo: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataPartner = async () => {
      Swal.fire({
        title: "Loading...",
        text: "Mengambil data Mitra...",
        timer: 2000,
        timerProgressBar: true,
        allowOutsideClick: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      setLoading(true);
      try {
        const response = await axios.get(
          "https://ambic.live:443/api/v1/partners", {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }, 
          }
        );
        setPartnerData(response.data.payload.partner);
        setLoading(false);
        Swal.close();
      } catch (err) {
        setError("Gagal mengambil data mitra.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDataPartner();
  }, []);

  return (
    <main className="min-h-screen flex flex-col overflow-hidden w-full">
      <div>
        <Navbar setOpen={setOpen} />
      </div>
      <div className="min-h-screen flex flex-row items-center justify-start bg-[#FFF8F4] w-full">
        <SideBar />
        <div className="w-full h-[70%] flex flex-col justify-center items-center">
          <div className="w-[80%] h-[65%] flex items-start flex-col max-md:items-center">
            <h1 className="font-Poppins text-xl font-semibold ">
              Profile Bisnis
            </h1>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <></>
            )}
            <div className="w-full flex items-center justify-center flex-col">
              <ChangePicture />
              <div className="w-full h-full flex justify-center gap-7 max-md:flex-col max-md:items-center">
                <div className="flex h-full gap-5 flex-col w-full">
                  <Information
                    content="Nama Bisnis"
                    className="w-full h-full px-4 rounded-xl "
                    text={partnerData.name || "Nama Bisnis"}
                    color="text-teal-700"
                  />
                  <Information
                    content="Jenis Bisnis"
                    className="w-full h-full px-4 rounded-xl "
                    text={partnerData.business_type || "Jenis Bisnis"}
                    color="text-teal-700"
                  />
                  <Information
                    content="Instagram Bisnis"
                    className="w-full h-full px-4 rounded-xl "
                    text={partnerData.instagram || "Instagram"}
                    color="text-teal-700"
                  />
                </div>
                <div className="flex gap-5 h-full flex-col w-full">
                  <Information
                    content="Alamat Bisnis"
                    className="w-full h-full px-4 rounded-xl "
                    text={partnerData.address || "Alamat"}
                    color="text-teal-700"
                  />
                  <Information
                    content="Posisi Alamat Bisnis"
                    className="w-full h-full px-4 rounded-xl "
                    text={
                      (partnerData.latitude && partnerData.latitude) || 9465132
                    }
                    color="text-teal-700"
                  />
                  <Information
                    content="Kota"
                    className="w-full h-full px-4 rounded-xl "
                    text={partnerData.city || "Malang"}
                    color="text-teal-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <Modal open={open} onClose={() => setOpen(false)} />
    </main>
  );
};

export default Profile;
