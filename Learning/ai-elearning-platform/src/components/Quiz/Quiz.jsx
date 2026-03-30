import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Quiz.css";

const quizData = {
  html: [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "HighText Machine Language", "HyperText Markdown Language", "None"], answer: "Hyper Text Markup Language" },
    { question: "Which tag creates a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: "<a>" },
    { question: "Which HTML tag is used for inserting an image?", options: ["<img>", "<image>", "<src>", "<pic>"], answer: "<img>" },
    { question: "Which tag defines the largest heading?", options: ["<heading>", "<h1>", "<h6>", "<head>"], answer: "<h1>" },
    { question: "What tag is used to insert a line break?", options: ["<lb>", "<break>", "<br>", "<line>"], answer: "<br>" },
    { question: "Which attribute is used for image path?", options: ["src", "href", "link", "path"], answer: "src" },
    { question: "Which element is used for lists with bullets?", options: ["<ol>", "<ul>", "<dl>", "<li>"], answer: "<ul>" },
    { question: "Which element is used for numbered lists?", options: ["<ol>", "<ul>", "<list>", "<num>"], answer: "<ol>" },
    { question: "HTML files are saved with which extension?", options: [".htm or .html", ".doc", ".txt", ".hmt"], answer: ".htm or .html" },
    { question: "Which tag adds a comment in HTML?", options: ["<!-- comment -->", "// comment", "# comment", "<comment>"], answer: "<!-- comment -->" },
  ],

  css: [
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style System", "Computer Style Sheets"], answer: "Cascading Style Sheets" },
    { question: "Which property changes text color?", options: ["font-color", "text-color", "color", "fgcolor"], answer: "color" },
    { question: "How do you include an external CSS file?", options: ["<link rel='stylesheet'>", "<style src=''>", "@import file", "None"], answer: "<link rel='stylesheet'>" },
    { question: "Which property changes background color?", options: ["bg-color", "background", "background-color", "color"], answer: "background-color" },
    { question: "Which CSS property controls text size?", options: ["font-style", "text-size", "font-size", "size"], answer: "font-size" },
    { question: "What is used for bold text?", options: ["font-weight", "bold-text", "font-thickness", "strong"], answer: "font-weight" },
    { question: "What does the ‘float’ property do?", options: ["Moves elements left/right", "Hides text", "Adds padding", "Centers element"], answer: "Moves elements left/right" },
    { question: "Which unit is relative to parent font size?", options: ["px", "em", "%", "pt"], answer: "em" },
    { question: "What property sets space between border & content?", options: ["margin", "padding", "spacing", "border-gap"], answer: "padding" },
    { question: "Which selector targets an element by ID?", options: [".classname", "#idname", "element", "*"], answer: "#idname" },
  ],

  javascript: [
    { question: "Which keyword declares a variable?", options: ["var", "int", "letvar", "def"], answer: "var" },
    { question: "Which symbol is used for comments?", options: ["//", "#", "<!--", "/* */"], answer: "//" },
    { question: "What is the output of typeof('hello')?", options: ["object", "text", "string", "undefined"], answer: "string" },
    { question: "Which function displays alert boxes?", options: ["prompt()", "alert()", "confirm()", "popup()"], answer: "alert()" },
    { question: "How do you write an array?", options: ["{1,2,3}", "(1,2,3)", "[1,2,3]", "<1,2,3>"], answer: "[1,2,3]" },
    { question: "Which operator checks equality & type?", options: ["==", "===", "=", "!="], answer: "===" },
    { question: "Which method converts JSON to object?", options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "objectify()"], answer: "JSON.parse()" },
    { question: "Which keyword is used to define a constant?", options: ["let", "const", "var", "fixed"], answer: "const" },
    { question: "Which event occurs when button is clicked?", options: ["onmouse", "onpress", "onclick", "onsubmit"], answer: "onclick" },
    { question: "Which loop executes at least once?", options: ["for", "while", "do-while", "loop"], answer: "do-while" },
  ],

  reactjs: [
    { question: "Who developed React?", options: ["Google", "Facebook", "Microsoft", "Twitter"], answer: "Facebook" },
    { question: "What is React?", options: ["JavaScript Library", "Framework", "Programming Language", "Database"], answer: "JavaScript Library" },
    { question: "What hook is used for state management?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: "useState" },
    { question: "What hook is used for side effects?", options: ["useEffect", "useMemo", "useState", "useRef"], answer: "useEffect" },
    { question: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JSON Extension", "JavaScript Extension"], answer: "JavaScript XML" },
    { question: "Which method renders components?", options: ["ReactDOM.render()", "renderDOM()", "display()", "createComponent()"], answer: "ReactDOM.render()" },
    { question: "Which hook is used for context?", options: ["useContext", "useEffect", "useState", "useMemo"], answer: "useContext" },
    { question: "How do you pass data to a child component?", options: ["Using props", "Using state", "Using context", "Using hooks"], answer: "Using props" },
    { question: "What is used to wrap multiple elements?", options: ["<div>", "<span>", "<Fragment>", "<section>"], answer: "<Fragment>" },
    { question: "Which command creates a new React app?", options: ["npx create-react-app", "npm create app", "react new", "npm start"], answer: "npx create-react-app" },
  ],

  java: [
    { question: "Java was developed by?", options: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup"], answer: "James Gosling" },
    { question: "Java is ___ typed language?", options: ["Loosely", "Strongly", "Not", "Dynamically"], answer: "Strongly" },
    { question: "Which keyword is used to inherit?", options: ["inherits", "extends", "implements", "include"], answer: "extends" },
    { question: "JVM stands for?", options: ["Java Virtual Machine", "Java Visual Manager", "Just Virtual Machine", "None"], answer: "Java Virtual Machine" },
    { question: "Which method starts execution?", options: ["start()", "run()", "main()", "execute()"], answer: "main()" },
    { question: "Which OOP principle hides data?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"], answer: "Encapsulation" },
    { question: "What is used to create object?", options: ["class", "new", "obj", "construct"], answer: "new" },
    { question: "Which keyword defines constant?", options: ["constant", "final", "const", "static"], answer: "final" },
    { question: "Which collection allows duplicates?", options: ["Set", "List", "Map", "TreeSet"], answer: "List" },
    { question: "Java source files end with?", options: [".class", ".java", ".jav", ".exe"], answer: ".java" },
  ],

  python: [
    { question: "Who created Python?", options: ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Ken Thompson"], answer: "Guido van Rossum" },
    { question: "Which keyword defines a function?", options: ["func", "function", "def", "lambda"], answer: "def" },
    { question: "What symbol starts a comment?", options: ["//", "#", "/*", "<!--"], answer: "#" },
    { question: "Which function prints output?", options: ["output()", "print()", "echo()", "display()"], answer: "print()" },
    { question: "Which data type is mutable?", options: ["tuple", "string", "list", "int"], answer: "list" },
    { question: "Which keyword is used for loops?", options: ["for", "loop", "iterate", "repeat"], answer: "for" },
    { question: "Python files end with?", options: [".py", ".python", ".pt", ".pyt"], answer: ".py" },
    { question: "Which function gives input from user?", options: ["input()", "scan()", "get()", "fetch()"], answer: "input()" },
    { question: "Which module handles math?", options: ["math", "numbers", "cmath", "calculate"], answer: "math" },
    { question: "Which operator is exponent?", options: ["^", "**", "pow", "%"], answer: "**" },
  ],

  sql: [
    { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query List", "None"], answer: "Structured Query Language" },
    { question: "Which statement retrieves data?", options: ["SELECT", "GET", "FETCH", "SHOW"], answer: "SELECT" },
    { question: "Which clause sorts data?", options: ["GROUP BY", "ORDER BY", "SORT", "ALIGN"], answer: "ORDER BY" },
    { question: "Which command removes records?", options: ["REMOVE", "DELETE", "DROP", "CLEAR"], answer: "DELETE" },
    { question: "Which keyword adds data?", options: ["ADD", "INSERT", "CREATE", "PUT"], answer: "INSERT" },
    { question: "Which command updates data?", options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"], answer: "UPDATE" },
    { question: "Which function counts rows?", options: ["SUM()", "COUNT()", "ROWS()", "SIZE()"], answer: "COUNT()" },
    { question: "Which SQL constraint ensures unique values?", options: ["PRIMARY KEY", "FOREIGN KEY", "CHECK", "DEFAULT"], answer: "PRIMARY KEY" },
    { question: "Which command deletes table?", options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"], answer: "DROP" },
    { question: "Which keyword groups data?", options: ["COLLECT", "GROUP BY", "SET BY", "UNION"], answer: "GROUP BY" },
  ],

  dsa: [
    { question: "Which data structure uses LIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Stack" },
    { question: "Which uses FIFO?", options: ["Queue", "Stack", "Tree", "Graph"], answer: "Queue" },
    { question: "Which algorithm uses divide & conquer?", options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"], answer: "Merge Sort" },
    { question: "Which data structure is non-linear?", options: ["Array", "Linked List", "Tree", "Stack"], answer: "Tree" },
    { question: "Binary search works on?", options: ["Sorted data", "Unsorted data", "All data", "Strings only"], answer: "Sorted data" },
    { question: "Which sorting is fastest?", options: ["Quick Sort", "Bubble Sort", "Selection Sort", "Merge Sort"], answer: "Quick Sort" },
    { question: "Queue insert operation called?", options: ["enqueue", "push", "insert", "add"], answer: "enqueue" },
    { question: "Stack remove operation called?", options: ["dequeue", "pop", "delete", "remove"], answer: "pop" },
    { question: "Which traversal uses queue?", options: ["Inorder", "Preorder", "BFS", "DFS"], answer: "BFS" },
    { question: "What is a linked list?", options: ["Collection of nodes", "Collection of arrays", "Static array", "File structure"], answer: "Collection of nodes" },
  ],

  excel: [
    { question: "What is the file extension of Excel files?", options: [".xls", ".xlsx", ".docx", ".csv"], answer: ".xlsx" },
    { question: "Which symbol is used to start a formula?", options: ["=", "+", "-", ":"], answer: "=" },
    { question: "Which function adds a range of cells?", options: ["SUM()", "ADD()", "TOTAL()", "COUNT()"], answer: "SUM()" },
    { question: "Which function finds the average?", options: ["AVG()", "AVERAGE()", "MEAN()", "MID()"], answer: "AVERAGE()" },
    { question: "Which function counts numeric values?", options: ["COUNT()", "COUNTA()", "COUNTBLANK()", "SUM()"], answer: "COUNT()" },
    { question: "Which shortcut saves the file?", options: ["Ctrl + S", "Ctrl + A", "Alt + S", "Ctrl + P"], answer: "Ctrl + S" },
    { question: "Which chart shows parts of a whole?", options: ["Bar Chart", "Pie Chart", "Line Chart", "Column Chart"], answer: "Pie Chart" },
    { question: "Which function finds the maximum value?", options: ["MAX()", "LARGE()", "HIGH()", "TOP()"], answer: "MAX()" },
    { question: "Which function returns current date?", options: ["DATE()", "NOW()", "TODAY()", "CURDATE()"], answer: "TODAY()" },
    { question: "Which key combination closes Excel?", options: ["Alt + F4", "Ctrl + F4", "Shift + F4", "Esc"], answer: "Alt + F4" },
  ],
};

const QuizPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const questions = quizData[courseId] || [];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) setScore(score + 1);
    const next = currentQ + 1;
    next < questions.length ? setCurrentQ(next) : setShowResult(true);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-fullpage-center">
      <div className="quiz-container">
        {!showResult ? (
          <>
            <div className="question-section">
              <h2 className="question-count">
                {courseId.toUpperCase()} Quiz - Question {currentQ + 1} / {questions.length}
              </h2>
              <p className="question-text">{questions[currentQ].question}</p>

              <div className="answer-section">
                {questions[currentQ].options.map((opt, i) => (
                  <button key={i} className="answer-btn" onClick={() => handleAnswer(opt)}>
                    {opt}
                  </button>
                ))}
              </div>

              <button className="btn" onClick={() => handleAnswer("")} disabled={false}>
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="score-section">
            <h2>🎉 {courseId.toUpperCase()} Quiz Completed!</h2>
            <p>
              You scored <strong>{score}</strong> / {questions.length}
            </p>
            <div className="result-buttons">
              <button className="btn" onClick={restart}>
                Retry
              </button>
              <button className="btn" onClick={() => navigate("/course-quizzes")}>
                Back to Quizzes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
