context('All tests', () => {
  it('visits the page', () => {
    cy.visit('http://localhost:3000');
  });
  it('uploads a file', () => {
    const fileName = 'image.png';
    cy.fixture(fileName).then(fileContent => {
      cy.get('input[type="file"]', { timeout: 10000 }).upload({
        fileContent,
        fileName,
        mimeType: 'image/jpeg',
      });
    });
    cy.get('.Toastify__toast--success', { timeout: 10000 }).click({ force: true });
  });

  it('lists uploaded files', () => {
    cy.get('[data-ci="file-image.png"]', { timeout: 10000 });
  });

  it('filters for files', () => {
    cy.get('input[data-ci="search"]', { timeout: 10000 }).type(
      'something we are sure would never be a valid file name',
    );
    cy.get('[data-ci="file-image.png"]', { timeout: 10000 }).should('not.exist');
    cy.get('input[data-ci="search"]', { timeout: 10000 })
      .clear()
      .type('image.png');
    cy.get('[data-ci="file-image.png"]', { timeout: 10000 });
    cy.get('input[data-ci="search"]', { timeout: 10000 }).clear();
  });

  it('deletes files', () => {
    cy.get('[data-ci="delete-image.png"]', { timeout: 10000 }).click({ force: true });
    cy.get('.Toastify__toast--success', { timeout: 10000 }).click({ force: true });
  });
});
