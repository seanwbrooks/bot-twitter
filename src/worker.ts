import twitter from './controllers/twitter';

export const worker = () => {
    console.log("from worker");
    twitter();
}