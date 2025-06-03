import  { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus
    .slice()
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1)) || [];

  useEffect(() => {
    // À chaque montage ou quand la taille des slides change, on crée l'interval
    const intervalId = setInterval(() => {
      setIndex(prevIndex =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [byDateDesc.length]);
  return (
    <div className="SlideCardList">
      {/* === 1. Boucle pour les slides === */}
      {byDateDesc?.map((evt, idx) => (
        
        <div
        // eslint-disable-next-line react/no-array-index-key
          key={`${evt.title}-${idx}`}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={evt.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{evt.title}</h3>
              <p>{evt.description}</p>
              <div>{getMonth(new Date(evt.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* === 2. Bloc unique de pagination, hors du map des slides === */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((evt, radioIdx) => (
            
            <input
            // eslint-disable-next-line react/no-array-index-key
              key={`radio-${evt.title}-${radioIdx}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
