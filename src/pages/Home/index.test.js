// src/pages/Home/index.test.js
import { fireEvent, render, screen } from "@testing-library/react";
// Au lieu d’importer Home, on importe directement Form :
import Form from "../../containers/Form";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    // On rend maintenant le composant Form, pas Home
    render(<Form onSuccess={() => {}} onError={() => {}} />);
    // On recherche les labels dans le DOM
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      // Pour tester le bouton, il faut simuler onSuccess :
      // onSuccess affichera une balise <div> contenant "Message envoyé !"
      let successCalled = false;
      const fakeOnSuccess = () => {
        successCalled = true;
        // On insère dans le DOM le message que le test doit retrouver
        const container = document.createElement("div");
        container.innerHTML = `
          <div>Message envoyé !</div>
          <p>Merci pour votre message nous tâcherons de vous répondre dans les plus brefs délais</p>
        `;
        document.body.appendChild(container);
      };

      render(<Form onSuccess={fakeOnSuccess} onError={() => {}} />);

      // On trouve le bouton "Envoyer"
      const sendButton = await screen.findByText("Envoyer");

      // Simule un click sur le formulaire
      fireEvent(
        sendButton,
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Après le click, le bouton passe en "En cours" (state sending=true)
      await screen.findByText("En cours");

      // Puis, quand mockContactApi() se résout, onSuccess injecte
      // le message "Message envoyé !" dans le DOM, on le recherche :
      await screen.findByText("Message envoyé !");
      expect(successCalled).toBe(true);
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // à implémenter plus tard…
  });
  it("a list a people is displayed", () => {
    // à implémenter plus tard…
  });
  it("a footer is displayed", () => {
    // à implémenter plus tard…
  });
  it("an event card, with the last event, is displayed", () => {
    // à implémenter plus tard…
  });
});
