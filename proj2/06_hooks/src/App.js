
import Counter from './01_体验hooks/01_counter-class';
import Counter1 from './01_体验hooks/02_counter-hook';
import MultiHookState from './02_useState使用/01_多个状态';
import ComplexHookState from './02_useState使用/02_复杂状态的修改';
function App() {
  return (
    <div className="App">
     {/* <Counter /> */}
     <hr />
     {/* <Counter1 /> */}
     <hr />
     <MultiHookState />
     <hr />
     <ComplexHookState />
    </div>
  );
}

export default App;
