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
        <path className='vector vector-path' d='M25,75 L50,25 l25,50 Z' />
      ) : (
        <SVGPath
          showPoints={props.showPoints ? props.showPoints : undefined}
          pathFragments={props.pathFragments ? props.pathFragments : undefined}
        >
          <Command.M x={25} y={75} color='cornflowerblue' />
          <Command.L x={50} y={25} color='forestgreen' />
          <Command.L relative x={25} y={50} color='crimson' />
          <Command.Z color='orange' />
        </SVGPath>
      )}
    </svg>
  );
};

export default function Example3({ renderMode, showPoints, pathFragments, controls, setSelected }) {
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
                      <div style={{ color: 'cornflowerblue' }}>{`M25,75`}</div>
                      <div style={{ color: 'forestgreen' }}>{`L50,25`}</div>
                      <div style={{ color: 'crimson' }}>{`L25,50`}</div>
                      <div style={{ color: 'orange' }}>{`Z`}</div>
                      <div>{`'} />`}</div>
                    </>
                  ) : (
                    <>
                      <div>{`<SVGPath${props.showPoints ? ' showPoints' : ''}${
                        props.pathFragments ? ' pathFragments' : ''
                      }>`}</div>
                      <div style={{ color: 'cornflowerblue' }}>{`<Command.M x={25} y={75} />`}</div>
                      <div style={{ color: 'forestgreen' }}>{`<Command.L x={50} y={25} />`}</div>
                      <div
                        style={{ color: 'crimson' }}
                      >{`<Command.L relative x={25} y={50} />`}</div>
                      <div style={{ color: 'orange' }}>{`<Command.Z />`}</div>
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
        <div style={{ color: 'forestgreen' }}>{renderMode ? `L…` : `<Command.L … />`}</div>
        <div style={{ color: 'crimson' }}>{renderMode ? `l…` : `<Command.L relative … />`}</div>
        <div style={{ color: 'orange' }}>{renderMode ? `Z…` : `<Command.Z … />`}</div>
        <div>{renderMode ? `\`} />` : `</SVGPath>`}</div>
      </code>
    </div>
  );
}
