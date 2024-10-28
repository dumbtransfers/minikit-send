'use client';
import React, { useState } from 'react';
import Header from '@/components/Header/index';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { AiOutlineArrowLeft } from 'react-icons/ai'; // Import left arrow icon from react-icons
import { PayBlock } from '@/components/Pay/index';

const SendScreen = () => {
  const router = useRouter(); // Initialize the router
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  // Transaction fee
  const transactionFee = 0.5;

  // Calculate the amount received after deducting the fee
  const amountReceived = amount ? (parseFloat(amount) - transactionFee).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      {/* Container for the main content */}
      <div className="p-6 space-y-6">
        {/* Back button */}
        <button 
          onClick={() => router.back()} // Navigate back
          className="flex items-center mb-4 text-blue-600 hover:underline"
        >
          <AiOutlineArrowLeft className="mr-2" /> {/* Left arrow icon */}
          Atras
        </button>

        {/* Address input section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Direccion</h2>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0xEjemplo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Amount input section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Cantidad a enviar (USD)</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Cantidad USD"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Amount received display */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Resumen</h2>
          <p className="text-base text-gray-600">Fee: ${transactionFee.toFixed(2)}</p>
          <p className="text-xl font-bold text-gray-800">Cantidad a recibir: ${amountReceived} USD</p>
        </div>

        {/* Send button */}
        <PayBlock amount={amount}/>
      </div>
    </div>
  );
};

export default SendScreen;
