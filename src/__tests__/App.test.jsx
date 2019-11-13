import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from '../App';

// Use MemoryRouter to maintain react router's context.
// See here: https://reacttraining.com/react-router/web/guides/testing

describe("just a test", () => {
    it('should pass', () => {
        expect(true).toStrictEqual(true);
    });

    it('should render App', () => {
        const {container} = render(
        <MemoryRouter>
            <App/>
        </MemoryRouter>
        );
        expect(container.firstChild).toMatchSnapshot();
    })

    it('should render button', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
            );
        getByTestId('dictionaryToggle');
    })
})