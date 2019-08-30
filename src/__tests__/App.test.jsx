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

    it('should detect text in page', () => {
        const {queryAllByText} = render(<App/>);
        expect(queryAllByText('Hello there!')).not.toStrictEqual([]);
    })

    it('should render button', () => {
        const {getByTestId, queryByTestId} = render(<App/>);
        getByTestId('toggle');
        expect(queryByTestId('toggle')).not.toStrictEqual([]);
    })
})