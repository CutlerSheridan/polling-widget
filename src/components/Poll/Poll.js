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
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

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
    const radioElements = Array.from(
      document.querySelectorAll('.poll-answerRadio')
    );
    const submitElement = document.querySelector(
      '.poll-submitBar > button[type="submit"]'
    );
    radioElements.forEach((el) =>
      el.addEventListener('click', () =>
        submitElement.classList.remove('poll-noChoiceYet')
      )
    );
  }, [answers]);
  useEffect(() => {
    if (!choice.isAwaitingChoice) {
      setHasBeenSubmitted(true);
    }
  }, [choice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    for (const entry of data) {
      const answerObj = answers.find((x) => x.id === entry[1]);
      vote(pollId, answerObj);
      setChoice(answerObj);
    }
  };
  // this creates individual spans for every ransom-style char
  // must be used for all ransom-style text
  const createSpansForText = (text) => {
    const wordArray = text.split(' ');
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

  const createSeeResultsButton = () => {
    return (
      <div className="poll-seeResultsContainer">
        <button
          className="poll-button poll-seeResults"
          onClick={setHasBeenSubmitted}
          value={true}
        >
          See Results <span>{'>'}</span>
        </button>
      </div>
    );
  };
  const createTotalVotesElement = () => {
    return (
      <p
        className="text-withStroke poll-totalVotes"
        data-text={`${totalVotes} votes`}
      >
        {totalVotes} votes
      </p>
    );
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
                hasBeenSubmitted={hasBeenSubmitted}
                key={x.id}
              />
            ))}
          </div>
          <div className="poll-submitBar">
            <button
              type="submit"
              className={`poll-button poll-noChoiceYet poll-submitButton ${
                hasBeenSubmitted ? 'submitted' : ''
              }`}
              data-text={`${hasBeenSubmitted ? 'Submitted' : 'Submit'}`}
            >
              {hasBeenSubmitted ? 'Submitted' : 'Submit'}
            </button>
            {hasBeenSubmitted
              ? createTotalVotesElement()
              : createSeeResultsButton()}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Poll;
