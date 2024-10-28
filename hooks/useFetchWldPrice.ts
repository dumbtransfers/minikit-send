import { useEffect, useState } from "react";

const useFetchWldPrice = () => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch("/api/wld-price");
        const data = await response.json();
        setPrice(data.price);
      } catch (error) {
        console.error("Error fetching WLD price:", error);
      }
    };

    fetchPrice();
  }, []);

  return price;
};

export default useFetchWldPrice;
