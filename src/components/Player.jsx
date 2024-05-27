import {useState} from 'react';
export default function Player({initialName,symbol,isActive,nameChange}){
    const [isEditing,setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(initialName);
    function handleEditClick(){
        setIsEditing(isEditing => !isEditing);
    }
    function handleChange(event){
        setPlayerName(event.target.value);
        nameChange(symbol,playerName);
    }
    return (
        <li className={isActive?"active":null}>
            <span className="player">
              {isEditing?<input className="player-name" defaultValue={playerName} onChange={handleChange}></input>:<span className="player-name">{playerName}</span>}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
        </li>
    );
}