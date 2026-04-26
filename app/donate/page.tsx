"use client";

import { useState } from "react";
import Link from "next/link";

const DONATION_AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

export default function Page() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const getAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount && !isNaN(Number(customAmount))) return Number(customAmount);
    return 0;
  };

  const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    } else if (cleaned.startsWith('254') && cleaned.length === 12) {
      cleaned = cleaned;
    } else if (cleaned.length === 9 && !cleaned.startsWith('254')) {
      cleaned = '2547' + cleaned;
    }
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    
    if (!phoneNumber.trim()) {
      setError("Please enter your phone number");
      return;
    }
    
    const amount = getAmount();
    if (amount === 0) {
      setError("Please select or enter a donation amount");
      return;
    }
    
    if (amount < 10) {
      setError("Minimum donation amount is KES 10");
      return;
    }
    
    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (formattedPhone.length !== 12) {
      setError("Please enter a valid phone number (e.g., 0712345678)");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call to M-Pesa
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would call your actual M-Pesa API
      console.log("Donation initiated:", {
        name: fullName,
        phone: formattedPhone,
        amount: amount,
        email: email
      });
      
      setSuccess(true);
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", padding: "60px 20px" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ 
            width: "80px", 
            height: "80px", 
            background: "#10b981", 
            borderRadius: "40px", 
            margin: "0 auto 24px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontSize: "40px"
          }}>
            ✓
          </div>
          <h1 style={{ color: "white", fontSize: "32px", marginBottom: "16px" }}>Thank You for Your Donation!</h1>
          <p style={{ color: "#94a3b8", marginBottom: "8px" }}>
            You have donated KES {getAmount().toLocaleString()}
          </p>
          <p style={{ color: "#94a3b8", marginBottom: "32px" }}>
            Check your phone ({formatPhoneNumber(phoneNumber)}) for the M-Pesa prompt
          </p>
          <Link 
            href="/" 
            style={{ 
              background: "#3b82f6", 
              color: "white", 
              padding: "12px 24px", 
              borderRadius: "8px", 
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", padding: "60px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Link 
          href="/" 
          style={{ 
            color: "#60a5fa", 
            textDecoration: "none", 
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px"
          }}
        >
          ← Back to Home
        </Link>
        
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "white", marginBottom: "12px" }}>
            Donate
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "18px" }}>
            Support youth through football, education, and mentorship in Kenya
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "32px" }}>
          {/* Donation Amounts */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ color: "#94a3b8", marginBottom: "8px", display: "block", fontSize: "14px" }}>
              Select Amount (KES)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {DONATION_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                    setError("");
                  }}
                  style={{
                    padding: "12px",
                    background: selectedAmount === amount ? "#3b82f6" : "rgba(255,255,255,0.1)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedAmount !== amount) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedAmount !== amount) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    }
                  }}
                >
                  KES {amount.toLocaleString()}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
                setError("");
              }}
              placeholder="Or enter custom amount (KES)"
              style={{ 
                width: "100%", 
                marginTop: "12px", 
                padding: "12px", 
                background: "rgba(255,255,255,0.1)", 
                border: "1px solid rgba(255,255,255,0.2)", 
                borderRadius: "8px", 
                color: "white",
                outline: "none"
              }}
            />
          </div>
          
          {/* Display selected amount */}
          {getAmount() > 0 && (
            <div style={{ 
              background: "rgba(59,130,246,0.1)", 
              border: "1px solid rgba(59,130,246,0.3)", 
              borderRadius: "8px", 
              padding: "12px", 
              marginBottom: "24px",
              textAlign: "center"
            }}>
              <span style={{ color: "#60a5fa", fontSize: "14px" }}>
                Donating: KES {getAmount().toLocaleString()}
              </span>
            </div>
          )}
          
          {/* Full Name */}
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name *"
              required
              style={{ 
                width: "100%", 
                padding: "12px", 
                background: "rgba(255,255,255,0.1)", 
                border: "1px solid rgba(255,255,255,0.2)", 
                borderRadius: "8px", 
                color: "white",
                outline: "none"
              }}
            />
          </div>
          
          {/* Phone Number */}
          <div style={{ marginBottom: "16px" }}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="M-Pesa Phone Number * (e.g., 0712345678)"
              required
              style={{ 
                width: "100%", 
                padding: "12px", 
                background: "rgba(255,255,255,0.1)", 
                border: "1px solid rgba(255,255,255,0.2)", 
                borderRadius: "8px", 
                color: "white",
                outline: "none"
              }}
            />
          </div>
          
          {/* Email */}
          <div style={{ marginBottom: "24px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (Optional - for receipt)"
              style={{ 
                width: "100%", 
                padding: "12px", 
                background: "rgba(255,255,255,0.1)", 
                border: "1px solid rgba(255,255,255,0.2)", 
                borderRadius: "8px", 
                color: "white",
                outline: "none"
              }}
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div style={{ 
              background: "rgba(239,68,68,0.1)", 
              border: "1px solid rgba(239,68,68,0.3)", 
              borderRadius: "8px", 
              padding: "12px", 
              marginBottom: "16px",
              color: "#f87171",
              fontSize: "14px",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            style={{
              width: "100%",
              padding: "16px",
              background: isProcessing ? "#475569" : "#3b82f6",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: isProcessing ? "not-allowed" : "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && !success) {
                e.currentTarget.style.background = "#2563eb";
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing && !success) {
                e.currentTarget.style.background = "#3b82f6";
              }
            }}
          >
            {isProcessing ? (
              <span>Processing... ⏳</span>
            ) : (
              <span>Donate KES {getAmount().toLocaleString()} via M-Pesa 💳</span>
            )}
          </button>
          
          <p style={{ fontSize: "12px", color: "#64748b", textAlign: "center", marginTop: "16px" }}>
            You will receive an M-Pesa STK push on your phone to complete payment
          </p>
        </form>
      </div>
    </div>
  );
}