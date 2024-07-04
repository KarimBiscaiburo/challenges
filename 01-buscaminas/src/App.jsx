import { useState } from "react";

const GRID_SIZE = 5;
const CELLS_TO_MATCH = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

const MATRIZ = Array.from({length: GRID_SIZE}, () => Array.from({length: GRID_SIZE}, () => 0));

for (let count = GRID_SIZE; count > 0; count--) {
  const rowRandom = Math.floor(Math.random() * GRID_SIZE);
  const cellRandom = Math.floor(Math.random() * GRID_SIZE);

  if ( MATRIZ[rowRandom][cellRandom] === "B" ) {
    count++
  } else {
    MATRIZ[rowRandom][cellRandom] = "B";
  }
}

for (let rowIndex = 0; rowIndex < MATRIZ.length; rowIndex++) {
  for (let cellIndex = 0; cellIndex < MATRIZ[rowIndex].length; cellIndex++) {
    if(MATRIZ[rowIndex][cellIndex] === "B") continue;

    let bombCount = 0;

    for(const match of CELLS_TO_MATCH) {
      if (MATRIZ[rowIndex + match[0]]?.[cellIndex + match[1]] === "B") {
        bombCount++
      }
    }

    MATRIZ[rowIndex][cellIndex] = bombCount;
  }
}

function App() {
  const [clicked, setClicked] = useState([]);
  const [status, setStatus] = useState("playing");

  function checkAroundCells (rowIndex, cellIndex) {
    if(MATRIZ[rowIndex]?.[cellIndex] === 0) {
      for ( const match of CELLS_TO_MATCH ) {
        if(MATRIZ[rowIndex + match[0]]?.[cellIndex + match[1]] !== "B" && MATRIZ[rowIndex + match[0]]?.[cellIndex + match[1]] !== undefined) {
          console.log
          const cellMatched = `${rowIndex +match[0]}-${cellIndex + match[1]}`
          if(MATRIZ.includes(cellMatched)) continue;
          setClicked(clicked => clicked.concat(cellMatched));
        }
      }
    }
  }

  function handleClick(id, cell, rowIndex, cellIndex) {
    if (status === "Lose") return;

    setClicked(clicked => clicked.concat(id))
    
    if(cell === "B") {
      setStatus("Lose");
      return;
    }
    
    checkAroundCells(rowIndex, cellIndex);
    
    if (clicked.length + 1 === GRID_SIZE ** 2 - GRID_SIZE) {
      setStatus("Win");
      return;
    }
    console.log(clicked)
    console.log(clicked.length + 1, GRID_SIZE ** 2 - GRID_SIZE);
  } 

  function resetGame() {
    window.location.reload();
  }

  return (
    <main>
      <h1>Buscaminas Halloween</h1>
      <section className="board">

        {MATRIZ.map((row, rowIndex) => (
          <article className="grid-row" key={String(rowIndex)}>
            {row.map((cell, cellIndex) => (
              <div 
                className="grid-cell" 
                key={`${rowIndex}-${cellIndex}`}
              >  
                {
                clicked.includes(`${rowIndex}-${cellIndex}`) 
                ? <span>{cell === "B" ? "🎃" : cell === 0 ? null : cell}</span> 
                : <button onClick={ () => handleClick(`${rowIndex}-${cellIndex}`, cell, rowIndex, cellIndex)}/>
                }
              </div>
            ))}
          </article>
        ))}
      </section>
      <section>
        <article className="details">
            { 
              status === "Lose" ? <p>You Lost</p> :
              status === "Win" ? <p>You Won</p> :
              null
            }
            {clicked}
            <button className="button-reset" onClick={resetGame}>Reset</button>
          </article>
      </section>
    </main>
  )
}

export default App
