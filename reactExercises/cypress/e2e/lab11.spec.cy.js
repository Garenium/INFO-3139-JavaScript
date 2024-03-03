describe("Test Lab 11 Sentence Builder", () => {
  it("finds the server and builds a sentence", () => {
    cy.visit("http://localhost:5173/");
    cy.get("input:first")
      .should("have.attr", "placeholder", "Add Word")
      .type("The");
    cy.get('[data-testid="addbutton"]').click();
    cy.get("input:first")
      .should("have.attr", "placeholder", "Add Word")
      .type("quick");
    cy.get('[data-testid="addbutton"]').click();
    cy.get("input:first")
      .should("have.attr", "placeholder", "Add Word")
      .type("brown");
    cy.get('[data-testid="addbutton"]').click();
    cy.get("input:first")
      .should("have.attr", "placeholder", "Add Word")
      .type("fox");
    cy.get('[data-testid="addbutton"]').click();
    cy.contains("The quick brown fox");
  });
});
