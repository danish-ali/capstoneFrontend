import { click } from "@testing-library/user-event/dist/click";

const Home = () => {

const clickMe = () => {
    console.log('hi danish');
}

const clickMeAgain = (name) => {
    console.log('hi ' + name);
}

    return (  
   <div className="home"> 
        <h2>This is home page</h2>
        <button onClick={clickMe}>click</button>
        <button onClick={() => clickMeAgain('Developer')}> Press me </button>
    </div>
    );
}
 
export default Home;