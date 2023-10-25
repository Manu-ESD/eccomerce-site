import { Link } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";
import Toast from "../components/Toast";
import { signUpWithFirebase, updateUserFromFirebase } from "../utility/utils";
import { signIn } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const authData = useSelector((state) => state.authData);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [toastProps, setToastProps] = useState({
    message: "error",
    status: "exclamation",
    loading: false,
  });

  const handleCreateAccount = async () => {
    try {
      if (
        userDetails.firstName < 1 ||
        userDetails.lastName < 1 ||
        userDetails.userEmail < 1 ||
        !userDetails.userEmail.includes("@") ||
        userDetails.password < 1 ||
        userDetails.confirmPassword < 1
      ) {
        setToastProps({
          message: "Please Enter All Credentials",
          status: "exclamation",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
      } else if (userDetails.password !== userDetails.confirmPassword) {
        setToastProps({
          message: "Password's doesn't match, Please Check!",
          status: "exclamation",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
      } else if (userDetails.password.length < 6) {
        setToastProps({
          message: "Password's should contain minimum of 6 characters",
          status: "exclamation",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
      } else if (!authData.isLoggedIn) {
        setToastProps({
          message: "Creating Account",
          status: "exclamation",
          loading: true,
        });
        setShowToast(true);
        const res = await signUpWithFirebase(
          userDetails.userEmail,
          userDetails.password
        );
        const updateRes = await updateUserFromFirebase(
          userDetails.firstName,
          userDetails.lastName,
          null
        );
        const { user } = res;
        console.log("AAA", user);
        setToastProps({
          message: "Account Created",
          status: "success",
          loading: false,
        });
        setTimeout(() => {
          setUserDetails({
            firstName: "",
            lastName: "",
            userEmail: "",
            password: "",
            confirmPassword: "",
          });
          setShowToast(false);

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
      if (err.toString().includes("email-already-in-use")) {
        setToastProps({
          message: "Account already Exist's. Please Sign In",
          status: "exclamation",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
        console.error(err);
      } else {
        setToastProps({
          message: "Error Creating Account! Please try again after some time",
          status: "failure",
          loading: false,
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
        console.error(err);
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
      <section className="flex justify-center items-center h-[130vh] w-screen bg-gray-100">
        <div className="max-w-md w-full">
          <Link
            className="block text-sm text-blue-600 font-medium cursor-pointer mb-1"
            to="/home"
          >
            {" "}
            Back Home
          </Link>
          <div className="bg-white rounded p-6 space-y-4">
            <div className="mb-4">
              <p className="text-gray-600">Sign Up</p>
              <h2 className="text-xl font-bold my-2">
                Looks like you're new here !,
                <br /> Join our community
              </h2>
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, firstName: e.target.value });
                }}
                value={userDetails.firstName}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, lastName: e.target.value });
                }}
                value={userDetails.lastName}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, userEmail: e.target.value });
                }}
                value={userDetails.userEmail}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, password: e.target.value });
                }}
                value={userDetails.password}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    confirmPassword: e.target.value,
                  });
                }}
                value={userDetails.confirmPassword}
              />
            </div>
            <div>
              <button
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                onClick={handleCreateAccount}
              >
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
    </Layout>
  );
};

export default SignUp;
