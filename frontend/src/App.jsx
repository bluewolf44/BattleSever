import { useState } from 'react'
import InGame from './InGame'
import Lobby from './Lobby'
import './App.css'

function App() {
    const [inGame,setInGame] = useState(false);
    const [lobbyCode,setLobbyCode] = useState("");
    const [error,setError] = useState("")

    const HandleHost = async () => {
        await fetch("http://localhost:8080/createGame", {
            method:"POST",
            headers: {
                //"Content-Type": "application/json",
            },
            //credentials: "same-origin",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch properties');
            }
            return res.text()
        }).then((data) => {
            setLobbyCode(data)
            setInGame(true)
        })
    }

    const HandleBack = async () => {
        await fetch("http://localhost:8080/joinGame/"+lobbyCode, {
            method:"POST",
            headers: {
                //"Content-Type": "application/json",
            },
            //credentials: "same-origin",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch properties');
            }
            return res.text()
        }).then((data) => {
            setInGame(false)
        })
    }

    return (
        <>
            {inGame ?
                <InGame HandleBack = {HandleBack} lobbyCode = {lobbyCode}/>:
                <Lobby HandleHost = {HandleHost}/> }
        </>
    )
}

export default App
