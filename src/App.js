import logo from './logo.png';
import './App.css';
import {Tabs} from 'antd';
import {WeekMenu} from "./components/week-menu/WeekMenu";
import Store from "./store";
import {DishTable} from "./components/dish-table/DishTable";
import {ProductTable} from "./components/product-table/ProductTable";
import {WeekProductList} from "./components/week-product-list/WeekProductList";

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
        children: <WeekProductList/>,
    },
];

function App() {
    return (
        <Store>
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo"/>
                    <h1>Яєчка на сковородочці</h1>
                </header>
                <Tabs defaultActiveKey="1" items={tabs}/>
            </div>
        </Store>
    );
}

export default App;
