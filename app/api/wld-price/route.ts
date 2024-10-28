// pages/api/get-wld-price.js
import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  // Replace with the correct contract address and your provider (e.g., Infura, Alchemy)
  const contractAddress = "0x6D14476d35Be6CD15Bdf5C2954D5490eBbDa3434";
  const provider = new ethers.JsonRpcProvider(`https://optimism-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
  const abi = [
    // Function to get the WLD price
    {
      "constant": true,
      "inputs": [],
      "name": "getLatestWldPrice",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    // Function to get the latest token price by token address
    {
      "constant": true,
      "inputs": [
        {
          "name": "token",
          "type": "address"
        }
      ],
      "name": "getLatestTokenPrice",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    const price = await contract.getLatestWldPrice();
    return NextResponse.json({ price: price.toString() });
  } catch (error) {
    console.error("Error fetching WLD price:", error);
    return NextResponse.json({ error: "Failed to fetch WLD price" });
  }
}
