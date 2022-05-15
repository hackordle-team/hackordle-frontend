import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import {makeToast} from "./Toast";

export type AnswerType = {
  content: string;
  correct: boolean;
};

type QuestionType = {
  question: string;
  answers: AnswerType[];
};

interface QuestionProps {
  question?: QuestionType;
  hackName: string;
  onResult: (correctAnswer: boolean) => void;
}

enum AnswerStatus {
  WAITING_FOR_RESULT,
  WAITING_FOR_ANSWER,
  ANSWER_RESULT,
}

enum AnswerButtonStatus {
  NONE,
  PULSE,
  ANSWER,
}

interface AnswerButtonState {
  selected: boolean;
  state: AnswerButtonStatus;
}

const Question: React.FC<QuestionProps> = ({
  question,
  hackName,
  onResult,
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(
    AnswerStatus.WAITING_FOR_ANSWER
  );
  const [answerButtonStates, setAnswerButtonStates] =
    useState<AnswerButtonState[]>([
      { selected: false, state: AnswerButtonStatus.NONE },
      { selected: false, state: AnswerButtonStatus.NONE },
      { selected: false, state: AnswerButtonStatus.NONE },
      { selected: false, state: AnswerButtonStatus.NONE },
    ]);

  useEffect(() => {
    setAnswerStatus(AnswerStatus.WAITING_FOR_ANSWER);
    setOpen(true);
    setAnswerButtonStates([
      { selected: false, state: AnswerButtonStatus.NONE },
      { selected: false, state: AnswerButtonStatus.NONE },
      { selected: false, state: AnswerButtonStatus.NONE },
      { selected: false, state: AnswerButtonStatus.NONE },
    ]);
  }, [question]);

  const title = `Odpowiedz na pytanie, aby zdobyć hacka "${hackName}"`;
  const msg = question?.question;
  const handleClose = () => {
    if (answerStatus === AnswerStatus.ANSWER_RESULT) {
      setOpen(false);
    } else if (answerStatus === AnswerStatus.WAITING_FOR_RESULT) {
      makeToast("Poczekaj na rezultat");
    } else {
      makeToast("Odpowiedz na pytanie");
    }
  };

  const answerOnClick = (answerIdx: number) => {
    return () => {
      if (answerStatus === AnswerStatus.WAITING_FOR_ANSWER) {
        setAnswerButtonStates(
          answerButtonStates.map((el, idx) => {
            if (idx === answerIdx) {
              el.selected = true;
              el.state = AnswerButtonStatus.PULSE;
            }
            return el;
          })
        );

        setAnswerStatus(AnswerStatus.WAITING_FOR_RESULT);
        setTimeout(() => {
          setAnswerStatus(AnswerStatus.ANSWER_RESULT);
          //console.log(answerButtonStates);
          setAnswerButtonStates(
            answerButtonStates.map((el) => {
              if (el.selected) {
                return {
                  selected: true,
                  state: AnswerButtonStatus.ANSWER,
                };
              }
              return el;
            })
          );
          setTimeout(
            () => onResult(question?.answers[answerIdx].correct ?? false),
            1000
          );
        }, 1500);
      }
    };
  };

  const answerButtonClassNames = answerButtonStates.map((el, id) => {
    let classNames = "rounded-3xl text-white px-4 py-2 border-box mx-6 w-full";
    if (el.selected) {
      if (el.state === AnswerButtonStatus.PULSE) {
        classNames += " animate-pulse bg-yellow-300 hover:bg-yellow-200";
      } else if (el.state === AnswerButtonStatus.ANSWER) {
        classNames += question?.answers[id].correct
          ? " bg-lime-800 hover:bg-lime-700"
          : " bg-red-600 hover:bg-red-500";
      }
    } else {
      classNames += " bg-neutral-400 hover:bg-neutral-300 opacity-75";
    }

    return classNames;
  });

  const answerButton = (idx: number) => {
    return (
      <div>
        <button
          style={{ margin: "1vh" }}
          className={answerButtonClassNames[idx]}
          onClick={answerOnClick(idx)}
        >
          {question?.answers[idx].content}
        </button>
      </div>
    );
  };

  return (
    <Notification
      title={title}
      msg={msg ?? ""}
      open={open}
      handleClose={handleClose}
    >
      <div>
        {answerButton(0)}
        {answerButton(1)}
        {answerButton(2)}
        {answerButton(3)}
      </div>
    </Notification>
  );
};

export default Question;
