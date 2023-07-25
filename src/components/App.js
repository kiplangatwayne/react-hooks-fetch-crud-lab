import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState("List");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  // Function to handle form submission for adding a new question
  function handleAddQuestion(formData) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => setQuestions([...questions, data]));
  }

  // Function to handle question deletion
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => setQuestions(questions.filter((question) => question.id !== id)))
      .catch((error) => console.log(error));
  }

  // Function to handle question update
  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? { ...question, correctIndex } : question
          )
        );
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <AdminNavBar onChangePage={setCurrentPage} />
      {currentPage === "List" && (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
      {currentPage === "Form" && <QuestionForm onAddQuestion={handleAddQuestion} />}
    </div>
  );
}

export default App;
