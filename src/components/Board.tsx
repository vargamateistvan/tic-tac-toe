import React from 'react';
import { Square } from '../types/square';
import Field from './Field';

const Board: React.FC = () => {
    const boardSize = 10;
    const adjacentCount = 5;
    const [board, setBoard] = React.useState<Square[][] | []>([]);
    const [player, setPlayer] = React.useState<'Player1' | 'Player2'>('Player1');
    const [win, setWin] = React.useState<boolean>(false);

    const createBoard = () => {
        const rows = [];
        for (let i = 0; i < boardSize; ++i) {
            const row: Square[] = [];
            for (let j = 0; j < boardSize; ++j) {
                row.push({
                    value: '',
                    position: {
                        x: i,
                        y: j
                    }
                });
            }
            rows.push(row);
        }
        setBoard(rows);
    }

    const updateField = (field: Square) => {
        const newState = board?.map((row: Square[]) => {
            return row.map((col: Square) => {
                if (field.position === col.position) {
                    return field;
                }

                if (field.position !== col.position) {
                    return col;
                }
            });
        });

        checkWin(field);
    }

    const checkWin = (field: Square) => {
        if (board.length === 0) {
            return;
        }

        let win = false;

        const leftHorizontals = getHorizontals(field, 'LEFT');
        win = checkWinOnSquares(leftHorizontals);
        if (win) {
            setWin(true);
            return;
        }

        const rightHorizontals = getHorizontals(field, 'RIGHT');
        win = checkWinOnSquares(rightHorizontals);
        if (win) {
            setWin(true);
            return;
        }

        const upVerticals = getVerticals(field, 'UP');
        win = checkWinOnSquares(upVerticals);
        if (win) {
            setWin(true);
            return;
        }

        const downVerticals = getVerticals(field, 'DOWN');
        win = checkWinOnSquares(downVerticals);
        if (win) {
            setWin(true);
            return;
        }

        const leftUpDiagonals = getDiagonals(field, 'LU');
        win = checkWinOnSquares(leftUpDiagonals);
        if (win) {
            setWin(true);
            return;
        }

        const leftDownDiagonals = getDiagonals(field, 'LD');
        win = checkWinOnSquares(leftDownDiagonals);
        if (win) {
            setWin(true);
            return;
        }

        const rightDownDiagonals = getDiagonals(field, 'RD');
        win = checkWinOnSquares(rightDownDiagonals);
        if (win) {
            setWin(true);
            return;
        }

        const rightUpDiagonals = getDiagonals(field, 'RU');
        win = checkWinOnSquares(rightUpDiagonals);
        if (win) {
            setWin(true);
            return;
        }
    }

    const checkWinOnSquares = (squares: Square[]) => {
        console.log('squares', squares)
        if (squares.length < adjacentCount) {
            return false;
        }

        let win = false;
        for (let i = 1; i < adjacentCount; i++) {
            win = squares[i - 1].value !== '' && squares[i - 1].value === squares[i].value;
            if (!win) {
                break;
            }
        }
        console.log('Win', win)
        return win;
    }

    const getHorizontals = (field: Square, horizontalType: string) => {
        const horizontals: Square[] = [];
        switch (horizontalType) {
            case 'LEFT': {
                for (let k = 0; k < adjacentCount; ++k) {
                    if (field.position.y + k < boardSize) {
                        horizontals.push(board[field.position.x][field.position.y + k]);
                    }
                }
                break;
            }
            case 'RIGHT': {
                for (let k = 0; k < adjacentCount; ++k) {
                    if (field.position.y - k > 0) {
                        horizontals.push(board[field.position.x][field.position.y - k]);
                    }
                }
                break;
            }
            default:
                console.error('WRONG TYPE');
                break;
        }
        return horizontals;
    }

    const getVerticals = (field: Square, verticalType: string) => {
        const horizontals: Square[] = [];
        switch (verticalType) {
            case 'UP': {
                for (let k = 0; k < adjacentCount; ++k) {
                    if (field.position.x + k < boardSize) {
                        horizontals.push(board[field.position.x + k][field.position.y]);
                    }
                }
                break;
            }
            case 'DOWN': {
                for (let k = 0; k < adjacentCount; ++k) {
                    if (field.position.x - k >= 0) {
                        horizontals.push(board[field.position.x - k][field.position.y]);
                    }
                }
                break;
            }
            default:
                console.error('WRONG TYPE');
                break;
        }
        return horizontals;
    }

    const getDiagonals = (field: Square, diagonalType: string) => {
        const diagonal: Square[] = [];
        switch (diagonalType) {
            case 'LU': {
                for (let k = 0; k < adjacentCount; ++k) {
                    if (field.position.x + k < boardSize && field.position.y + k < boardSize) {
                        diagonal.push(board[field.position.x + k][field.position.y + k]);
                    }
                }
                break;
            }
            case 'LD': {
                for (let k = 0; k < adjacentCount; ++k) {
                    if (field.position.x - k >= 0 && field.position.y + k < boardSize) {
                        diagonal.push(board[field.position.x - k][field.position.y + k]);
                    }
                }
                break;
            }
            case 'RD': {
                for (let k = 0; k < adjacentCount; ++k) {
                    if (field.position.x - k >= 0 && field.position.y - k >= 0) {
                        diagonal.push(board[field.position.x - k][field.position.y - k]);
                    }
                }
                break;
            }
            case 'RU': {
                for (let k = 0; k < adjacentCount; ++k) {
                    if (field.position.x + k > boardSize && field.position.y - k >= 0) {
                        diagonal.push(board[field.position.x + k][field.position.y - k]);
                    }
                }
                break;
            }
            default:
                console.error('WRONG TYPE');
                break;
        }
        return diagonal;
    }

    React.useEffect(() => {
        createBoard();
    }, []);

    return (
        <div>
            {board ?
                <div className="board">
                    {board.map((row: Square[], i: any) => {
                        return (
                            <div key={i}>
                                {row.map((col, j) => {
                                    return (
                                        <React.Fragment key={j}>
                                            {/* ({i}:{j}) */}
                                            <Field
                                                key={j}
                                                square={col}
                                                player={player}
                                                updateField={updateField}
                                                setPlayer={setPlayer}
                                                disabled={win}>
                                            </Field>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                : 'Empty state'}
            {win ? <div>{player} WIN</div> : 'Not win'}
        </div>
    );
}

export default Board;