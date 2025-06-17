import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Product Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your products efficiently
        </p>
        
        <Link 
          href="/products"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          View Products
        </Link>
      </div>
    </div>
  );
}
