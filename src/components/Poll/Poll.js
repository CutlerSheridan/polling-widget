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
  const [choice, setChoice] = useState({ isAwaitingChoice: true });

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
    if (question !== '...') {
      styleLetters();
    }
  }, [question]);
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

  const createSpansForText = (text) => {
    const wordArray = text.split(' ');
    const textArray = [...text];
    return (
      <div className="text-styledContainer">
        {wordArray.map((word, index) => {
          return (
            <div className="text-styledWord" key={`word${word}${index}`}>
              {[...word].map((char, ind) => {
                return (
                  <span
                    className="text-withStroke"
                    data-text={char}
                    key={`char${char}${index}${ind}`}
                  >
                    {char}
                  </span>
                );
              })}
              {index < wordArray.length - 1 ? (
                <span className="text-wordSpace"> </span>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    );
  };
  const styleLetters = () => {
    const lettersToStyle = Array.from(
      document.querySelectorAll('.text-styledWord span')
    );
    lettersToStyle.forEach((el) =>
      el.classList.add(...randomizeLetterStyles(el.textContent))
    );
  };
  const randomizeLetterStyles = (char) => {
    let classes = [];
    if (char !== ' ') {
      // 56 total
      // 15 lowercase ?
      // 8 black
      //// 5 white background
      //// 3 white outline
      // 47 non-starter chars
      //// 13 big chars
      //// 13 / 47 = x / 56 // x = 15.489
      // 15 leaning letters
      //// 8 left-leaning
      //// 7 right-leaning
      let randomSeed = Math.floor((Math.random() * 100 * 56) / 100);
      if (char !== char.toUpperCase()) {
        if (randomSeed > 15) {
          classes.push('text-uppercase');
        }
      } else if (char !== char.toLowerCase() || /[0-9|?]/.test(char)) {
        classes.push('text-bigger');
      }
      randomSeed = Math.floor((Math.random() * 100 * 56) / 100);
      if (randomSeed > 43) {
        classes.push('text-bigger');
      }
      randomSeed = Math.floor((Math.random() * 100 * 56) / 100);
      if (randomSeed <= 8) {
        if (randomSeed <= 5) {
          classes.push('text-black-whiteBackground');
        } else {
          classes.push('text-black-whiteOutline');
        }
      }
      randomSeed = Math.floor((Math.random() * 100 * 56) / 100);
      if (randomSeed <= 30) {
        if (randomSeed <= 8) {
          classes.push('text-leanLeft');
        } else if (randomSeed <= 15) {
          classes.push('text-leanRight');
        } else if (randomSeed <= 24) {
          classes.push('text-slightLeanLeft');
        } else {
          classes.push('text-slightLeanRight');
        }
      }
    }

    return classes;
  };

  return (
    <div className="poll-outerContainer">
      <div className="poll-innerContainer">
        <h2 className="poll-heading">{createSpansForText(question)}</h2>
        <form className="poll-form" onSubmit={handleSubmit}>
          <div className="poll-answersContainer">
            {answers.map((x) => (
              <PollAnswer
                answer={x}
                choice={choice}
                totalVotes={totalVotes}
                createSpansForText={createSpansForText}
                // randomizeSentenceLetters={randomizeSentenceLetters}
                key={x.id}
              />
            ))}
          </div>
          <div className="poll-submitBar">
            <button type="submit">Submit</button>
            <p className="text-withStroke" data-text={`${totalVotes} votes`}>
              {totalVotes} votes
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Poll;
