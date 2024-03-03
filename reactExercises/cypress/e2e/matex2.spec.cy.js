describe("Test MaterialUI Ex 2 - Select Banana", () => {
    it("finds the server and selects a banana", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#fruits").type("banana{downArrow}{enter}");
    cy.contains("You selected Banana");
    });
    });