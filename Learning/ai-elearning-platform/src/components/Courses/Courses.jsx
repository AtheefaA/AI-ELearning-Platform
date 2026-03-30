import React, { useState } from "react";
import "./Courses.css";
import EnrollPage from "../EnrollPage/EnrollPage";

// === Course Images ===
import deepLearning from "../../assets/deep-learning.jpg";
import DataScience from "../../assets/Data Science Foundations.jpg";
import generative from "../../assets/Generative AI with ChatGPT.jpg";
import ai from "../../assets/AI Ethics and Responsible AI.jpg";
import business from "../../assets/AI in Business Strategy.jpeg";
import robotics from "../../assets/AI for Robotics.jpg";
import python from "../../assets/Predictive Analytics with Python.webp";
import speech from "../../assets/Speech Recognition Systems.jpg";
import finance from "../../assets/AI for Finance.jpg";
import vision from "../../assets/Advanced Computer Vision.webp";
import cyber from "../../assets/AI for Cybersecurity.webp";
import bot from "../../assets/AI-Driven Chatbot Development.webp";
import data from "../../assets/Big Data Analytics with AI.jpeg";
import cap from "../../assets/AI Capstone Project.webp";
import intro from "../../assets/Introduction to AI.png"

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // === All 21 Courses with Video for Enroll Page ===
  const courses = [
    {
      id: 1,
      title: "Introduction to AI",
      description: "Learn the basics of artificial intelligence, concepts, and techniques.",
      duration: "4 weeks",
      price: "₹499",
      image:
        intro,
      video: "https://videos.pexels.com/video-files/3195394/3195394-uhd_3840_2160_25fps.mp4",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      description: "Explore machine learning algorithms with practical examples and projects.",
      duration: "6 weeks",
      price: "₹649",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      video: "https://videos.pexels.com/video-files/852370/852370-hd_1280_720_25fps.mp4",
    },
    {
      id: 3,
      title: "Deep Learning with Neural Networks",
      description: "Understand neural networks and deep learning architectures.",
      duration: "8 weeks",
      price: "₹799",
      image: deepLearning,
      video: "https://videos.pexels.com/video-files/4148372/4148372-hd_1280_720_25fps.mp4",
    },
    {
      id: 4,
      title: "Natural Language Processing",
      description: "Discover how to analyze and generate human language using AI.",
      duration: "5 weeks",
      price: "₹699",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      video: "https://videos.pexels.com/video-files/5495776/5495776-hd_1280_720_25fps.mp4",
    },
    {
      id: 5,
      title: "Computer Vision Basics",
      description: "Learn image processing and object recognition techniques.",
      duration: "6 weeks",
      price: "₹699",
      image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=400&q=80",
      video: "https://videos.pexels.com/video-files/853428/853428-hd_1280_720_25fps.mp4",
    },
    {
      id: 6,
      title: "Reinforcement Learning",
      description: "Study agents and reward-based learning methods.",
      duration: "7 weeks",
      price: "₹799",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSYPKP5AAbzJvrIevSRH5yOFmA8HfagksP6Q&s",
      video: "https://videos.pexels.com/video-files/5717117/5717117-hd_1280_720_25fps.mp4",
    },
    {
      id: 7,
      title: "AI for Healthcare",
      description: "Use AI to predict diseases, diagnose conditions, and analyze medical data.",
      duration: "5 weeks",
      price: "₹699",
      image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=400&q=80",
      video: "https://videos.pexels.com/video-files/3826677/3826677-hd_1280_720_25fps.mp4",
    },
    {
      id: 8,
      title: "Data Science Foundations",
      description: "Learn statistics, Python, and visualization techniques for data analysis.",
      duration: "6 weeks",
      price: "₹599",
      image: DataScience,
      video: "https://videos.pexels.com/video-files/3183171/3183171-hd_1280_720_25fps.mp4",
    },
    {
      id: 9,
      title: "Generative AI with ChatGPT",
      description: "Explore prompt engineering and build real-world GenAI apps.",
      duration: "4 weeks",
      price: "₹599",
      image: generative,
      video: "https://videos.pexels.com/video-files/7656566/7656566-hd_1280_720_25fps.mp4",
    },
    {
      id: 10,
      title: "AI Ethics and Responsible AI",
      description: "Understand fairness, transparency, and accountability in AI systems.",
      duration: "3 weeks",
      price: "₹499",
      image: ai,
      video: "https://videos.pexels.com/video-files/3209826/3209826-hd_1280_720_25fps.mp4",
    },
    {
      id: 11,
      title: "AI in Business Strategy",
      description: "Learn how to integrate AI solutions into business models and decisions.",
      duration: "5 weeks",
      price: "₹599",
      image: business,
      video: "https://videos.pexels.com/video-files/7577837/7577837-hd_1280_720_25fps.mp4",
    },
    {
      id: 12,
      title: "AI for Robotics",
      description: "Combine AI and robotics to create intelligent automated systems.",
      duration: "7 weeks",
      price: "₹799",
      image: robotics,
      video: "https://videos.pexels.com/video-files/7577929/7577929-hd_1280_720_25fps.mp4",
    },
    {
      id: 13,
      title: "Predictive Analytics with Python",
      description: "Use Python and ML libraries to build predictive models.",
      duration: "5 weeks",
      price: "₹599",
      image: python,
      video: "https://videos.pexels.com/video-files/5876394/5876394-hd_1280_720_25fps.mp4",
    },
    {
      id: 14,
      title: "Speech Recognition Systems",
      description: "Develop systems that understand and process human speech.",
      duration: "6 weeks",
      price: "₹699",
      image: speech,
      video: "https://videos.pexels.com/video-files/853443/853443-hd_1280_720_25fps.mp4",
    },
    {
      id: 15,
      title: "AI for Finance",
      description: "Leverage AI for fraud detection, trading, and credit scoring.",
      duration: "6 weeks",
      price: "₹699",
      image: finance,
      video: "https://videos.pexels.com/video-files/3184287/3184287-hd_1280_720_25fps.mp4",
    },
    {
      id: 16,
      title: "Advanced Computer Vision",
      description: "Work with CNNs and object detection using YOLO and OpenCV.",
      duration: "7 weeks",
      price: "₹799",
      image: vision,
      video: "https://videos.pexels.com/video-files/854671/854671-hd_1280_720_25fps.mp4",
    },
    {
      id: 17,
      title: "AI for Cybersecurity",
      description: "Build intelligent systems for threat detection and intrusion analysis.",
      duration: "5 weeks",
      price: "₹699",
      image: cyber,
      video: "https://videos.pexels.com/video-files/3209825/3209825-hd_1280_720_25fps.mp4",
    },
    {
      id: 18,
      title: "AI-Driven Chatbot Development",
      description: "Design and train conversational bots using NLP and APIs.",
      duration: "4 weeks",
      price: "₹599",
      image: bot,
      video: "https://videos.pexels.com/video-files/6954127/6954127-hd_1280_720_25fps.mp4",
    },
    {
      id: 19,
      title: "Big Data Analytics with AI",
      description: "Handle and process large-scale datasets using Spark and ML tools.",
      duration: "8 weeks",
      price: "₹799",
      image: data,
      video: "https://videos.pexels.com/video-files/6181161/6181161-hd_1280_720_25fps.mp4",
    },
    {
      id: 20,
      title: "AI for Edge and IoT Devices",
      description: "Deploy lightweight AI models on IoT and embedded systems.",
      duration: "6 weeks",
      price: "₹699",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=400&q=80",
      video: "https://videos.pexels.com/video-files/3209826/3209826-hd_1280_720_25fps.mp4",
    },
    {
      id: 21,
      title: "AI Capstone Project",
      description: "Apply all your AI knowledge in a real-world final project guided by mentors.",
      duration: "8 weeks",
      price: "₹899",
      image: cap,
      video: "https://videos.pexels.com/video-files/854671/854671-hd_1280_720_25fps.mp4",
    },
  ];

  // === If a course is selected → Show EnrollPage ===
  if (selectedCourse) {
    return (
      <EnrollPage
        course={selectedCourse}
        onCancel={() => setSelectedCourse(null)}
      />
    );
  }

  return (
    <section className="courses">
      <h2>Explore Our Courses</h2>
      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p className="duration">⏳ {course.duration}</p>
            <div className="price-glow">{course.price}</div>
            <button className="btn-enroll" onClick={() => setSelectedCourse(course)}>
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
