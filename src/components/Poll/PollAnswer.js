import './PollAnswer.css';

const PollAnswer = (props) => {
  const { answer, choice, totalVotes, createSpansForText } = props;
  const percentOfVotes = (answer.votes * 100) / totalVotes;
  let hasBeenSubmitted = choice.isAwaitingChoice ? false : true;

  const addPercentElements = () => {
    if (hasBeenSubmitted) {
      return (
        <div className="poll-answerPercentContainer">
          <div className="poll-answerPercent"></div>
        </div>
      );
    }
  };

  return (
    <div
      className={`poll-answerGroup 
      ${choice.id === answer.id ? 'poll-chosenAnswer' : ''}
      ${hasBeenSubmitted ? 'submitted' : ''}`}
    >
      <div className={`poll-answerLeftSide`}>
        <div className="poll-radioLabelContainer">
          <input
            type="radio"
            className={`poll-answerRadio ${
              hasBeenSubmitted ? 'submitted' : ''
            }`}
            name="poll-answer"
            id={answer.id}
            value={answer.id}
            required="required"
          />
          <label
            className={`poll-answerLabel ${
              hasBeenSubmitted ? 'submitted' : ''
            }`}
            htmlFor={answer.id}
          >
            {createSpansForText(answer.name)}
          </label>
        </div>
        <div
          className={`poll-answerPercentBar ${
            hasBeenSubmitted ? 'submitted' : ''
          }`}
          style={{ width: (hasBeenSubmitted ? percentOfVotes : 0) + '%' }}
        ></div>
      </div>
      <div
        className={`poll-answerRightSide ${
          hasBeenSubmitted ? 'submitted' : ''
        }`}
      >
        <div className={`poll-answerPercentNum`}>
          {Math.round(percentOfVotes)}%
        </div>
        <div className={`poll-answerTotalVotes`}>({answer.votes} votes)</div>
      </div>
    </div>
  );
};

export default PollAnswer;
