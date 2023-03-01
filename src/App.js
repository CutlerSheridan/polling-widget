import './App.css';
import Poll from './components/Poll/Poll';

const App = () => {
  return (
    <div className="App">
      <Poll pollId="poll1"></Poll>
      <footer>
        <p>Made by Cutler Sheridan.</p>
        <p>
          See more <a href="https://www.github.com/cutlersheridan">here</a>.
        </p>
      </footer>
    </div>
  );
};

export default App;
