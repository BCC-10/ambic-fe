import React from 'react'
import LogicHow from '../Componets/Elements/How/LogicHow'
import Image1 from '../assets/Background/How/pexels-dima-valkov-1186343-3864682.jpg'
import Image2 from '../assets/Background/How/pexels-dadanr-18284818.jpg'
import Image3 from '../assets/Background/How/brooke-lark-C1fMH2Vej8A-unsplash.jpg'
import Image4 from '../assets/Background/How/brooke-lark-oaz0raysASk-unsplash.jpg'
import Image5 from '../assets/Background/How/brooke-lark-IDTEXXXfS44-unsplash.jpg'


const How = () => {

    const Content = [
        {item: "Atur Lokasi", text:"Atur lokasi agar menemukan restoran terdekat.", Image: Image1},
        {item: "Lihat Makanan Terdekat", text:"Jelajahi menu dari restoran di sekitar.", Image: Image2},
        {item: "Pilih Makanan", text:"Pilih makanan sesuai selera dan kebutuhan", Image: Image3},
        {item: "Beli Sekarang", text:"Tambahkan produk ke keranjang dan lanjut ke checkout", Image: Image4},
        {item: "Bayar", text:"Melakukan pembayaran dan selesaikan transaksi", Image: Image5}
    ]

    return (
        <div className='min-h-screen relative flex items-center justify-center bg-[#FFF8F4] max-xl:min-h-[80vh]'>
            
            <LogicHow slides={Content}/>
        
        </div>
    )
}

export default How
