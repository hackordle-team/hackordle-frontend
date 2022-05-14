import React from "react";
import Wrapper from "../components/Wrapper";
import Question from "../components/Question";

const Homepage: React.FC = () => {
  const onResult = (correctAnswer: boolean) => {
    console.log(`answer: ${correctAnswer}`)
  }

  const question = {
    question: "Pytanie?",
    answers: [
      {text: 'A', isCorrect: false},
      {text: 'B', isCorrect: false},
      {text: 'C', isCorrect: false},
      {text: 'D', isCorrect: true},
    ]
  }

  return (
      <Wrapper>
        Homepage - jakieś buttony i logo
        <h1>Deployed</h1>
        <Question question={question} hackName={"NAZWA HACKA"} onResult={onResult}/>
      </Wrapper>
  );
};

export default Homepage;
