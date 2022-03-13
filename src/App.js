import { useEffect, useRef } from 'react';
import { useState } from 'react';
import './App.css';

const rowsNumber = 50;
const columnsNumber = 100;


function App() {
    const generateGrid = () => {
        const curentGrid = [];
        for (let i = 0; i < rowsNumber; i++) {
            const row = [];
            for (let j = 0; j < columnsNumber; j++) {
                row.push(0);
            }
            curentGrid.push(row);
        }

        return curentGrid;
    }

    const [grid, setGrid] = useState(() => generateGrid());
    const [starFunction, seetStartFunction] = useState('Start');
    const running = useRef(starFunction);
    running.current = starFunction;




    const runSumilation = () => {
        if (starFunction === 'Start') {
            seetStartFunction('Stop');
            startSumilation();
        } else if (starFunction === 'Stop') {
            startSumilation();
        }
    }

    const startSumilation = () => {
        if (running.current !== 'Stop') {
            return;
        }

        const positions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];


        let currentGrid = [];
        for (let i = 0; i < grid.length; i++) {
            currentGrid.push([...grid[i]])
        };
        for (let i = 0; i < rowsNumber; i++) {
            for (let j = 0; j < columnsNumber; j++) {
                let neighbours = 0;

                positions.forEach(([x, y]) => {
                    let a = i + x;
                    let b = j + y;

                    if (a >= 0 && a < rowsNumber && b >= 0 && b < columnsNumber && currentGrid[a][b] == 1) {
                        neighbours += 1;
                    }
                });

                if (currentGrid[i][j] === 0) {
                    if (neighbours === 3) {
                        let currentState = [...grid];
                        currentState[i][j] = 1;

                        setGrid(currentState);
                    }
                } else if (currentGrid[i][j] === 1) {
                    if (neighbours !== 2 && neighbours !== 3) {
                        let currentState = [...grid];
                        currentState[i][j] = 0;

                        setGrid(currentState);
                    }
                }
            }
        }

        setTimeout(() => { startSumilation() }, 3000);
    }

    return (
        <main className="container">
            <h1>Game of Life</h1>
            <div className="container-window">
                {
                    grid.map((row, i) => {
                        return (
                            <div key={ i } className="row">
                                {
                                    row.map((column, j) => {
                                        return (
                                            <div className="column"
                                                // key={ `${i}-${j}` }
                                                key={ j }
                                                style={ {
                                                    backgroundColor: grid[i][j] ? 'yellow' : '#7E7E7E'
                                                } }
                                                onClick={ () => {
                                                    let currentGrid = [...grid];
                                                    currentGrid[i][j] = currentGrid[i][j] ? 0 : 1;

                                                    setGrid(currentGrid);
                                                } }
                                            >
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <section className="buttons">
                <button onClick={ () => {
                    if (starFunction === 'Start') {
                        seetStartFunction('Stop');
                        running.current = 'Stop';
                        runSumilation();
                    } else if (starFunction === 'Stop') {
                        seetStartFunction('Start');
                    }
                } }> { starFunction }</button>
                <button onClick={ () => {
                    seetStartFunction('Start');
                    setGrid(generateGrid());
                } }>Clear</button>
            </section>

        </main >
    );
}

export default App;
