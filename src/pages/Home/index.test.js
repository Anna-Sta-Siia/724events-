import { render, screen, fireEvent,within } from "../../helpers/test-utils";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
   });

describe("When a page is created", () => {
  const fakeData = {
    events: [
      {
        id: 1,
        type: "soirée entreprise",
        date: "2022-04-29T20:28:45.744Z",
        title: "Conférence #ProductCON",
        cover: "/images/conf1.png",
        description: "Description 1",
        nb_guesses: 1300,
        periode: "24-25-26 Février",
        prestations: [],
      },
      {
        id: 2,
        type: "forum",
        date: "2022-05-01T18:00:00.000Z",
        title: "Forum #WebDev",
        cover: "/images/forum.png",
        description: "Description 2",
        nb_guesses: 800,
        periode: "1er Mai",
        prestations: [],
      },
      {
        id: 3,
        type: "atelier",
        date: "2022-06-10T10:00:00.000Z",
        title: "Atelier React",
        cover: "/images/atelier.png",
        description: "Description 3",
        nb_guesses: 500,
        periode: "10 Juin",
        prestations: [],
      },
    ],
    focus: [],
  };

  it("a list of events is displayed", async () => {
  render(<Home />, { data: fakeData });

 
  const eventsSection = screen.getByTestId("events-container");

  // à l’intérieur, on cherche les cartes par data-testid
  const eventCards = within(eventsSection).getAllByTestId("card-testid");

  expect(eventCards).toHaveLength(fakeData.events.length);
});
    it("a list of people is displayed (statique, sans data)", () => {
    render(<Home/>)
    const peopleCards = screen.getAllByTestId("people-card");
    peopleCards.forEach((card) => {
      // Dans le scope de cette seule carte, on cherche l’image
      const img = within(card).getByRole("img");
      // L’image doit avoir un attribut src non vide : 
      expect(img).toHaveAttribute("src");
      expect(img.getAttribute("src")).not.toBe("");

      // Vérifions la présence d’au moins un texte pour le nom et un texte pour le poste
      // Ici, on peut simplement s’assurer qu’il y a au moins deux <div> ou <span> (ou n’importe quoi)
      // contenant du texte généré par PeopleCard. Par exemple :
      const allTextNodes = within(card).getAllByText(/\S+/); 
      // \S+ signifie “au moins un caractère non-espace” → on récupère tous les éléments textuels.
      // Parmi eux, on veut s’assurer qu’il y a un texte pour le nom et un texte pour le poste
      // Cela revient à dire : il y a au moins 2 éléments textuels. (Un nom + un poste.)
      expect(allTextNodes.length).toBeGreaterThanOrEqual(2);
    });
 });
 it("a footer is displayed", () => {
    render(<Home />, { data: fakeData });

    // On vérifie simplement que l'<footer> existe
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {
    render(<Home />, { data: fakeData });

    // lastItem est trié depuis fakeData.events ; le plus récent est « Atelier React »
    expect(screen.getByTestId("last-event-container")).toBeInTheDocument();
  });
 });
   });