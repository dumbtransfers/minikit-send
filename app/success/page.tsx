"use client";
import { useRouter } from "next/navigation";

export default function PaymentError() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full py-4 bg-green-600 text-white text-center font-bold text-lg shadow-md">
        Status de Pago
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-3xl font-semibold text-green-700 mb-4">Pago enviado con exito!</h1>
        <p className="text-gray-700 mb-6">Puede tomar hasta 10 minutos en llegar!</p>
        
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Pagina Principal
        </button>
      </main>
    </div>
  );
}
