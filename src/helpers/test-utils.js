/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { render as rtlRender } from "@testing-library/react";
import DataContext from "../contexts/DataContext";

/**
 * renderWithProvider : rend un composant tout en l'enveloppant dans
 * DataContext.Provider, et utilise `useMemo` pour ne pas recréer
 * l'objet `{ data, error }` à chaque rendu.
 */
export function render(ui, { data = null } = {}, rtlOptions = {}) {
  // On définit un Wrapper performant :
  function Wrapper({ children }) {
    // useMemo va ne recréer l’objet “value” que si `data` change réellement.
    const contextValue = useMemo(() => ({ data, error: null }), [data]);
    return (
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...rtlOptions });
}

export * from "@testing-library/react";
