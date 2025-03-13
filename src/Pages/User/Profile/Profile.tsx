import React, { useState, useEffect } from "react";
import Sidebar from "../SideBar/SideBar";
import Navbar from "../../../Layouts/Navbar";
import Modal from "../../../Componets/Elements/Navbar/ModalLocate";
import Footer from "../../../Layouts/Footer";
import ChangePicture from "./ChangePicture";
import Input from "../../../Componets/Elements/Input/input";
import { Button } from "primereact/button";
import { RegisterUser } from "../../../data/index";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

interface userData {
  username?: string;
  email?: string;
  name: string;
  phone: string;
  address: string;
  gender: string;
}

const Profile: React.FC = () => {
  const Navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  const handleLogOut = () => {
    Swal.fire({
      title: "Logout!",
      text: "Apakah Anda yakin untuk logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Batal",
      confirmButtonText: "Lanjut!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        Navigate("/");
        Swal.fire(
          "Logged Out",
          "You have been logged out successfully.",
          "success"
        );
      }
    });
  };
  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<userData>({
    name: "",
    phone: "",
    address: "",
    gender: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fecthUserData();
    } else {
      setIsLoggedIn(false);
      Navigate("/login");
    }
  }, []);

  const fecthUserData = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        text: "Mengambil data pengguna...",
        allowOutsideClick: true,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      setLoading(true);
      const response = await axios.get(
        "https://ambic.live:443/api/v1/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status_code === 200) {
        // Pastikan mengambil data dari response dengan struktur yang benar
        const apiUser = response.data.payload.user; // Ambil data dari "user"

        setUserData({
          username: apiUser.username || "",
          email: apiUser.email || "",
          name: apiUser.name || "",
          phone: apiUser.phone || "",
          address: apiUser.address || "",
          gender: apiUser.gender || "",
        });
      }
      Swal.close();
    } catch (err: any) {
      console.log("Error Fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        text: "Mengambil data pengguna...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      setLoading(true);

      const response = await axios.patch(
        "https://ambic.live:443/api/v1/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status_code === 200) {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
    } catch (err: any) {
      console.log("Eror Updating user data : ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen w-full flex flex-col  overflow-hidden  ">
      <div>
        <Navbar setOpen={setOpen} />
      </div>
      <div className="flex items-center justify-start flex-row bg-[#FFF8F4] w-full min-h-screen">
        <Sidebar />
        <div className="w-full min-h-screen flex-col flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-full h-auto flex-col">
            <ChangePicture />
          </div>
          <div className="flex items-center justify-center gap-7 w-full h-auto max-lg:flex-col">
            <div className="flex flex-col items-center justify-center gap-3">
              {RegisterUser.slice(0, 3).map((_, idx) => (
                <Input
                  key={idx}
                  name={_.name}
                  content={_.content}
                  className={`w-full h-auto px-4 rounded-xl ${_.className}`}
                  type={_.type}
                  placeholder={_.placeholder}
                  width="w-100"
                  value={userData[_.name as keyof typeof userData] || ""}
                  onChange={handleInputChange}
                  disabled={_.disabled}
                />
              ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 max-md:p-2 ">
              {RegisterUser.slice(3, 5).map((_, idx) => (
                <Input
                  key={idx}
                  name={_.name}
                  content={_.content}
                  className={`w-full h-auto px-4 rounded-xl`}
                  type={_.type}
                  placeholder={_.placeholder}
                  width="w-100"
                  value={userData[_.name as keyof typeof userData] || ""}
                  onChange={handleInputChange}
                  disabled={_.disabled}
                />
              ))}
              {RegisterUser.slice(5, 6).map((_, idx) => (
                <div
                  className="w-full flex flex-col items-start justify-center gap-3 max-md:p-2"
                  key={idx}
                >
                  <label htmlFor="" className="font-Poppins font-semibold ">
                    Jenis Kelamin
                  </label>
                  <select
                    name={_.name}
                    className="p-2 pr-12 w-full rounded-xl bg-gray-200 focus:outline-none"
                    value={userData[_.name as keyof typeof userData] || ""}
                    onChange={handleInputChange}
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center jsutify-center gap-5 w-full h-full flex-col ">
            <div className="w-[40%] h-[70%] flex flex-wrap justify-center items-center gap-5 max-lg:w-[70%] max-md:w-full">
              <Button
                type="submit"
                label="Simpen"
                rounded
                className="w-1/4 h-1/2 px-5 py-3 text-white font-Poppins font-semibold text-xl bg-teal-700/85 rounded-full drop-shadow-xl"
                style={{ backgroundColor: "var(--teal-700)", border: "none" }}
                onClick={updateUserData}
                disabled={loading}
              />
            </div>
            <div className="w-[48%] h-[70%] flex flex-wrap justify-center items-center gap-5 max-lg:w-[70%] max-md:w-full">
              <Button
                type="submit"
                label="Logout"
                rounded
                className="w-1/4 h-1/2 px-5 py-3 text-white font-Poppins font-semibold text-xl bg-teal-700/85 rounded-full drop-shadow-xl"
                style={{ border: "none" }}
                severity="danger"
                onClick={handleLogOut}
              />
              <Button
                type="submit"
                label="Ganti Password"
                rounded
                className="w-48 h-1/2 px-5 py-3 text-white font-Poppins font-semibold text-xl bg-teal-700/85 rounded-full drop-shadow-xl focus:outline-none"
                style={{
                  border: "none",
                  backgroundColor: "var(--cyan-500)",
                  outline: "none",
                }}
              />
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
