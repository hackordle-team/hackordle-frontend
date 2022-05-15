import { QuestionType } from "../const/types";

const SERVER_URL = "https://wolk-arkadiusz.xyz";

type UseInitialContentProps = {
  onWordOfDayLoad: (word: string) => void;
  onDictionaryLoad: (dictionary: string[]) => void;
  onQuestionsLoad: (questions: QuestionType[]) => void;
};

const useInitialContent = ({
  onWordOfDayLoad,
  onDictionaryLoad,
  onQuestionsLoad,
}: UseInitialContentProps) => {
  return async () => {
    const data = await Promise.all([
      fetch(`${SERVER_URL}/word_otd`).then((res) => res.json()),
      fetch(`${SERVER_URL}/dictionary`).then((res) => res.json()),
      fetch(`${SERVER_URL}/quizzes`).then((res) => res.json()),
    ]);

    console.log(data)

    onWordOfDayLoad(data[0].word_otd);
    onDictionaryLoad(data[1].dictionary);
    onQuestionsLoad(data[2].quizes);
  };
};

export default useInitialContent;
