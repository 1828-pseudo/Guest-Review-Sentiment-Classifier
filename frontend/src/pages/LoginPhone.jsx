import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LoginPhone() {

  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=(e)=>{
    e.preventDefault();

    alert("Phone Login Successful!");
  }

  return(

<div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">

<Navbar/>

<div className="flex-grow flex justify-center items-center">

<form
onSubmit={handleLogin}
className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md"
>

<h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">
Phone Login
</h1>

<input
type="tel"
placeholder="Phone Number"
className="w-full border rounded-lg p-3 mb-5"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
className="w-full border rounded-lg p-3 mb-6"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg">

Login

</button>

<p className="text-center mt-6">

<Link to="/login" className="text-yellow-400">

Back to Email Login

</Link>

</p>

</form>

</div>

<Footer/>

</div>

  );
}

export default LoginPhone;