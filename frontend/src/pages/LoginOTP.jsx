import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LoginOTP(){

const [phone,setPhone]=useState("");
const [otp,setOtp]=useState("");

const sendOTP=()=>{

alert("OTP Sent!");

}

const verifyOTP=(e)=>{

e.preventDefault();

alert("OTP Verified!");

}

return(

<div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">

<Navbar/>

<div className="flex-grow flex justify-center items-center">

<form
onSubmit={verifyOTP}
className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md"
>

<h1 className="text-3xl text-yellow-400 font-bold text-center mb-8">

Login with OTP

</h1>

<input
type="tel"
placeholder="Phone Number"
className="w-full border rounded-lg p-3 mb-5"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
required
/>

<button
type="button"
onClick={sendOTP}
className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg mb-5"
>

Send OTP

</button>

<input
type="text"
placeholder="Enter OTP"
className="w-full border rounded-lg p-3 mb-6"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
required
/>

<button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg">

Verify OTP

</button>

<p className="text-center mt-6">

<Link
to="/login"
className="text-yellow-400"
>

Back to Login

</Link>

</p>

</form>

</div>

<Footer/>

</div>

);

}

export default LoginOTP;