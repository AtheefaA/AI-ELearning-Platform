import React, { useState } from "react";
import "./EnrollPage.css";
import SuccessPage from "../SuccessPage/SuccessPage";

const EnrollPage = ({ course, onCancel }) => {
  const userId = 1;

  const [form, setForm] = useState({
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const formatCardNumber = (value) =>
    value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    return cleaned.length >= 3
      ? cleaned.slice(0, 2) + "/" + cleaned.slice(2)
      : cleaned;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "expiry")     formatted = formatExpiry(value);
    if (name === "cvv")        formatted = value.replace(/\D/g, "").slice(0, 3);
    setForm((prev) => ({ ...prev, [name]: formatted }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.cardHolder.trim())
      e.cardHolder = "Cardholder name is required";
    if (form.cardNumber.replace(/\s/g, "").length !== 16)
      e.cardNumber = "Enter a valid 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry))
      e.expiry = "Enter expiry as MM/YY";
    if (form.cvv.length !== 3)
      e.cvv = "CVV must be 3 digits";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          courseId:    course.id,
          courseTitle: course.title,
          amount:      parseInt(course.price.replace("₹", "")),
          cardHolder:  form.cardHolder,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEnrolled(true);
      } else {
        alert(data.error || "Enrollment failed. Please try again.");
      }
    } catch (err) {
      alert("Cannot connect to server. Make sure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  if (enrolled) return <SuccessPage course={course} onCancel={onCancel} />;

  return (
    <div className="enroll-overlay">
      <div className="enroll-card">

        {/* Header */}
        <div className="enroll-card-header">
          <h2>Complete Your Enrollment</h2>
          <p>You're one step away from learning!</p>
        </div>

        {/* Course Info */}
        <div className="enroll-course-info">
          <img src={course.image} alt={course.title} className="enroll-course-img" />
          <div className="enroll-course-details">
            <h3>{course.title}</h3>
            <span className="enroll-duration">⏳ {course.duration}</span>
            <span className="enroll-price">{course.price}</span>
          </div>
        </div>

        <div className="enroll-divider">
          <span>Payment Details</span>
        </div>

        <form onSubmit={handleSubmit} className="enroll-form">

          {/* Cardholder */}
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              name="cardHolder"
              placeholder="Name as on card"
              value={form.cardHolder}
              onChange={handleChange}
              autoComplete="cc-name"
            />
            {errors.cardHolder && <span className="error">⚠ {errors.cardHolder}</span>}
          </div>

          {/* Card Number */}
          <div className="form-group">
            <label>Card Number</label>
            <div className="input-icon-wrap">
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChange={handleChange}
                autoComplete="cc-number"
              />
              <span className="card-chip">💳</span>
            </div>
            {errors.cardNumber && <span className="error">⚠ {errors.cardNumber}</span>}
          </div>

          {/* Expiry + CVV */}
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                autoComplete="cc-exp"
              />
              {errors.expiry && <span className="error">⚠ {errors.expiry}</span>}
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="•••"
                value={form.cvv}
                onChange={handleChange}
                autoComplete="cc-csc"
              />
              {errors.cvv && <span className="error">⚠ {errors.cvv}</span>}
            </div>
          </div>

          {/* Secure Badge */}
          <div className="secure-badge">
            🔒 256-bit SSL encrypted · Your data is safe
          </div>

          {/* Pay Button */}
          <button type="submit" className="btn-pay" disabled={loading}>
            {loading ? (
              <span className="loading-text">
                <span className="spinner"></span>
                Processing...
              </span>
            ) : (
              <>💰 Pay {course.price} &amp; Enroll Now</>
            )}
          </button>

          {/* Cancel */}
          <button type="button" className="btn-cancel" onClick={onCancel}>
            ← Back to Courses
          </button>

        </form>
      </div>
    </div>
  );
};

export default EnrollPage;