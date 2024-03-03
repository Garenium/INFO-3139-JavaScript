describe("Lab 12 - Select Word", () => {
  it("finds the server and selects a word", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#words").type("Hey{downArrow}{enter}");
    cy.contains("Hey");
    cy.get("#words").clear().type("I{downArrow}{enter}");
    cy.contains("Hey I");
    cy.get("#words").clear().type("built{downArrow}{enter}");
    cy.contains("Hey I built");
    cy.get("#words").clear().type("a{downArrow}{enter}");
    cy.contains("Hey I built a");
    cy.get("#words").clear().type("sentence.{downArrow}{enter}");
    cy.contains("Hey I built a sentence.");
    cy.get("#words").clear().type("Garen Ikezian{downArrow}{enter}");
    cy.contains("Hey I built a sentence. Garen Ikezian");
  });
});
