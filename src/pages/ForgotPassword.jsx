import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { passwordReset } from "../utility/utils";
import { useState } from "react";
import Layout from "../components/Layout";
import Toast from "../components/Toast";

const ForgotPassword = () => {
  const [emailPasswordToBeReset, setEmailPasswordToBeReset] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    message: "User not found, try again!",
    status: "exclamation",
    loading: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        emailPasswordToBeReset.length < 1 ||
        !emailPasswordToBeReset.includes("@")
      ) {
        setToastProps({
          message: "Please Enter Valid Mail id",
          status: "exclamation",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
      } else {
        await passwordReset(emailPasswordToBeReset);
        setToastProps({
          message: "Password Reset Mail Sent Successfully!",
          status: "success",
          loading: true,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
        setEmailMessage(true);
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setToastProps({
          message: "User not found, try again!",
          status: "failure",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
        setEmailPasswordToBeReset("");
      }
    }
  };

  return (
    <Layout>
      {showToast && (
        <Toast
          text={toastProps.message}
          status={toastProps.status}
          loading={toastProps.loading}
          requireConfirm={false}
        ></Toast>
      )}
      <section className="flex justify-center items-center w-screen bg-gray-100 h-[80vh]">
        <div className="max-w-md w-full">
          {emailMessage ? (
            <div className="max-w-md w-full bg-white rounded p-6 space-y-4 text-center">
              <h3>The Email has been sent. Please check your Inbox!</h3>
            </div>
          ) : (
            <>
              <Link
                className="block text-sm text-blue-600 font-medium cursor-pointer mb-1"
                to="/signin"
              >
                {" "}
                Back to Sign In
              </Link>
              <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
                <div className="flex justify-center">
                  <FiAlertCircle
                    className="w-[80px] h-[80px]"
                    color="#0F65D9"
                  />
                </div>
                <p className="text-gray-600 font-bold text-xl text-center mb-4">
                  Forgot Password
                </p>
                <p className="text-gray-400 text-center font-semibold mb-2">
                  Enter your email we&apos;ll send you a link to reset your
                  password.
                </p>

                <div>
                  <input
                    className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmailPasswordToBeReset(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    className="w-full py-4 bg-green-600 hover:bg-green-500 rounded text-sm font-bold text-gray-50 transition duration-200"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
