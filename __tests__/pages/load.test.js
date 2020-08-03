import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import axios from 'axios';
import Load from '~/pages/Load';
import MockedNavigator from '../../__mocks__/MockedNavigator';

jest.mock('axios');

jest.mock('react-redux');
const fetchFilters = jest.fn();
const loadInitialData = jest.fn();

describe('<Load/>', () => {
    it('should feych languages', () => {
        const languages = [
            {
                name: 'english',
                code: 'en'
            },
            {
                name: 'portuguese',
                code: 'pt'
            }
        ];
        const response = {data: languages};
        axios.get.mockResolvedValue(response);
    });
    it('should fetch filters', () => {
        render(<MockedNavigator component={Load} />);
        // expect(loadInitialData).toHaveBeenCalled();
    });
});
