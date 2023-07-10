import React, { useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Edit from './pages/Edit'
import New from './pages/New'
import Diary from './pages/Diary'
import RouteTest from './components/RouteTest';

// COMPONENTS
import MyButton from './components/MyButton'
import MyHeader from './components/MyHeader'

const recucer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it);
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "1번",
    date: 1688971499938
  },
  {
    id: 2,
    emotion: 2,
    content: "2번",
    date: 1688971499939
  },
  {
    id: 3,
    emotion: 3,
    content: "3번",
    date: 1688971499940
  },
  {
    id: 4,
    emotion: 4,
    content: "4번",
    date: 1688971499941
  },
  {
    id: 5,
    emotion: 5,
    content: "5번",
    date: 1688971499942
  },
]

function App() {
  const [data, dispatch] = useReducer(recucer, dummyData);
  const dataId = useRef(0);

  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content: content,
        emotion: emotion,
      }
    });
    dataId.current += 1;
  }

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId })
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove
        }}>
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader headText={"app"} leftChild={<MyButton text={"left"} />} rightChild={<MyButton text={"left"} />} />
        <h2>App.js</h2>

        <MyButton
          text={"button"}
          onClick={() => alert("클릭")}
          type={"positive"}
        />

        <MyButton
          text={"button"}
          onClick={() => alert("클릭")}
          type={"negative"}
        />

        <MyButton
          text={"button"}
          onClick={() => alert("클릭")}
        />

        <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} /> */}



            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
            <RouteTest />
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
