import { userFlow } from './scenarios/userFlow.js';

export const options = {
    vus: 5,
    duration: '20s',
};

export default function () {
    userFlow();
}