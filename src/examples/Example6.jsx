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
        <path className='vector vector-path' d='M25,25 Q 25,75 50,50 T 75,75' />
      ) : (
        <SVGPath
          showPoints={props.showPoints ? props.showPoints : undefined}
          pathFragments={props.pathFragments ? props.pathFragments : undefined}
        >
          <Command.M x={25} y={25} color='cornflowerblue' />
          <Command.Q c={[25, 75]} e={[50, 50]} color='forestgreen' />
          <Command.T e={[75, 75]} color='crimson' />
        </SVGPath>
      )}
    </svg>
  );
};

export default function Example6({ renderMode, showPoints, pathFragments, controls, setSelected }) {
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
                      <div style={{ color: 'forestgreen' }}>{`Q 25,75 50,50`}</div>
                      <div style={{ color: 'crimson' }}>{`T 75,75`}</div>
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
                      >{`<Command.Q c={[25, 75]} e={[50, 50]} />`}</div>
                      <div style={{ color: 'crimson' }}>{`<Command.T e={[75, 75]} />`}</div>
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
        <div style={{ color: 'forestgreen' }}>{renderMode ? `Q…` : `<Command.Q … />`}</div>
        <div style={{ color: 'crimson' }}>{renderMode ? `T…` : ` <Command.T … />`}</div>
        <div>{renderMode ? `\`} />` : `</SVGPath>`}</div>
      </code>
    </div>
  );
}
