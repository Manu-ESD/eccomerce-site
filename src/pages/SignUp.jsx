import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full">
        <Link
          className="block text-sm text-blue-600 hover:underline mb-1"
          to="/home"
        >
          {" "}
          Back Home
        </Link>
        <div className="bg-white rounded p-6 space-y-4">
          <div className="mb-4">
            <p className="text-gray-600">Sign Up</p>
            <h2 className="text-xl font-bold">Join our community</h2>
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">
              Create Account
            </button>
          </div>
          <div>
            <Link to="/signin">
              <button className="w-full py-4 bg-orange-500 hover:bg-orange-400 rounded text-sm font-bold text-gray-50 transition duration-200 shadow-md">
                Existing User? Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
