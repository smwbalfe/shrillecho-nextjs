
import { Fira_Code } from 'next/font/google';

// Import the weights and subsets, add any other config here as well
const nextFont = Fira_Code({
    weight: ['400'],
    subsets: ['latin'],
});


export const fonts = {
    body: nextFont.style.fontFamily,
    heading: nextFont.style.fontFamily
}
