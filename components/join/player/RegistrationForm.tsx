"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Types
interface RegistrationFormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  nationality: string;
  
  // Contact Information
  email: string;
  phoneNumber: string;
  alternatePhone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  
  // Football Information
  position: string[];
  dominantFoot: "left" | "right" | "both";
  yearsOfExperience: number;
  previousClub?: string;
  jerseySize: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  medicalConditions?: string;
  allergies?: string;
  
  // Parent/Guardian Information (for minors)
  parentGuardianName?: string;
  parentGuardianEmail?: string;
  parentGuardianPhone?: string;
  
  // Additional Information
  howDidYouHear: string[];
  referralCode?: string;
  goals: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  
  // Consent
  agreeToTerms: boolean;
  agreeToMediaRelease: boolean;
  agreeToMedicalTreatment: boolean;
  subscribeToNewsletter: boolean;
}

// Props interface
interface RegistrationFormProps {
  referralCode?: string | null;
  onSuccess?: (data: RegistrationFormData) => void;
  onError?: (error: Error) => void;
  className?: string;
}

// Validation Schema
const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required").min(3, "Name must be at least 3 characters"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  age: yup.number().min(5, "Minimum age is 5").max(21, "Maximum age is 21").required(),
  gender: yup.string().oneOf(["male", "female", "other", "prefer-not-to-say"]).required(),
  nationality: yup.string().required("Nationality is required"),
  
  email: yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  
  address: yup.object().shape({
    street: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State/Province is required"),
    postalCode: yup.string().required("Postal code is required"),
    country: yup.string().required("Country is required"),
  }),
  
  position: yup.array().min(1, "Select at least one position").required(),
  dominantFoot: yup.string().oneOf(["left", "right", "both"]).required(),
  yearsOfExperience: yup.number().min(0).max(20).required(),
  jerseySize: yup.string().oneOf(["XS", "S", "M", "L", "XL", "XXL"]).required(),
  
  emergencyContact: yup.object().shape({
    name: yup.string().required("Emergency contact name is required"),
    relationship: yup.string().required("Relationship is required"),
    phoneNumber: yup.string().required("Emergency contact phone is required"),
  }),
  
  agreeToTerms: yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
  agreeToMediaRelease: yup.boolean().oneOf([true], "Media release consent is required"),
  agreeToMedicalTreatment: yup.boolean().oneOf([true], "Medical treatment consent is required"),
});

// Position options
const POSITION_OPTIONS = [
  { value: "goalkeeper", label: "Goalkeeper", icon: "🧤" },
  { value: "center-back", label: "Center Back", icon: "🛡️" },
  { value: "full-back", label: "Full Back", icon: "↔️" },
  { value: "defensive-midfielder", label: "Defensive Midfielder", icon: "⚙️" },
  { value: "central-midfielder", label: "Central Midfielder", icon: "🎯" },
  { value: "attacking-midfielder", label: "Attacking Midfielder", icon: "✨" },
  { value: "winger", label: "Winger", icon: "⚡" },
  { value: "striker", label: "Striker", icon: "🎯" },
];

// How did you hear options
const HEAR_OPTIONS = [
  "Social Media",
  "Friend/Family",
  "School Program",
  "Local Tournament",
  "Online Ad",
  "Coach Recommendation",
  "Email Newsletter",
  "Other",
];

// Country options (simplified - you can expand)
const COUNTRY_OPTIONS = [
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "GH", name: "Ghana" },
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  referralCode,
  onSuccess,
  onError,
  className = "",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [currentStep, setCurrentStep] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      gender: "prefer-not-to-say",
      position: [],
      howDidYouHear: [],
      subscribeToNewsletter: true,
      referralCode: referralCode || "",
      yearsOfExperience: 0,
    },
    mode: "onChange",
  });

  const watchAllFields = watch();
  
  // Calculate form progress
  useEffect(() => {
    const totalFields = Object.keys(validationSchema.fields).length;
    const filledFields = Object.values(watchAllFields).filter(
      (value) => value !== undefined && value !== "" && value !== null
    ).length;
    const progress = (filledFields / totalFields) * 100;
    setFormProgress(progress);
  }, [watchAllFields]);

  // Auto-calculate age from date of birth
  const handleDateOfBirthChange = useCallback((date: string) => {
    if (date) {
      const birthDate = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setValue("age", age);
    }
  }, [setValue]);

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      // Add timestamp and metadata
      const submissionData = {
        ...data,
        submittedAt: new Date().toISOString(),
        source: "website_player_registration",
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
        referralCode: referralCode || data.referralCode,
      };
      
      // Send to your API endpoint
      const response = await fetch("/api/player/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }
      
      const result = await response.json();
      
      // Track successful registration
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "registration_complete", {
          event_category: "conversion",
          event_label: "player_registration",
          value: 1,
        });
      }
      
      setSubmitStatus("success");
      onSuccess?.(data);
      
      // Store in localStorage for recovery
      localStorage.setItem("last_registration_email", data.email);
      
      // Optionally redirect after success
      setTimeout(() => {
        window.location.href = "/thank-you?type=player";
      }, 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitStatus("error");
      onError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    // Validate current step fields
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["fullName", "dateOfBirth", "gender", "nationality", "email", "phoneNumber"];
        break;
      case 2:
        fieldsToValidate = ["address.street", "address.city", "address.state", "address.postalCode", "address.country"];
        break;
      case 3:
        fieldsToValidate = ["position", "dominantFoot", "yearsOfExperience", "jerseySize"];
        break;
      case 4:
        fieldsToValidate = ["emergencyContact.name", "emergencyContact.relationship", "emergencyContact.phoneNumber"];
        break;
    }
    
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-xl">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful! 🎉</h3>
        <p className="text-gray-700 mb-6">
          Thank you for registering with ReactNow Football Academy. Our team will contact you within 24-48 hours with next steps.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">📧 Confirmation email sent to your inbox</p>
          <p className="text-sm text-gray-600">📱 Save our number: +1 (555) 123-4567</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Step {currentStep} of 5</span>
          <span>{Math.round(formProgress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  {...register("fullName")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  onChange={(e) => handleDateOfBirthChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  {...register("gender")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality *
                </label>
                <select
                  {...register("nationality")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {COUNTRY_OPTIONS.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="player@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry="US"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address Information */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  {...register("address.street")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Football Street"
                />
                {errors.address?.street && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  {...register("address.city")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.address?.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province *
                </label>
                <input
                  {...register("address.state")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code *
                </label>
                <input
                  {...register("address.postalCode")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  {...register("address.country")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {COUNTRY_OPTIONS.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Football Information */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">Football Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Position(s) *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {POSITION_OPTIONS.map(position => (
                    <label key={position.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        value={position.value}
                        {...register("position")}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>{position.icon} {position.label}</span>
                    </label>
                  ))}
                </div>
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dominant Foot *
                </label>
                <select
                  {...register("dominantFoot")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="right">Right</option>
                  <option value="left">Left</option>
                  <option value="both">Both (Ambidextrous)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  {...register("yearsOfExperience")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Club
                </label>
                <input
                  {...register("previousClub")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jersey Size *
                </label>
                <select
                  {...register("jerseySize")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Conditions / Allergies
                </label>
                <textarea
                  {...register("medicalConditions")}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Please list any medical conditions or allergies we should be aware of..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Emergency Contact & Consent */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">Emergency Contact & Legal</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-700">
                ⚠️ Emergency contact information is crucial. Please provide accurate details.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Name *
                </label>
                <input
                  {...register("emergencyContact.name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Full name"
                />
                {errors.emergencyContact?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship *
                </label>
                <input
                  {...register("emergencyContact.relationship")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Parent, Guardian, Sibling"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Phone *
                </label>
                <input
                  {...register("emergencyContact.phoneNumber")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Phone number"
                />
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register("agreeToTerms")}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> *
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
              )}
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register("agreeToMediaRelease")}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  I consent to media release for promotional purposes *
                </span>
              </label>
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register("agreeToMedicalTreatment")}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  I authorize medical treatment in case of emergency *
                </span>
              </label>
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register("subscribeToNewsletter")}
                  className="mt-1 w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Subscribe to newsletter for updates and tips
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">Review Your Application</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Personal Details</h3>
              <p><strong>Name:</strong> {watchAllFields.fullName}</p>
              <p><strong>Email:</strong> {watchAllFields.email}</p>
              <p><strong>Phone:</strong> {watchAllFields.phoneNumber}</p>
              <p><strong>Age:</strong> {watchAllFields.age}</p>
              
              <h3 className="font-semibold text-lg mt-4">Football Profile</h3>
              <p><strong>Positions:</strong> {watchAllFields.position?.join(", ")}</p>
              <p><strong>Experience:</strong> {watchAllFields.yearsOfExperience} years</p>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-sm text-blue-800">
                  ✅ Please review all information carefully before submitting. You will receive a confirmation email.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              ← Previous
            </button>
          )}
          
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ml-auto"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed ml-auto flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;