import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StateValue } from "../Context/Context";
import Result from "./Result";

function Questions() {
  const [showresult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const {
    questionList,
    selectedQuestion,
    setSelectedQuestion,
    options,
    setOptions,
    correctAnswer,
    setCorrectAnswer,
    wrongAnswers,
    setwrongAnswers,
    selectedOption,
    setSelectedOption,
    wrongAnsSelect,
    setWrongAnsSelect,
  } = StateValue();
  const randomOption = () => {
    const seriesOption = [
      questionList[selectedQuestion + 1]?.correct_answer,
      ...questionList[selectedQuestion + 1]?.incorrect_answers,
    ];
    // return seriesOption;
    setOptions(
      seriesOption
        .map((answer) => ({ sort: Math.random(), value: answer }))
        .sort((a, b) => a.sort - b.sort)
    );
  };

  const gotoNext = () => {
    setWrongAnsSelect(false);
    setSelectedOption(false);
    setSelectedQuestion((prev) => {
      if (prev === questionList?.length - 1) {
        setShowResult(true);
        navigate("/result", {
          state: { rightAns: correctAnswer, wrgAns: wrongAnswers },
        });
      } else {
        return (prev + 1) % questionList?.length;
      }
    });
    randomOption();
  };
  const gotoPrevious = () => {
    setWrongAnsSelect(false);
    setSelectedOption(false);
    setSelectedQuestion((prev) => {
      if (prev === 0) {
        return 0;
      } else {
        return prev - 1;
      }
    });
  };

  const checkAnswer = (item) => {
    if (item === questionList[selectedQuestion]?.correct_answer) {
      if (!selectedOption) {
        setSelectedOption(true);
        setCorrectAnswer((prev) => prev + 1);
      } else {
        setCorrectAnswer(correctAnswer);
      }
    } else {
      if (wrongAnsSelect) {
        setwrongAnswers(wrongAnswers);
      } else {
        setWrongAnsSelect(true);
        setwrongAnswers((prev) => prev + 1);
      }
    }
  };
  const exitQuiz = () => {
    var submit = "Do you want to submit the quiz?";
    if (window.confirm(submit) === true) {
      navigate("/result", {
        state: {
          rightAns: correctAnswer,
          wrgAns: wrongAnswers,
        },
      });
    } else {
      alert("Continue");
    }
  };

  return (
    <>
      {showresult ? (
        <Result />
      ) : (
        <div className="app-home">
          <div className="quiz-section">
            <h1 className="title">Question</h1>
            Q.{selectedQuestion + 1} of {questionList.length}{" "}
            <p className="question">
              {questionList[selectedQuestion]?.question}
            </p>
            <div className="options">
              {options.map((item, key) => {
                return (
                  <button
                    className="option-btn"
                    onClick={() => checkAnswer(item.value)}
                    key={key}
                    id={key}
                  >
                    {item.value}
                  </button>
                );
              })}
            </div>
            <div className="navigate-btn">
              <button className="navigate-prev btn" onClick={gotoPrevious}>
                Previous
              </button>
              <button className="navigate-next btn" onClick={gotoNext}>
                Next
              </button>
              <button className="navigate-quit btn" onClick={exitQuiz}>
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Questions;
