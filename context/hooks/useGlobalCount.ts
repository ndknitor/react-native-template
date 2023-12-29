import { create } from 'zustand'
interface GlobalCountState {
    value: number;
    set: (v: number) => void;
    increase: () => void;
    decrease: () => void;
}
const useGlobalCount = create<GlobalCountState>()(
    (setState) => ({
        value: 0,
        set: (v) => setState(() => ({ value: v })),
        increase: () => setState(state => ({ value: state.value + 1 })),
        decrease: () => setState(state => ({ value: state.value - 1 }))
    }),
);
export default useGlobalCount;