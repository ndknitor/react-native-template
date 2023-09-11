import vi from './languages/vi.json';
import en from './languages/en.json';
type Languages ={
    vi : typeof vi;
    en : typeof en;
};
const Languages : Languages = {
    en : en,
    vi : vi
};
export default Languages;