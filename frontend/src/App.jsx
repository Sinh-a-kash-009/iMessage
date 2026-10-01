import React from "react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";
import { Button } from '@heroui/react';
import { ThemeProvider } from "./context/ThemeContext";
import { WallpaperProvider } from "./context/WallpaperContext";
import {Navigate,Route , Routes} from "react-router";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import {useAuth} from "@clerk/react";
const App = () => {
  const { isSignedIn , isLoaded } = useAuth();
  if (!isLoaded) {
    return <div>Loading...</div>;
  } 
  return (
    <ThemeProvider>
      <WallpaperProvider>
       <Routes>
        <Route path="/" element={isSignedIn ?<ChatPage/>:<Navigate to={"/auth"} replace />} />
        <Route path="/auth" element={!isSignedIn?<AuthPage/>:<Navigate to={"/"} replace />} />
        <Route path="/sign-up" element={<SignUpButton />} />
        <Route path="/user" element={<UserButton />} />
       </Routes>
    </WallpaperProvider>
    </ThemeProvider>
  );
};

export default App;

