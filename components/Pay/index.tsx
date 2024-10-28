"use client";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
  ResponseEvent,
  MiniAppPaymentPayload,
} from "@worldcoin/minikit-js";
import { useEffect } from "react";
import useFetchWldPrice from "@/hooks/useFetchWldPrice";
import { useRouter } from "next/navigation";
// ...
const sendPayment = async (usdAmount:number, wldAmount:number) => {
  console.log("USD Amount before conversion:", usdAmount);
  console.log("WLD Amount before conversion:", wldAmount);

  const res = await fetch("/api/initiate-payment", {
    method: "POST",
  });

  const { id } = await res.json();

  if (isNaN(usdAmount) || usdAmount < 0) {
    console.error("Invalid USD amount:", usdAmount);
    return; // Early exit on invalid amount
}

if (isNaN(wldAmount) || wldAmount < 0) {
    console.error("Invalid WLD amount:", wldAmount);
    return; // Early exit on invalid amount
}
const usdceAmount = Math.round(tokenToDecimals(usdAmount, Tokens.USDCE));
const wldAmountInSmallestUnit = Math.round(tokenToDecimals(wldAmount, Tokens.WLD));

console.log("Converted USDCE Amount:", usdceAmount.toString());
console.log("Converted WLD Amount:", wldAmountInSmallestUnit.toString());


  const payload: PayCommandInput = {
    reference: id,
    to: "0x52eF0e850337ecEC348C41919862dBAac42F620B", // Test address
    tokens: [
      {
        symbol: Tokens.WLD,
        token_amount: wldAmountInSmallestUnit.toString(),
      },
      {
        symbol: Tokens.USDCE,
        token_amount: usdceAmount.toString(),
      },
    ],
    description: "Watch this is a test",
  };

  if (MiniKit.isInstalled()) {
    MiniKit.commands.pay(payload);
  }
};

export const PayBlock = ({amount}:any) => {
  const router = useRouter()
  const price:any = useFetchWldPrice(); 
  const adjustedPrice = price / 1e8; // Adjust to standard decimal format
  const numericAmount = Number(amount);

  const wldAmount:any = (numericAmount * adjustedPrice).toFixed(6); // Adjust decimal precision as needed

  console.log(wldAmount, "check the wldAmount")
  console.log(Number(wldAmount), "check the Number(wldAmount")

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      console.error("MiniKit is not installed");
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppPayment,
      async (response: MiniAppPaymentPayload) => {
        if (response.status == "success") {
          const res = await fetch(`/api/confirm-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload: response }),
          });
          const payment = await res.json();
          if (payment.success) {
            // Congrats your payment was successful!
            router.push('/success');
            console.log("SUCESS!");
          } else {
            // Payment failed
            router.push('/failed');
            console.log("FAILED!");
          }
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
    };
  }, []);

  return (
    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition" onClick={() => sendPayment(Number(amount), wldAmount)}>
      Enviar
    </button>
  );
};
