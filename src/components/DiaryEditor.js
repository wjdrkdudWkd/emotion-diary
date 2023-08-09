import MyHeader from './MyHeader';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from "./../App.js"
import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion';



const DiaryEditor = ({isEdit, originData}) => {
const contentRef = useRef();
const [content, setContent] = useState("");
const [emotion, setEmotion] = useState(3);
const [date, setDate] = useState(getStringDate(new Date()));
const { onCreate, onEdit } = useContext(DiaryDispatchContext);

const handleClickEmote = (emotion) => {
  setEmotion(emotion);
}

const handleSubmit = () => {
  if(content.length < 1) {
    contentRef.current.focus();
    return ;
  }

  if(window.confirm(isEdit? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
    if(!isEdit) {
      onCreate(date, content, emotion);
    } else {
      onEdit(originData.id, date, content, emotion)
    }
  }
  
  
  navigate('/', {replace : true});
};

useEffect(()=> {
  if(isEdit) {
    setDate(getStringDate(new Date(parseInt(originData.date))));
    setEmotion(originData.emotion);
    setContent(originData.content);
  }
}, [isEdit, originData])

const navigate = useNavigate();


  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? 'Edit' : 'NeW'}
        leftChild={<MyButton text={'< back'} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>date</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>emotion</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem key={it.emotion_id} {...it} 
              onClick={handleClickEmote} 
              isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input_box text_wrapper'>
              <textarea ref={contentRef} 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder='오늘 하루는 어땠나요?'
              />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton 
              text={"cancel"} 
              onClick={() => navigate(-1)} />
            <MyButton 
              text={"save"} 
              type={"positive"} 
              onClick={handleSubmit}/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
