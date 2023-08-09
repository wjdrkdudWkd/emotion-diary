import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import MyButton from "../components/MyButton";
import { emotionList } from "../util/emotion";



const Diary = () => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState(getStringDate(new Date()));

    useEffect(()=> {
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );

            if(targetDiary) {
                setData(targetDiary);
            } else {
                navigate('/', {replace:true})
            }

        }
    }, [id, diaryList]);

    if(!data) {
        return <div className="DiaryPage">로딩중입니다...</div>;
    } else {

    const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));
    console.log(curEmotionData);

        return (
            <div className="DiaryPage">
                <MyHeader headText={`${getStringDate(new Date(data.date))} 기록`} 
                leftChild={<MyButton text={"< back"} onclick={() => navigate(-1)} />}
                rightChild={
                    <MyButton 
                        text={"edit"}
                        onClick={() => navigate(`/edit/${data.id}`)}
                    />
                }
                />
                
            </div>
        )
    }


};

export default Diary;