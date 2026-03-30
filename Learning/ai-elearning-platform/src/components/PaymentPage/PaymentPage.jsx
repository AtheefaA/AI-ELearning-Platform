import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setTimeout(() => setIsPaid(true), 1500);
  };

  if (isPaid) {
    return (
      <div className="payment-success-page">
        <h1>✅ Payment Successful!</h1>
        <p>
          Welcome to the <b>{course?.title}</b> course 🎉
        </p>

        <button className="back-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="payment-page-wrapper">
      <div className="payment-container">
        {/* LEFT SIDE - FORM */}
        <div className="payment-form">
          <h2>Checkout</h2>
          <p>Complete your payment to enroll in this course</p>

          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Card Number</label>
          <input type="text" placeholder="xxxx xxxx xxxx xxxx" />

          <label>Expiry & CVV</label>
          <div className="card-details">
            <input type="text" placeholder="MM/YY" />
            <input type="text" placeholder="CVV" />
          </div>

          <button className="pay-btn" onClick={handlePayment}>
            Pay {course?.price}
          </button>
        </div>

        {/* RIGHT SIDE - COURSE SUMMARY */}
        <div className="course-summary">
          <img src={course?.image} alt={course?.title} />
          <h3>{course?.title}</h3>
          <p>{course?.description}</p>

          <div className="price-summary">
            <p>Subtotal: {course?.price}</p>
            <p>Discount: ₹0</p>
            <h4>Total: {course?.price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
