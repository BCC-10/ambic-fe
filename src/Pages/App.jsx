import { useState } from "react";
import Navbar from "../Layouts/Navbar";
import Hero from "../Layouts/Hero";
import Why from "../Layouts/Why";
import How from "../Layouts/How";
import Mitra from "../Layouts/Mitra";
import Sponshorship from "../Layouts/Sponshorship";
import PaymentMethod from "../Layouts/PaymentMethod";
import Footer from "../Layouts/Footer";
import BtN from "../Componets/Elements/Hero/PromoNChat";
import { BsChatSquareText } from "react-icons/bs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full 2xl:overflow-hidden">
        <div className='w-full 2xl:overflow-hidden"'>
          <Hero />
        </div>
        <div className="flex-1 w-full">
          <Why />
        </div>
        <div className="flex-1 w-full">
          <How/>
        </div>
        <div className="flex-1 w-full">
          <Mitra/>
        </div>
        <div className="flex-1 w-full">
          <Sponshorship/>
        </div>
        <div className="flex-1 w-full">
          <PaymentMethod/>
        </div>
        <div className="flex-1 w-full">
          <Footer/>
        </div>
      </main>
      <BtN Icon={<BsChatSquareText />} Content="Chat" Variant="bottom-30" />
    </div>
  );
}

export default App;
