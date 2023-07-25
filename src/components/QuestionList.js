import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <questionItem
            key={question.id}
            question={question}
            onDelete={() => onDeleteQuestion(question.id)}
            onUpdate={(correctIndex) => onUpdateQuestion(question.id, correctIndex)}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
