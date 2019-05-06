describe('Suppliers', () => {
    it('Should open list of suppliers', () => {
        cy.visit('/suppliers')
        cy.contains('h1', 'Suppliers')
        cy.get('table th').should('have.length', 5)
    })

    it('Should update existing supplier', () => {
        cy.visit('/suppliers')
        cy.contains('h1', 'Suppliers')
        cy.get('.suppliers-edit:first').click()
        cy.contains('h1', 'Supplier #')
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('button#saveButton').click()

        cy.get('table td:first').should($td => {
            expect($td).to.contain('NEW COMPANY')
        })
    })

    it('Should create new supplier', () => {
        cy.visit('/suppliers/0')
        cy.get('input#companyNameField').type('NEW COMPANY')
        cy.get('input#contactNameField').type('NEW CONTACT')
        cy.get('input#contactTitleField').type('CONTACT TITLE')
        cy.get('input#contactNameField').type('.')
        cy.get('button#saveButton').click()
        cy.get('table tr:last td:first').should($td => {
            expect($td).to.contain('NEW COMPANY')
        })
    })
})