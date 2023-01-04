import React, { createContext, useContext, useEffect, useState } from "react";
const QuizContext = createContext();

function Context({ children }) {
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);

  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswers, setwrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [wrongAnsSelect, setWrongAnsSelect] = useState(false);

  const fetchData = async () => {
    const url = "https://opentdb.com/api.php?amount=20";
    const data = await fetch(url);
    const res = await data.json();
    setQuestionList(res.results);
    setNumberOfQuestion(res.results.length);
    const randomOption = () => {
      const seriesOption = [
        res.results[0]?.correct_answer,
        ...res.results[0]?.incorrect_answers,
      ];
      // return seriesOption;
      setOptions(
        seriesOption
          .map((answer) => ({ sort: Math.random(), value: answer }))
          .sort((a, b) => a.sort - b.sort)
      );
    };
    randomOption();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questionList,
        setQuestionList,
        selectedQuestion,
        setSelectedQuestion,
        options,
        setOptions,
        numberOfQuestion,
        correctAnswer,
        setCorrectAnswer,
        wrongAnswers,
        setwrongAnswers,
        selectedOption,
        setSelectedOption,
        wrongAnsSelect,
        setWrongAnsSelect,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
export const StateValue = () => {
  return useContext(QuizContext);
};

export default Context;
