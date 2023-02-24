import './Poll.css';
import { fetchQuestion, fetchAnswers, vote } from '../../firebaseController';
import { useEffect, useState } from 'react';
import PollAnswer from './PollAnswer';

const Poll = (props) => {
  const { pollId } = props;
  const [question, setQuestion] = useState('...');
  const [answers, setAnswers] = useState([]);
  const [choice, setChoice] = useState({});

  useEffect(() => {
    fetchQuestion(pollId).then((result) => {
      setQuestion(result);
    });
    fetchAnswers(pollId).then(setAnswers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    for (const entry of data) {
      const answerObj = answers.find((x) => x.id === entry[1]);
      vote(pollId, answerObj);
      setChoice(answerObj);
    }
  };

  return (
    <div className="poll-outerContainer">
      <div className="poll-innerContainer">
        <h2 className="poll-heading">{question}</h2>
        <form onSubmit={handleSubmit}>
          {answers.map((x) => (
            <PollAnswer answer={x} key={x.id} choice={choice} />
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Poll;
