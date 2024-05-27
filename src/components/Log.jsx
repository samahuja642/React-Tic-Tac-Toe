export default function Log({turns}){
    const content = [];
    for (let i = 0; i < turns.length; i++) {
        if(i==0){
            content.push(<li className="highlighted" key={`${turns[i].square.row}+${turns[i].square.col}`}>{turns[i].symbol} has pressed {turns[i].square.row} , {turns[i].square.col}</li>);    
        }
        else content.push(<li key={`${turns[i].square.row}+${turns[i].square.col}`}>{turns[i].symbol} has pressed {turns[i].square.row} , {turns[i].square.col}</li>);
    }
    return (
        <ol id="log">
                {content}
        </ol>
    );
}