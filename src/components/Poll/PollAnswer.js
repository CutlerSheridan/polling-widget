import './PollAnswer.css';

const PollAnswer = (props) => {
  const { answer, choice } = props;

  return (
    <div
      className={`poll-answerGroup ${
        choice.id === answer.id ? 'poll-chosenAnswer' : ''
      }`}
    >
      <input
        type="radio"
        className="poll-answerRadio"
        name="poll-answer"
        id={answer.id}
        value={answer.id}
        required="required"
      />
      <label className="poll-answerLabel" htmlFor={answer.id}>
        {answer.name ? answer.name : 'test'} = {answer.votes}
      </label>
    </div>
  );
};

export default PollAnswer;
