import React from 'react';
import {render} from '@testing-library/react';
import App from '../App';

describe("just a test", () => {
    it('should pass', () => {
        expect(true).toStrictEqual(true);
    });

    it('should render App', () => {
        const {container} = render(<App/>);
        expect(container.firstChild).toMatchSnapshot();
    })

    it('should render button', () => {
        const {getByTestId} = render(<App/>);
        getByTestId('dictionaryToggle');
    })
})