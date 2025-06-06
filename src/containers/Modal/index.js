// src/containers/Modal/index.js
import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened);

  return (
    <>
      {children({ isOpened, setIsOpened })}

      {isOpened && (
        <div
          className="modal"
          data-testid="modal-overlay"
          role="button"
          tabIndex={0}
          // Si on clique vraiment sur l'overlay (pas dans .content), on ferme
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpened(false);
            }
          }}
          // Au clavier : si Enter ou Espace, on ferme
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
              setIsOpened(false);
            }
          }}
          aria-label="Fermer la fenêtre modale"
        >
          <div
            className="content"
            data-testid="modal-content"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            {Content}

            <button
              type="button"
              data-testid="close-modal"
              onClick={() => setIsOpened(false)}
              aria-label="Fermer la fenêtre"
            >
              <Icon name="close" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  opened: false,
};

Modal.propTypes = {
  opened: PropTypes.bool,
  Content: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
};

export default Modal;
