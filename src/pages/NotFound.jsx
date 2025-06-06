import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-purple-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
        Go to Homepage
      </Link>
    </div>
  );
}
