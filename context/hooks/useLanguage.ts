import vi from '../../languages/vi.json'
import en from '../../languages/en.json'
import { create } from 'zustand'
interface LanguageState {
    language: typeof en;
    setLanguage: (iso: keyof Languages) => void;
}
type Languages = {
    vi: typeof vi;
    en: typeof en;
};
export type LanguageISO = keyof Languages;
function languageFactory(iso: LanguageISO) {
    switch (iso) {
        default:
            return en;
        case 'en':
            return en;
        case 'vi':
            return vi;
    }
}
const useLanguage = create<LanguageState>()(
    (setState) => ({
        language: en,
        setLanguage: (iso) => setState({ language: languageFactory(iso) })
    }),
);

export default useLanguage;