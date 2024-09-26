import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
        Welcome to the Policy Management System
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
        This application helps you stay up to date with the latest security
        policies and compliance requirements.
      </p>
      <p className="text-md mb-6 text-center max-w-2xl">
        You can view policies, track acknowledgments, and ensure compliance
        with our user-friendly interface.
      </p>

      <Link
        to="/policies"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition-colors duration-200"
      >
        View Policies
      </Link>

      <footer className="mt-auto py-6 text-gray-500 text-center w-full">
        © 2023 Your Organization. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
