import CanvasEditor from "./components/CanvasEditor";
import EditingScreen from "./components/EditingScreen";

function App() {
  return (
    <div className="wrapper">
      {/* left half */}
      <div className="left-half">
        <CanvasEditor />
      </div>

      {/* right half */}
      <div className="right-half">
        <EditingScreen />
      </div>
    </div>
  );
}

export default App;
