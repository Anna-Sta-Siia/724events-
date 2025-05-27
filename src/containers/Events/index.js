import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (error) return <div>An error occurred</div>;
  if (!data)  return <div>Loading…</div>;

  // 1️⃣ catégories disponibles
  const typeList = Array.from(new Set(data.events.map(evt => evt.type)));

  // 2️⃣ on commence par trier du plus récent au plus ancien
  const sorted = [...data.events].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 3️⃣ on filtre ensuite sur la catégorie (null → Toutes)
  const byType = sorted.filter(evt =>
    !type || evt.type === type
  );

  // 4️⃣ pagination sur cet ensemble trié+filtré
  const totalPages = Math.ceil(byType.length / PER_PAGE);
  const start      = (currentPage - 1) * PER_PAGE;
  const paged      = byType.slice(start, start + PER_PAGE);

  // 5️⃣ changement de catégorie → on remet la page à 1
  const changeType = newType => {
    setType(newType);
    setCurrentPage(1);
  };

  return (
    <>
      <h3 className="SelectTitle">Catégories</h3>
      <Select
        selection={typeList}
        onChange={value => changeType(value)}
        titleEmpty={false}   // affiche "Toutes"
      />

      <div id="events" className="ListContainer">
        {paged.map(event => (
          <Modal key={event.id} Content={<ModalEvent event={event} />}>
            {({ setIsOpened }) => (
              <EventCard
                onClick={() => setIsOpened(true)}
                imageSrc={event.cover}
                title={event.title}
                date={new Date(event.date)}
                label={event.type}
              />
            )}
          </Modal>
        ))}
      </div>

      <div className="Pagination">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <a
              key={`page-${page}`}
              href="#events"
              className={currentPage === page ? "active" : ""}
              onClick={e => {
                e.preventDefault();
                setCurrentPage(page);
              }}
            >
              {page}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default EventList;
