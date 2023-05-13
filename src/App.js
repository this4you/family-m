import logo from './logo.png';
import './App.css';
import {Tabs} from 'antd';
import {WeekMenu} from "./components/week-menu/WeekMenu";
import Store from "./store";
import {DishTable} from "./components/dish-table/DishTable";
import {ProductTable} from "./components/product-table/ProductTable";

const tabs = [
    {
        key: '1',
        label: `Меню на тиждень`,
        children: <WeekMenu/>,
    },
    {
        key: '2',
        label: `Список страв`,
        children: <DishTable/>,
    },
    {
        key: '3',
        label: `Список продуктів`,
        children: <ProductTable/>,
    },
    {
        key: '4',
        label: `Чек продуктів на поточний тиждень`,
        children: `Content of Tab Pane 3`,
    },
];

function App() {
    return (
        <Store>
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo"/>
                </header>
                <Tabs defaultActiveKey="1" items={tabs}/>
            </div>
        </Store>
    );
}

export default App;
