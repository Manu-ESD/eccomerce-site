import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInHandler } from "../utility/utils";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../features/authSlice";


const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authData = useSelector((state) => state.authData);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signInClickHandler = async () => {
        setLoading(true);
        try {
          if (!authData.isLoggedIn) {
            const res = await signInHandler({ email, password });
            const { user } = res;
            setLoading(false);
            dispatch(signIn({ displayName:user.displayName, email:user.email, phoneNumber:user.phoneNumber, photoURL:user.photoURL }));
            navigate("/");
          }
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };
      
  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full">
          <Link
            className="block text-sm text-blue-600 hover:underline mb-1"
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
                  className="text-sm text-blue-600 hover:underline"
                  to="/signup"
                >
                  {" "}
                  create an account
                </Link>
              </div>
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                onClick={signInClickHandler}
              >
                Sign In
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Link
                  to="/password-reset"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn