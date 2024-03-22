import { lazy } from 'react';

const root = './about'

export const About = lazy(() => import(`${root}/AboutComponent`));