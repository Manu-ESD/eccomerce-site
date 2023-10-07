import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
const ForgotPassword = () => {
  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full">
          <Link
            className="block text-sm text-blue-600 hover:underline mb-1"
            to="/signin"
          >
            {" "}
            Back to Sign In
          </Link>
          <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
            <div className="flex justify-center">
            <FiAlertCircle className="w-[80px] h-[80px]"  color="#0F65D9"/>
            </div>
           <p className="text-gray-600 font-bold text-xl text-center mb-4">Forgot Password</p>
           <p className="text-gray-400 text-center font-semibold mb-2">Enter your email we'll send you a link to reset your password.</p>

            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="email"
                placeholder="Email"
              />
            </div>
            <div>
              <button className="w-full py-4 bg-green-600 hover:bg-green-500 rounded text-sm font-bold text-gray-50 transition duration-200">
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
