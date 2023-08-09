import MyHeader from './MyHeader';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from "./../App.js"

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion1.png',
    emotion_descript: '완전 좋음',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion2.png',
    emotion_descript: '좋음',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion3.png',
    emotion_descript: '보통',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion4.png',
    emotion_descript: '별로',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion5.png',
    emotion_descript: '완전 별로',
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
const contentRef = useRef();
const [content, setContent] = useState("");
const [emotion, setEmotion] = useState(3);
const [date, setDate] = useState(getStringDate(new Date()));
const { onCreate } = useContext(DiaryDispatchContext);

const handleClickEmote = (emotion) => {
  setEmotion(emotion);
}

const handleSubmit = () => {
  if(content.length < 1) {
    contentRef.current.focus();
    return ;
  }
  
  onCreate(date, content, emotion);
  navigate('/', {replace : true});
}

const navigate = useNavigate();


  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={'NeW'}
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
