jest.mock("../../contexts/DataContext", () => ({
  useData: () => ({
    data: { events: [], focus: [] },
    error: null,
  }),
  DataProvider: ({ children }) => children,
}));
/* eslint-disable import/first */
import { fireEvent, render, screen } from "@testing-library/react";
import Home                          from "./index";

describe("When Form is created", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("a list of fields card is displayed",  () => {
     expect(screen.getByText("Nom")).toBeInTheDocument();
 expect(screen.getByText("Prénom")).toBeInTheDocument();
 expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("Personel / Entreprise")).toBeInTheDocument()
  });

  it("and a click on Envoyer displays the success message", async () => {
    const btn = await screen.findByRole("button", { name: /envoyer/i });
    fireEvent.click(btn);
    await screen.findByText("Message envoyé !");
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});


