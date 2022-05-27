import { useState, useCallback } from 'react';

import './App.css';

import Example1 from './examples/Example1.jsx';
import Example2 from './examples/Example2.jsx';
import Example3 from './examples/Example3.jsx';
import Example4 from './examples/Example4.jsx';
import Example5 from './examples/Example5.jsx';
import Example6 from './examples/Example6.jsx';

const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState(state => !state), []);

  return [state, toggle];
};

function App() {
  const [renderMode, toggleRenderMode] = useToggle(true),
    [showPoints, toggleShowPoints] = useToggle(true),
    [pathFragments, togglePathFragments] = useToggle(true),
    [selected, setSelected] = useState(undefined);

  const controls = {
    render: props => (
      <div className='demo-cards-controls' rendermode={props.renderMode ? 'rendermode' : undefined}>
        <label>
          <input
            type='checkbox'
            checked={props.renderMode}
            onChange={toggleRenderMode}
            className='demo-control-button render-mode-button'
          />
          Render as HTML path
        </label>
        <label>
          <input
            type='checkbox'
            checked={props.showPoints}
            onChange={toggleShowPoints}
            className='demo-control-button show-points-button'
          />
          showPoints
        </label>
        <label>
          <input
            type='checkbox'
            checked={props.pathFragments}
            onChange={togglePathFragments}
            className='demo-control-button show-fragments-button'
          />
          pathFragments
        </label>
      </div>
    ),
  };

  const exampleProps = {
    renderMode,
    showPoints,
    pathFragments,
    controls,
    setSelected,
  };

  return (
    <div
      className='App'
      onClick={e => {
        if (e.target.className === 'App') setSelected(undefined);
      }}
    >
      <dialog className='demo-dialog' open={selected !== undefined ? 'open' : undefined}>
        {selected && selected.render(exampleProps)}
      </dialog>
      <div className='main-content'>
        <header>
          <h1>svg-path-jsx</h1>
          <h3>by 💀 Dead Simple JSX</h3>
        </header>
        {controls.render(exampleProps)}
        <div className='demo-cards-container full-width'>
          <Example1 {...exampleProps} />
          <Example2 {...exampleProps} />
          <Example3 {...exampleProps} />
          <Example4 {...exampleProps} />
          <Example5 {...exampleProps} />
          <Example6 {...exampleProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
