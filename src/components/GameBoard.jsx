
export default function GameBoard({onSelectSquare,gameBoard}) {
    return (
        <ol id="game-board">
            {gameBoard.map((row,rowIndex) => {
                return (
                    <ol key={rowIndex}>
                        {row.map((col,colIndex) => {
                            return (
                                <li key={colIndex}>
                                    <button onClick={ ()=> onSelectSquare(rowIndex,colIndex)} disabled={col?true:false}>{col}</button>
                                </li>
                                );
                        })}
                    </ol>
                );
            })}
        </ol>
    );
}