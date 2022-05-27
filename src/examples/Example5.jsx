import { SVGPath, Command } from '@dead-simple/svg-path-jsx';

const renderedCanvas = props => {
  if (props === undefined) return <></>;
  return (
    <svg
      className='vector-container vector-path-container canvas'
      width={250}
      height={250}
      viewBox='0 0 100 100'
    >
      {props.renderMode ? (
        <path className='vector vector-path' d='M25,25 C 25,75 50,75 50,50 S 75,25 75,75' />
      ) : (
        <SVGPath
          showPoints={props.showPoints ? props.showPoints : undefined}
          pathFragments={props.pathFragments ? props.pathFragments : undefined}
        >
          <Command.M x={25} y={25} color='cornflowerblue' />
          <Command.C c1={[25, 75]} c2={[50, 75]} e={[50, 50]} color='forestgreen' />
          <Command.S c2={[75, 25]} e={[75, 75]} color='crimson' />
        </SVGPath>
      )}
    </svg>
  );
};

export default function Example5({ renderMode, showPoints, pathFragments, controls, setSelected }) {
  return (
    <div
      className='demo-card'
      onClick={() => {
        setSelected({
          render: props => (
            <>
              {renderedCanvas(props)}
              <div>
                {props.controls.render(props)}
                <code>
                  {props.renderMode ? (
                    <>
                      <div>{`<path d={'`}</div>
                      <div style={{ color: 'cornflowerblue' }}>{`M25,25`}</div>
                      <div style={{ color: 'forestgreen' }}>{`C 25,75 50,75 50,50`}</div>
                      <div style={{ color: 'crimson' }}>{`S 75,25 75,75`}</div>
                      <div>{`'} />`}</div>
                    </>
                  ) : (
                    <>
                      <div>{`<SVGPath${props.showPoints ? ' showPoints' : ''}${
                        props.pathFragments ? ' pathFragments' : ''
                      }>`}</div>
                      <div style={{ color: 'cornflowerblue' }}>{`<Command.M x={25} y={25} />`}</div>
                      <div
                        style={{ color: 'forestgreen' }}
                      >{`<Command.C c1={[25, 75]} c2={[50, 75]} e={[50, 50]} />`}</div>
                      <div
                        style={{ color: 'crimson' }}
                      >{`<Command.S c2={[75, 25]} e={[75, 75]} />`}</div>
                      <div>{`</SVGPath>`}</div>
                    </>
                  )}
                </code>
              </div>
            </>
          ),
        });
      }}
    >
      {renderedCanvas({ renderMode, showPoints, pathFragments, controls })}
      <code className='demo-card-summary'>
        <div>{renderMode ? `<path d={\`` : `<SVGPath>`}</div>
        <div style={{ color: 'cornflowerblue' }}>{renderMode ? `M…` : `<Command.M … />`}</div>
        <div style={{ color: 'forestgreen' }}>{renderMode ? `C…` : `<Command.C … />`}</div>
        <div style={{ color: 'crimson' }}>{renderMode ? `S…` : ` <Command.S … />`}</div>
        <div>{renderMode ? `\`} />` : `</SVGPath>`}</div>
      </code>
    </div>
  );
}
