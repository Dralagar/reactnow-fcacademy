"use client";

import { useState } from "react";
import Link from "next/link";
import PaymentSystem from "@/components/PaymentSystem";

export default function DonateClient() {
  const [showPaymentSystem, setShowPaymentSystem] = useState(false);

  if (showPaymentSystem) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link 
              href="/donate" 
              onClick={() => setShowPaymentSystem(false)}
              className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
            >
              ← Back to Donation Options
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Make Your Donation</h1>
            <p className="text-lg text-gray-600">
              Choose your preferred payment method and amount to support youth football development
            </p>
          </div>
          <PaymentSystem 
            type="donation"
            suggestedAmounts={[500, 1000, 2500, 5000, 10000, 25000]}
            onSuccess={(payment) => {
              console.log('Payment successful:', payment);
              // Could redirect to success page or show confirmation
            }}
            onError={(error) => {
              console.error('Payment error:', error);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Support Youth Football Development
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your donation helps us provide quality football training, education, and mentorship 
            to talented youth across Nairobi. Every contribution makes a difference in shaping 
            the future of young athletes.
          </p>
          <button
            onClick={() => setShowPaymentSystem(true)}
            className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Donate Now 💝
          </button>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏈</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Equipment & Gear</h3>
            <p className="text-gray-600">
              Provide quality footballs, cones, training equipment, and proper gear for young athletes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Education Support</h3>
            <p className="text-gray-600">
              Fund educational materials, tutoring programs, and school fees for student-athletes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tournament Participation</h3>
            <p className="text-gray-600">
              Sponsor travel, accommodation, and registration fees for local and national tournaments
            </p>
          </div>
        </div>

        {/* Donation Options */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Impact</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => setShowPaymentSystem(true)}
              className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-300"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">KES 500</div>
              <div className="text-sm text-gray-700">Training ball for a team</div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-2xl">⚽</span>
              </div>
            </button>

            <button
              onClick={() => setShowPaymentSystem(true)}
              className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-300"
            >
              <div className="text-3xl font-bold text-green-600 mb-2">KES 1,000</div>
              <div className="text-sm text-gray-700">One month training fees</div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-2xl">🥅</span>
              </div>
            </button>

            <button
              onClick={() => setShowPaymentSystem(true)}
              className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-300"
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">KES 5,000</div>
              <div className="text-sm text-gray-700">Complete player kit</div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-2xl">👕</span>
              </div>
            </button>

            <button
              onClick={() => setShowPaymentSystem(true)}
              className="group relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-300"
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">KES 10,000</div>
              <div className="text-sm text-gray-700">Tournament sponsorship</div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-2xl">🏆</span>
              </div>
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setShowPaymentSystem(true)}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Or choose a custom amount →
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment Methods</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">M-Pesa</h3>
              <p className="text-sm text-gray-600">Fast mobile money payments</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Credit/Debit Card</h3>
              <p className="text-sm text-gray-600">Visa, Mastercard & more</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🅿️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">PayPal</h3>
              <p className="text-sm text-gray-600">Secure global payments</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Internal</h3>
              <p className="text-sm text-gray-600">Direct donations</p>
            </div>
          </div>
        </div>

        {/* Trust & Security */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Trust & Security</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">
                All transactions are encrypted and processed through secure payment gateways
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparent</h3>
              <p className="text-sm text-gray-600">
                Track how your donation is making an impact through regular updates and reports
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🌟</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tax Deductible</h3>
              <p className="text-sm text-gray-600">
                All donations are tax-deductible and you'll receive a receipt for your records
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join us in nurturing the next generation of football talent and leaders
          </p>
          <button
            onClick={() => setShowPaymentSystem(true)}
            className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Start Your Donation →
          </button>
        </div>
      </div>
    </div>
  );
}
