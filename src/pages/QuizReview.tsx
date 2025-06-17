import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const QUIZ_DATA = {
  questions: [
    {
      id: 1,
      text: "Which attribute is necessary to make an input field mandatory in an HTML form?",
      optionA: "checked",
      optionB: "placeholder",
      optionC: "required",
      optionD: "disabled",
      correctAnswer: "required",
    },
    {
      id: 2,
      text: "What does the viewport meta tag do in HTML?",
      optionA: "Sets the default language for the page",
      optionB: "Controls the width and scaling of the page on different devices",
      optionC: "Adds accessibility features",
      optionD: "Defines a region for search engines",
      correctAnswer: "Controls the width and scaling of the page on different devices",
    },
    {
      id: 3,
      text: "Which attribute is necessary to make an input field mandatory in an HTML form?",
      optionA: "checked",
      optionB: "placeholder",
      optionC: "required",
      optionD: "disabled",
      correctAnswer: "required",
    },
  ],
};

const QuizReview = () => {
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();

  useEffect(() => {
    const simulatedAnswers = ["required", "placeholder", "required"];
    setAnswers(simulatedAnswers);

    const calculatedScore = QUIZ_DATA.questions.reduce((acc, q, idx) => {
      return acc + (simulatedAnswers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);
    setScore(calculatedScore);
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-purple-700 text-center">
        You scored {score} out of {QUIZ_DATA.questions.length}
      </h3>

      {QUIZ_DATA.questions.map((q, idx) => {
        const userAnswer = answers[idx];
        const isCorrect = userAnswer === q.correctAnswer;
        return (
          <div key={q.id} className="border rounded-lg p-5 bg-white shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Q{idx + 1}: {q.text}</h4>
            <p>
              <strong>Your Answer:</strong>{" "}
              <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                {userAnswer ?? "Not Answered"}
              </span>
            </p>
            {!isCorrect && (
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span className="text-green-700">{q.correctAnswer}</span>
              </p>
            )}
            <p className="text-sm text-gray-500">
              {isCorrect ? "✅ Correct" : "❌ Incorrect"}
            </p>
          </div>
        );
      })}

      <div className="text-center mt-10">
        <Button
  onClick={() => {
    navigate(`/module/${courseId}/${moduleId}/`);
    setTimeout(() => window.location.reload(), 100); // slight delay to ensure navigation finishes
  }}
  className="bg-purple-600 text-white"
>
  Back to Course
</Button>

      </div>
    </div>
  );
};

export default QuizReview;
