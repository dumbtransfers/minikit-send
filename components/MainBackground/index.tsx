'use client'
import React from 'react';
import Image from 'next/image';
import Header from '../Header/index';
import { useRouter } from 'next/navigation'; // Import useRouter

const buttonData = [
    { id: 1, title: "Retira en Buenbit", img: "https://pbs.twimg.com/profile_images/1681298472782426113/nDMEc3-Y_400x400.png"  },
    { id: 2, title: "Retira en Lemon", img: "https://pbs.twimg.com/profile_images/1794012769605271552/zUZENLRv_400x400.jpg"},
    // Add more objects as needed
  ];

const PhotoButtonPage = () => {
    const router = useRouter()
    const handleButtonClick = () => {
        router.push('/pay'); // Navigate to the /pay screen
      };
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-optimized header - smaller padding, sticky */}
      <Header/>
      {/* Main content with mobile-friendly spacing */}
      <main className="p-4 space-y-3">
      {buttonData.map((button) => (
          <button key={button.id} className="w-full active:scale-98 transition-transform" onClick={handleButtonClick}>
            <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 shadow-md hover:bg-blue-50 active:bg-blue-100">
              {/* Larger photo for better touch targets */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <Image 
                  src={button.img}
                  alt="Item photo"
                  fill
                  className="object-cover"
                  sizes="80px"
                  priority={false}
                />
              </div>
              
              {/* Centered Text and Arrow */}
              <div className="flex items-center flex-1 ml-4 justify-between">
                <div>
                  <h2 className="text-base font-semibold text-blue-600">{button.title}</h2>
                  {/* <p className="text-sm text-gray-600 leading-snug">{button.description}</p> */}
                </div>
                {/* Arrow Icon */}
                <span className="text-blue-600 text-xl">{'->'}</span>
              </div>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
};

export default PhotoButtonPage;
