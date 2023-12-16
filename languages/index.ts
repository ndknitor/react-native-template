import vi from './vi.json';
import en from './en.json';
type Languages ={
    vi : typeof vi;
    en : typeof en;
};
const Languages : Languages = {
    en : en,
    vi : vi
};
export default Languages;