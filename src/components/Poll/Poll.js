import './Poll.css';
import {
  fetchQuestion,
  fetchAnswers,
  vote,
  db,
} from '../../firebaseController';
import { query, onSnapshot, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PollAnswer from './PollAnswer';

const Poll = (props) => {
  const { pollId } = props;
  const [question, setQuestion] = useState('...');
  const [answers, setAnswers] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [choice, setChoice] = useState({});

  useEffect(() => {
    fetchQuestion(pollId).then((result) => {
      setQuestion(result);
    });
    fetchAnswers(pollId).then(setAnswers);

    const querySnapshot = query(collection(db, 'polls', pollId, 'answers'));
    const unsub = onSnapshot(querySnapshot, (docs) => {
      const updatedAnswers = [];
      docs.forEach((doc) => {
        updatedAnswers.push({
          id: doc.id,
          votes: doc.data().votes,
          name: doc.data().name,
        });
      });
      setAnswers(updatedAnswers);
    });
  }, []);
  useEffect(() => {
    let total = 0;
    answers.forEach((answer) => {
      total += answer.votes;
    });
    setTotalVotes(total);
  }, [answers]);

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
          <p>total votes: {totalVotes}</p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Poll;