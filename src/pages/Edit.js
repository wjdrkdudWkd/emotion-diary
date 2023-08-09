
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    // const [searchParams, setSerchParams] = useSearchParams();
    // const id = searchParams.get("id");
    // setSerchParams({ who: "loong" });
    const navigate = useNavigate();
    const [originData, setOriginData] = useState();
    const { id } = useParams();

    const diaryList = useContext(DiaryStateContext);
    console.log(id);
    console.log(diaryList);

    useEffect(() => {
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            console.log(targetDiary);

            if(targetDiary){
                setOriginData(targetDiary);
                console.log(targetDiary);
            }else {
                navigate('/', {replace: true})
            }
        }
    }, [id, diaryList]);

    return (
        <div>
            {originData && <DiaryEditor
                isEdit={true}
                originData = {originData}
            />}
        </div>
    )
};

export default Edit;