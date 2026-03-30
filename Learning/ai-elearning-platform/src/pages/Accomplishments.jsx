import React from "react";
import "./Accomplishments.css";

// ✅ Import certificate images
import CertAI from "../assets/certificates/ai_certificate.png";
import CertML from "../assets/certificates/ml_certificate.png";
import CertDL from "../assets/certificates/dl_certificate.png";


const Accomplishments = () => {
  const accomplishments = [
    {
      id: 1,
      title: "Introduction to AI",
      date: "Completed on September 12, 2025",
      description:
        "Gained foundational understanding of Artificial Intelligence, key concepts, and real-world applications.",
      certificate: CertAI,
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      date: "Completed on September 28, 2025",
      description:
        "Mastered supervised and unsupervised learning algorithms and implemented ML models using Python.",
      certificate: CertML,
    },
    {
      id: 3,
      title: "Deep Learning with Neural Networks",
      date: "Completed on October 6, 2025",
      description:
        "Built and trained neural network models for image and text classification using TensorFlow and Keras.",
      certificate: CertDL,
    },
  ];

  return (
    <div className="accomplishments-page-wrapper">
      <h2>Accomplishments 🏆</h2>
      <p className="page-subtitle">
        Celebrate your learning milestones and view your earned certificates
      </p>

      <div className="accomplishments-container">
        {accomplishments.map((item) => (
          <div key={item.id} className="accomplishment-card">
            <div className="accomplishment-header">
              <div className="accomplishment-logo">A</div>
              <div>
                <h3>{item.title}</h3>
                <p className="accomplishment-date">{item.date}</p>
              </div>
            </div>

            <p className="accomplishment-description">{item.description}</p>

            {/* ✅ Certificate preview image */}
            <div className="certificate-preview">
              <img
                src={item.certificate}
                alt={`${item.title} Certificate`}
                className="certificate-image"
              />
            </div>

            {/* ✅ View / Download Buttons */}
            <div className="certificate-actions">
              <a
                href={item.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-btn"
              >
                View Certificate
              </a>
              <a
                href={item.certificate}
                download={`${item.title}_Certificate.png`}
                className="download-btn"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accomplishments;
