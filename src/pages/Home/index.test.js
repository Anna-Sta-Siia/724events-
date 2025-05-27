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

  it("a list of fields card is displayed", async () => {
     await screen.findByLabelText("Nom");
     await screen.findByLabelText("Prénom");
    await screen.findByLabelText("Email");
    await screen.findByText("Personnel / Entreprise");
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


