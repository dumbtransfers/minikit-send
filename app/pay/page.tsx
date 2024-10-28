'use client';
import React, { useState } from 'react';
import Header from '@/components/Header/index';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { PayBlock } from '@/components/Pay/index';
import useFetchWldPrice from "@/hooks/useFetchWldPrice";

const SendScreen = () => {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState<string>(''); // Keep amount as string
  const price:any = useFetchWldPrice(); 
  console.log("check the pay screen page price", price)

  // Transaction fee
  const transactionFee = 0.5;

  // Calculate the amount received after deducting the fee
  const amountReceived = amount ? (parseFloat(amount) - transactionFee).toFixed(2) : '0.00';

  // Convert amount to number and pass it to PayBlock
  const numericAmount = parseFloat(amount) || 0; // Default to 0 if NaN

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center mb-4 text-blue-600 hover:underline"
        >
          <AiOutlineArrowLeft className="mr-2" />
          Atras
        </button>

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

        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Resumen</h2>
          <p className="text-base text-gray-600">Fee: ${transactionFee.toFixed(2)}</p>
          <p className="text-xl font-bold text-gray-800">Cantidad a recibir: ${amountReceived} USD</p>
        </div>

        {/* Pass the numericAmount to PayBlock */}
        <PayBlock amount={numericAmount} price={price} />
      </div>
    </div>
  );
};

export default SendScreen;
