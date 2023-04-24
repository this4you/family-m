import logo from './logo.png';
import './App.css';
import {useEffect, useState} from "react";
import {supabase} from "./infrastructure/api";

function App() {
    const [members, setMembers] = useState('');
    useEffect( () => {
        supabase.from("family_member").select().then(({data}) => {
            console.log("FAMILY MEMBERS", data);
            setMembers(data);
        });
    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>Family-m</h1>
                <h3>Site will be active soon...!</h3>
                <p>members: {JSON.stringify(members)}</p>
                <h5>Created by this4you</h5>
            </header>
        </div>
    );
}

export default App;
