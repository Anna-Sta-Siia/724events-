import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // 1. Copie + tri ascendant
  const byDateAsc = data?.focus
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date)) || [];

  // 2. Intervalle auto
  useEffect(() => {
  let interval;                       // on déclare la variable ici
  if (byDateAsc.length > 0) {
    interval = setInterval(() => {
      setIndex(i => (i + 1) % byDateAsc.length);
    }, 5000);
  }

  // On retourne *toujours* une fonction de cleanup,
  // qui ne fait quelque chose que si `interval` existe.
  return () => {
    if (interval) clearInterval(interval);
  };
}, [byDateAsc.length]);


    // 3. Si la donnée n'est pas encore chargée, on ne rend rien
 if (!data) return null;

console.log(
  "Slider dates et mois :",
  byDateAsc.map(e => ({
    raw: e.date,
    month: getMonth(new Date(e.date))
  }))
);


  return (
  <div className="SlideCardList">
  {/* slide d'index 0 en display dès le premier rendu */}
  {byDateAsc.map((event, idx) => (
    <div
      key={event.id}
      className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
    >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="SlideCard__month">
                {getMonth(new Date(event.date))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 4. Pagination hors de la map */}
      <div className="SlideCard__paginationContainer">
        
            {byDateAsc.map((evt, radioIdx) => (
    <input
    key={`dot-${evt.id}`}  
            type="radio"
            name="slider-radio"
            checked={radioIdx === index}
            onChange={() => setIndex(radioIdx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
