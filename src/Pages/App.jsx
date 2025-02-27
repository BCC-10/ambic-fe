import { useState } from "react";
import Navbar from "../Layouts/Navbar";
import Hero from "../Layouts/Hero";
import Why from "../Layouts/Why";
import BtN from "../Componets/Elements/Navbar/IconButton";
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
      </main>
      <BtN Icon={<BsChatSquareText />} Content="Chat" Variant="bottom-20" />
    </div>
  );
}

export default App;
