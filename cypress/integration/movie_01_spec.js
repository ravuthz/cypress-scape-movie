Cypress.Commands.add("getState", (key) => {
    cy.readFile('cypress/fixtures/state.json').then((state) => {
        return state[key];
    });
});

Cypress.Commands.add("setState", (key, value) => {
    cy.readFile('cypress/fixtures/state.json').then((state) => {
        cy.writeFile('cypress/fixtures/state.json', { ...state, [key]: value });
    });
    // cy.writeFile('cypress/fixtures/state.json', { [key]: value });
});

Cypress.Commands.add("addState", (key, value) => {
    cy.readFile('cypress/fixtures/state.json').then((currentState) => {
        let { [key]: state, ...other } = currentState;
        if (!state) {
            state = [];
        }
        state = [...state, value];
        cy.writeFile('cypress/fixtures/state.json', { [key]: state, ...other });
    })
});

Cypress.Commands.add("putState", (name, key, value) => {
    cy.readFile('cypress/fixtures/state.json').then((currentState) => {
        let { [name]: state, ...other } = currentState;
        if (!state) {
            state = {};
        }
        state = {...state, [key]: value};
        cy.writeFile('cypress/fixtures/state.json', { [name]: state, ...other });
    })
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

const getTitle = (text) => (text.indexOf('-') !== -1 ? text.split('-')[0] : text).trim();

// cy.window();
// cy.document();

describe('The Home Page', () => {
    it('successfully loads', async () => {

        cy.visit('https://www.stockdrama.club/2021/12/nisaiy-sneh-tevoda-cham-cheat-ep00.html').then((res) => {

            cy.get('.entry-title').invoke('text').then(title => {
                cy.setState('title', title);
            });

            cy.title().then(title => {
                cy.setState('name', getTitle(title));
            });

            cy.get('.playlist-one').children().each((row, index) => {
                cy.get(row).click();
                cy.get('#frame-vid').invoke('attr', 'src').then(data => {
                    // cy.log(data);
                    cy.putState('video', index, data);
                });
            });

        });

        // cy.wait(1000);
    })
});