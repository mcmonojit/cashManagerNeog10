const GuideCard = ({ textContent, styling }) => {
  return (
    <div className={styling}>
      <p>{textContent}</p>
    </div>
  );
};

export default GuideCard;
