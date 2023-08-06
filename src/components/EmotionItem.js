const EmotionItem = ({ emotion_id, emotion_img, emotion_discript }) => {
  return (
    <div className="EmotionItem">
      <img src={emotion_img} />
      <span>{emotion_discript}</span>
    </div>
  );
};

export default EmotionItem;
