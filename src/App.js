import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {(() => {
            const now = new Date();
            const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
            return time;
          })()}
        </p>
      </header>
    </div>
  );
}

export default App;
