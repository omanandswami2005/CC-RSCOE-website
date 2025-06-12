import { useState } from "react";
import { motion } from "framer-motion";
import home from "../Images/home.gif";
import { userRegister, userLogin } from "../api/authApi";
import SocialSignInButtons from "../Components/AuthComponents/SocialSignInButtons";
import {showSuccessToast} from "../../utils/toastUtils";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      await userRegister(
        { 
          email, 
          password, 
          name, 
          userName: username 
        }, 
        setErrors
      );
      showSuccessToast("User created successfully!");
      // Clear form after successful registration
      setUsername("");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      // Error handling is done in the API function via setErrors
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      await userLogin({ email, password }, setErrors);
      // Success handling is done in the API function (redirect to dashboard)
      showSuccessToast("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      // Error handling is done in the API function via setErrors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="relative w-full max-w-4xl h-[550px] perspective-1000">
        <motion.div
          className="absolute w-full h-full bg-[#141327] rounded-2xl shadow-lg flex"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isLogin ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front - Signup */}
          <div
            className="absolute w-full h-full flex flex-col md:flex-row items-center justify-between p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <SocialSignInButtons setError={setErrors} />
              <h2 className="text-white text-2xl mb-4 font-semibold">
                Sign Up
              </h2>
              
              {/* Display general error */}
              {errors.general && (
                <div className="w-full max-w-xs mb-4 p-2 bg-red-600 text-white text-sm rounded">
                  {errors.general}
                </div>
              )}
              
              <form className="w-full max-w-xs" onSubmit={handleRegisterSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-gray-700 text-white outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-gray-700 text-white outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-gray-700 text-white outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white outline-none"
                  required
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
              <p
                className="text-gray-400 mt-4 cursor-pointer hover:text-gray-300"
                onClick={() => setIsLogin(true)}
              >
                Already have an account?{" "}
                <span className="text-blue-400">Login</span>
              </p>
            </div>

            {/* Signup Image */}
            <div className="bg-blue-500 hidden md:flex w-1/2 h-full rounded-xl items-center justify-center">
              <img
                src={home}
                alt="Signup"
                className="h-[60%] w-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Back - Login */}
          <div
            className="absolute w-full h-full flex flex-col md:flex-row items-center justify-between p-6"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="bg-purple-600 rounded-xl hidden md:flex w-1/2 h-full items-center justify-center">
              <img
                src={home}
                alt="Login"
                className="h-[60%] w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center">
              <SocialSignInButtons setError={setErrors} />
              <h2 className="text-white text-2xl mb-4 font-semibold">Login</h2>
              
              {/* Display general error */}
              {errors.general && (
                <div className="w-full max-w-xs mb-4 p-2 bg-red-600 text-white text-sm rounded">
                  {errors.general}
                </div>
              )}
              
              <form className="w-full max-w-xs" onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-gray-700 text-white outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white outline-none"
                  required
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
                <p
                  className="text-gray-400 mt-4 cursor-pointer hover:text-gray-300"
                  onClick={() => setIsLogin(false)}
                >
                  Don&apos;t have an account?{" "}
                  <span className="text-purple-400">Sign Up</span>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}