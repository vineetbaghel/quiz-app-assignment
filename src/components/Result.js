import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StateValue } from "../Context/Context";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [precentage, setPercentage] = useState(0);
  const {
    setSelectedQuestion,
    numberOfQuestion,
    setCorrectAnswer,
    setwrongAnswers,
    setSelectedOption,
    setWrongAnsSelect,
    selectedOption,
    wrongAnsSelect,
  } = StateValue();

  const playAgain = () => {
    setSelectedQuestion(0);
    setCorrectAnswer(0);
    setwrongAnswers(0);
    setWrongAnsSelect(false);
    setSelectedOption(false);
    navigate("/questions");
  };
  const toHome = () => {
    setSelectedQuestion(0);
    setCorrectAnswer(0);
    setwrongAnswers(0);
    setWrongAnsSelect(false);
    setSelectedOption(false);
    // setOptions([]);
    // setQuestionList([]);
    navigate("/");
  };
  useEffect(() => {
    if (location?.state?.wrgAns === 0 && location?.state?.rightAns === 0) {
      navigate("/");
    } else {
      setPercentage((location.state?.rightAns / numberOfQuestion) * 100);
    }
  }, []);
  return (
    <div className="app-home result-page">
      <div className="result-section">
        <h2 className="result-title">You need more practice</h2>
        <h1 className="result-score pass">Your Score: {`${precentage}%`}</h1>
        <div className="test-details">
          <div className="score-card">
            <p>Total number of questions:</p>
            <p>{numberOfQuestion}</p>
          </div>
          <div className="score-card">
            <p>Number of attempted questions:</p>
            <p>{location?.state?.rightAns + location?.state?.wrgAns}</p>
          </div>{" "}
          <div className="score-card">
            <p> Number of Correct questions:</p>
            <p>{location?.state?.rightAns}</p>
          </div>{" "}
          <div className="score-card">
            <p>Number of Wrong questions:</p>
            <p>{location?.state?.wrgAns}</p>
          </div>
        </div>
      </div>
      <div className="result-btn">
        <button className="btn play-again" onClick={playAgain}>
          Play Again
        </button>

        <Link to="/">
          <button className="btn back-to-home" onClick={toHome}>
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
