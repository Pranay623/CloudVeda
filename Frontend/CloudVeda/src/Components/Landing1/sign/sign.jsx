import React, { useState } from "react";
import * as Component from "../sign/component";
import photo from "../sign/assests/Paper plane.gif";

function SignInUpForm() {
  const [signin, toggle] = useState(true); // Toggle between sign-in and sign-up
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Basic validation
    if (!formData.email || !formData.password || (!signin && !formData.name)) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = signin
        ? "http://localhost:3000/api/login" 
        : "http://localhost:3000/api/signup";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      const token = data.token;
      const id = data._id;
      setMessage(`Success! Token: ${token}`);
      localStorage.setItem("authToken", token);  
      localStorage.setItem("userid",id);
    } catch (err) {
      setError(err.message || "Failed to process the request.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${photo})` }}
    >
      <Component.Container className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        <Component.SignUpContainer signinIn={signin}>

          <Component.Form className="p-8">
            <Component.Title className="text-2xl font-bold mb-4">Create Account</Component.Title>
            <Component.Input className="w-full p-2 mb-4 border border-gray-300 rounded" type="text" placeholder="Name" />
            <Component.Input className="w-full p-2 mb-4 border border-gray-300 rounded" type="email" placeholder="Email" />
            <Component.Input className="w-full p-2 mb-4 border border-gray-300 rounded" type="password" placeholder="Password" />
            <Component.Button className="w-full py-2 bg-[#2D493B] text-white rounded hover:bg-[#274034]" type="submit">Sign Up</Component.Button>

          </Component.Form>
        </Component.SignUpContainer>

        <Component.SignInContainer signinIn={signin}>

          <Component.Form className="p-8">
            <Component.Title className="text-3xl font-bold mb-4">Sign in</Component.Title>
            <Component.Input className="w-full p-2 mb-4 border border-gray-300 rounded" type="email" placeholder="Email" />
            <Component.Input className="w-full p-2 mb-4 border border-gray-300 rounded" type="password" placeholder="Password" />
            <Component.Button className="w-full py-2 bg-[#2D493B] text-white rounded hover:bg-[#274034]" type="submit">Sign In</Component.Button>
            <Component.chotabutton className="text-[#2D493B] mt-2 hover:underline">Forget Password</Component.chotabutton>

          </Component.Form>
        </Component.SignInContainer>

        <Component.OverlayContainer signinIn={signin}>
          <Component.Overlay signinIn={signin}>
            <Component.LeftOverlayPanel signinIn={signin}>
              <Component.Title className="text-2xl font-bold mb-4">
                Welcome Back!
              </Component.Title>
              <Component.Paragraph className="mb-4">
                To keep connected with us please login with your personal info
              </Component.Paragraph>
              <Component.GhostButton
                className="px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-100"
                onClick={() => toggle(true)}
              >
                Sign In
              </Component.GhostButton>
            </Component.LeftOverlayPanel>

            <Component.RightOverlayPanel signinIn={signin}>
              <Component.Title className="text-2xl font-bold mb-4">
                Hello, Friend!
              </Component.Title>
              <Component.Paragraph className="mb-4">
                Enter your personal details and start your journey with us
              </Component.Paragraph>

              <Component.GhostButton className="px-4 py-2 text-blue-600 bg-white border border-[#2D493B] rounded hover:bg-blue-100" onClick={() => toggle(false)}>

                Sign Up
              </Component.GhostButton>
            </Component.RightOverlayPanel>
          </Component.Overlay>
        </Component.OverlayContainer>
      </Component.Container>
    </div>
  );
}

export default SignInUpForm;
