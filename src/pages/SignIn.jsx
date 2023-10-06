import { Link } from "react-router-dom";
const SignIn = () => {
  return (
<>
<section className="flex justify-center items-center h-screen bg-gray-100">
<div className="max-w-md w-full">
<Link className="block text-sm text-blue-600 hover:underline mb-1" to='/home'> Back Home</Link>
<div className="max-w-md w-full bg-white rounded p-6 space-y-4">
<div className="mb-4">
        <p className="text-gray-600 font-bold text-xl">Sign In</p>
        <div>
            <span>or</span>
            <Link className="text-sm text-blue-600 hover:underline" to='/signup'> create an account</Link>
        </div>
    </div>
    <div>
        <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="email" placeholder="Email"/>
    </div>
    <div>
        <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password"/>
    </div>
    <div>
        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">Sign In</button>
    </div>
    <div className="flex items-center justify-between">
        <div className="flex flex-row items-center">
            <input type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"/>
            <label htmlFor="comments" className="ml-2 text-sm font-normal text-gray-600">Remember me</label>
        </div>
        <div>
            <a className="text-sm text-blue-600 hover:underline" href="#">Forgot password?</a>
        </div>
    </div>
</div>
</div>
</section>
</>
  )
}

export default SignIn