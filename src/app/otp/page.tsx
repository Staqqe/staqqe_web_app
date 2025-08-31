"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle,
  RotateCcw
} from "lucide-react";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [email] = useState("john@example.com"); // This should come from props or context
  const inputRefs = useRef([]);

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Clear error when user starts typing
    if (error) setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedArray = pastedData.split('').slice(0, 6);
    
    const newOtp = [...otp];
    pastedArray.forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    
    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful verification
      console.log("OTP verified successfully:", otpString);
      
      // Redirect to biodata page or dashboard
      // router.push("/update-biodata");
      
    } catch (error) {
      setError("Invalid verification code. Please try again.");
      // Clear OTP inputs on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("OTP resent to:", email);
      
      // Reset timer
      setResendTimer(60);
      setCanResend(false);
      
      // Start countdown again
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
            <p className="text-gray-600 mb-1">Enter the 6-digit code sent to</p>
            <p className="text-blue-600 font-semibold">{email}</p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <div className="flex justify-center space-x-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
                    error ? "border-red-500" : digit ? "border-green-500 bg-green-50" : "border-gray-300"
                  }`}
                  placeholder="•"
                />
              ))}
            </div>
            
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
          </div>

          {/* Resend Section */}
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-3">Didn't receive the code?</p>
            <button
              onClick={handleResendOTP}
              disabled={!canResend}
              className={`font-medium transition-colors ${
                canResend 
                  ? "text-blue-600 hover:text-blue-800 cursor-pointer" 
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              {canResend ? (
                <span className="flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Resend Code
                </span>
              ) : (
                `Resend in ${resendTimer}s`
              )}
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading || otp.some(digit => !digit)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Verify Account
              </>
            )}
          </button>

          {/* Back Button */}
          <div className="text-center mt-6">
            <button className="text-gray-600 hover:text-blue-600 flex items-center justify-center mx-auto transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}