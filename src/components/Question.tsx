import React, {useEffect, useState} from "react";
import Notification from "./Notification";

type AnswerType = {
    text: string,
    isCorrect: boolean
}

type QuestionType = {
    question: string,
    answers: AnswerType[]
}

interface QuestionProps {
    question: QuestionType,
    hackName: string,
    onResult: (correctAnswer: boolean) => void;
}

enum AnswerStatus {
    WAITING_FOR_RESULT,
    WAITING_FOR_ANSWER,
    ANSWER_RESULT
}

enum AnswerButtonStatus {
    NONE,
    PULSE,
    ANSWER
}

interface AnswerButtonState {
    selected: boolean,
    state: AnswerButtonStatus
}

const defaultButtonStates = [
    {selected: false, state: AnswerButtonStatus.NONE},
    {selected: false, state: AnswerButtonStatus.NONE},
    {selected: false, state: AnswerButtonStatus.NONE},
    {selected: false, state: AnswerButtonStatus.NONE}
]

const Question: React.FC<QuestionProps> = ({question, hackName, onResult}) => {
    const [open, setOpen] = useState<boolean>(true)
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(AnswerStatus.WAITING_FOR_ANSWER)
    const [answerButtonStates, setAnswerButtonStates] = useState<AnswerButtonState[]>(defaultButtonStates)

    useEffect(() => {
        setAnswerStatus(AnswerStatus.WAITING_FOR_ANSWER)
        setOpen(true)
        setAnswerButtonStates(defaultButtonStates)
    }, [question])

    const title = `Odpowiedz na pytanie, aby zdobyć hacka "${hackName}"`
    const msg = question.question
    const handleClose = () => {
        if(answerStatus === AnswerStatus.ANSWER_RESULT){
            setOpen(false)
        }else if(answerStatus === AnswerStatus.WAITING_FOR_RESULT){
            //TODO: toast
            console.log("Poczekaj na rezultat")
        }else{
            //TODO: toast
            console.log("Odpowiedz na pytanie")
        }
    }

    const answerOnClick = (answerIdx: number) => {
        return () => {
            if(answerStatus === AnswerStatus.WAITING_FOR_ANSWER){
                setAnswerButtonStates(defaultButtonStates.map((el, idx) => {
                    if(idx === answerIdx){
                        el.selected = true;
                        el.state = AnswerButtonStatus.PULSE;
                    }
                    return el;
                }))

                setAnswerStatus(AnswerStatus.WAITING_FOR_RESULT)
                setTimeout(() => {
                    setAnswerStatus(AnswerStatus.ANSWER_RESULT)
                    console.log(answerButtonStates)
                    setAnswerButtonStates(answerButtonStates.map(el => {
                        if(el.selected){
                            return {
                                selected: true,
                                state: AnswerButtonStatus.ANSWER
                            }
                        }
                        return el
                    }))
                    onResult(question.answers[answerIdx].isCorrect)
                }, 3000)
            }
        }
    }

    const answerButtonClassNames = answerButtonStates.map((el, id) => {
        let classNames = "rounded-3xl text-white px-4 py-2 border-box mx-6 w-full"
        if(el.selected){
            if(el.state === AnswerButtonStatus.PULSE){
                classNames += " animate-pulse bg-yellow-300 hover:bg-yellow-200"
            }else if(el.state === AnswerButtonStatus.ANSWER){
                classNames += question.answers[id].isCorrect ? " bg-lime-800 hover:bg-lime-700" : " bg-red-600 hover:bg-red-500"
            }
        }else{
            classNames += " bg-neutral-400 hover:bg-neutral-300 opacity-75";
        }

        return classNames
    })

    const answerButton = (idx: number) => { return (
        <div>
            <button
                style={{margin: '1vh'}}
                className={answerButtonClassNames[idx]}
                onClick={answerOnClick(idx)}
            >
                {question.answers[idx].text}
            </button>
        </div>
    )}

    return (
        <Notification title={title} msg={msg} open={open} handleClose={handleClose}>
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
