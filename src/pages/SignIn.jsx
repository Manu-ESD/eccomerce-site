import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInHandler } from "../utility/utils";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../features/authSlice";
import Layout from "../components/Layout";
import Toast from "../components/Toast";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.authData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const [toastProps, setToastProps] = useState({
    message: "error",
    status: "exclamation",
    loading: false,
  });

  const signInClickHandler = async () => {
    setLoading(true);

    try {
      if (email.length <= 0 || password.length <= 0 || !email.includes("@")) {
        setToastProps({
          message: "Please Enter Valid Credentials",
          status: "exclamation",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
      } else if (!authData.isLoggedIn) {
        const res = await signInHandler({ email, password });

        setToastProps({
          message: "Login Successful",
          status: "success",
          loading: true,
        });
        setShowToast(true);

        const { user } = res;
        console.log("user", user);
        setTimeout(() => {
          setShowToast(false);
          setLoading(false);
          dispatch(
            signIn({
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
            })
          );
          navigate("/");
        }, 2500);
      }
    } catch (err) {
      if (err.toString().includes("auth/invalid-email")) {
        setToastProps({
          message: "Invalid Email",
          status: "failure",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
      }
      setToastProps({
        message: "Invalid Login Credentials",
        status: "failure",
        loading: false,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);

      console.error(err);
      setLoading(false);
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
      <section className="flex justify-center items-center h-[80vh] w-screen bg-gray-100">
        <div className="max-w-md w-full">
          <Link
            className="block text-sm text-blue-600  cursor-pointer font-medium mb-1"
            to="/home"
          >
            {" "}
            Back Home
          </Link>
          <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
            <div className="mb-4">
              <p className="text-gray-600 font-bold text-xl">Sign In</p>
              <div>
                <span>or</span>
                <Link
                  className="text-sm text-blue-600 cursor-pointer font-medium"
                  to="/signup"
                >
                  {" "}
                  New to ESHOP? Create an account
                </Link>
              </div>
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                className="w-full py-4 bg-[#f97316] hover:text-black rounded text-sm font-bold text-white transition duration-200"
                onClick={signInClickHandler}
              >
                Sign In
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Link
                  to="/password-reset"
                  className="text-sm text-blue-600  cursor-pointer font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignIn;
