import { useSearchParams } from "react-router-dom";

const Edit = () => {
    const [searchParams, setSerchParams] = useSearchParams();
    const id = searchParams.get("id");
    setSerchParams({ who: "loong" });

    return (
        <div>
            <h1>Edit</h1>
            <p>Edit입니다.</p>
        </div>
    )
};

export default Edit;