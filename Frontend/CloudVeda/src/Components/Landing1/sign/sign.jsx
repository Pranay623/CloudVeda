import { useState } from 'react';
import * as Component from '../sign/component';
import photo from "../sign/assests/Paper plane.gif"

function SignInUpForm() {
  const [signin, toggle] = useState(true); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${photo})` }}>
      <Component.Container className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
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
              <Component.Title className="text-2xl font-bold mb-4">Welcome Back!</Component.Title>
              <Component.Paragraph className="mb-4">
                To keep connected with us please login with your personal info
              </Component.Paragraph>
              <Component.GhostButton className="px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded hover:bg-blue-100" onClick={() => toggle(true)}>
                Sign In
              </Component.GhostButton>
            </Component.LeftOverlayPanel>

            <Component.RightOverlayPanel signinIn={signin}>
              <Component.Title className="text-2xl font-bold mb-4">Hello, Friend!</Component.Title>
              <Component.Paragraph className="mb-4">
                Enter Your personal details and start your journey with us
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
