import './App.css';
import Poll from './components/Poll/Poll';

const App = () => {
  return (
    <div className="App">
      <Poll pollId="poll1"></Poll>
      <footer>
        <p>Made by Cutler Sheridan.</p>
        <p>
          See more <a href="https://cutlersheridan.github.io/portfolio">here</a>
          .
        </p>
      </footer>
    </div>
  );
};

export default App;
