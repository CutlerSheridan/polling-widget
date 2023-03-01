import './PollAnswer.css';

const PollAnswer = (props) => {
  const { answer, choice, totalVotes, createSpansForText, hasBeenSubmitted } =
    props;
  const percentOfVotes = (answer.votes * 100) / totalVotes;

  return (
    <div
      className={`poll-answerGroup 
      ${choice.id === answer.id ? 'poll-chosenAnswer' : ''}
      ${hasBeenSubmitted ? 'submitted' : ''}`}
    >
      <div className={`poll-answerLineOne`}>
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
          className={`poll-answerPercentNum text-withStroke ${
            hasBeenSubmitted ? 'submitted' : ''
          }`}
          data-text={`${Math.round(percentOfVotes)}%`}
        >
          {Math.round(percentOfVotes)}%
        </div>
      </div>
      <div
        className={`poll-answerLineTwo ${hasBeenSubmitted ? 'submitted' : ''}`}
      >
        <div
          className={`poll-answerPercentBar`}
          style={{ width: (hasBeenSubmitted ? percentOfVotes : 0) + '%' }}
        ></div>
        <div
          className={`poll-answerTotalVotes text-withStroke`}
          data-text={`${answer.votes} votes`}
        >
          {answer.votes} votes
        </div>
      </div>
    </div>
  );
};

export default PollAnswer;
