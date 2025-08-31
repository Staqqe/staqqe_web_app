"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  KeyRound, 
  Mail, 
  Send, 
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
  RotateCcw,
  AlertCircle
} from "lucide-react";

export default function ForgotPasswordFlow() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (currentStep === 2 && resendTimer > 0) {
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
    }
  }, [currentStep, resendTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData(prev => ({ ...prev, otp: newOtp }));
    
    if (errors.otp) setErrors(prev => ({ ...prev, otp: "" }));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedArray = pastedData.split('').slice(0, 6);
    
    const newOtp = [...formData.otp];
    pastedArray.forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });
    setFormData(prev => ({ ...prev, otp: newOtp }));
  };

  // Step 1: Email Input
  const handleEmailSubmit = async () => {
    if (!formData.email) {
      setErrors({ email: "Email address is required" });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Reset code sent to:", formData.email);
      
      setCurrentStep(2);
      setResendTimer(60);
      setCanResend(false);
      
    } catch (error) {
      setErrors({ email: "Failed to send reset code. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: OTP Verification
  const handleOTPVerification = async () => {
    const otpString = formData.otp.join("");
    
    if (otpString.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit code" });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("OTP verified:", otpString);
      
      setCurrentStep(3);
      
    } catch (error) {
      setErrors({ otp: "Invalid verification code. Please try again." });
      setFormData(prev => ({ ...prev, otp: ["", "", "", "", "", ""] }));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: New Password
  const handlePasswordReset = async () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain uppercase, lowercase, and number";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Password reset successful");
      
      // Redirect to login or success page
      // router.push("/login?reset=success");
      
    } catch (error) {
      setErrors({ submit: "Failed to reset password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("OTP resent to:", formData.email);
      
      setResendTimer(60);
      setCanResend(false);
      
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <KeyRound className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">Enter your email address and we'll send you a reset code</p>
            </div>

            {/* Email Input */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <button
                onClick={handleEmailSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Reset Code
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Remember your password?{" "}
                <a href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Reset Code</h1>
              <p className="text-gray-600 mb-1">Enter the 6-digit code sent to</p>
              <p className="text-blue-600 font-semibold">{formData.email}</p>
            </div>

            {/* OTP Input */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-center space-x-3 mb-4">
                  {formData.otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      onPaste={handleOTPPaste}
                      className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 ${
                        errors.otp ? "border-red-500" : digit ? "border-orange-500 bg-orange-50" : "border-gray-300"
                      }`}
                      placeholder="•"
                    />
                  ))}
                </div>
                
                {errors.otp && <p className="text-red-500 text-sm text-center mb-4">{errors.otp}</p>}
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

              <button
                onClick={handleOTPVerification}
                disabled={isLoading || formData.otp.some(digit => !digit)}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Verify Code
                  </>
                )}
              </button>
            </div>

            {/* Back Button */}
            <div className="text-center mt-6">
              <button 
                onClick={() => setCurrentStep(1)}
                className="text-gray-600 hover:text-orange-600 flex items-center justify-center mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Email
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h1>
              <p className="text-gray-600">Create a strong password for your account</p>
            </div>

            {/* Password Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
                      errors.newPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Password Requirements */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Password Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Contains uppercase and lowercase letters</li>
                      <li>• Contains at least one number</li>
                    </ul>
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <p className="text-red-800 text-sm">{errors.submit}</p>
                </div>
              )}

              <button
                onClick={handlePasswordReset}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Reset Password
                  </>
                )}
              </button>
            </div>

            {/* Back Button */}
            <div className="text-center mt-6">
              <button 
                onClick={() => setCurrentStep(2)}
                className="text-gray-600 hover:text-green-600 flex items-center justify-center mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Verification
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderStep()}
      </div>
    </div>
  );
}