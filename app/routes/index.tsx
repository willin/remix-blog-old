import { redirect, type ActionFunction, type LoaderFunction } from 'remix';

export const action: ActionFunction = () => redirect('/en');

export const loader: LoaderFunction = () => redirect('/en');
