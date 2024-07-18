import React, { useState, useRef } from "react";
import firebase from "../firebase";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const recaptchaRef = useRef(null);
  const handleSentOTP = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.innerHTML = '<div id="recaptcha-container"></div>';
    }

    const verifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, verifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        alert("OTP sent to your phone number");
      })
      .catch((error) => {
        console.log("Error sending OTP:", error);
      });
  };

  const handleVerifyOTP = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error in verifying OTP:- ", error);
      });
  };

  return (
    <div>
      <h1>Phone OTP Authentication</h1>
      <div ref={recaptchaRef}></div>
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSentOTP}>Send OTP</button>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
    </div>
  );
};

export default PhoneAuth;
