import MyHeader from './MyHeader';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion1.png',
    emotion_descript: '완전 좋음',
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion1.png',
    emotion_descript: '완전 좋음',
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion1.png',
    emotion_descript: '완전 좋음',
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion1.png',
    emotion_descript: '완전 좋음',
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + '/assets/emotion1.png',
    emotion_descript: '완전 좋음',
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
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
          <div className="input_box_emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem key={it.emotion_id} {...it} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
