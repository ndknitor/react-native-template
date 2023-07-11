import { useEffect, useState } from 'react';
import { ScaledSize, Dimensions } from 'react-native';

const useScreenDimensions = (): ScaledSize => {
    const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
    useEffect(() => {
        const handleDimensionsChange = ({ window }: { window: ScaledSize }) => {
            setScreenDimensions(window);
        };
        const listener = Dimensions.addEventListener('change', handleDimensionsChange);
        return () => {
            listener.remove();
        }
    }, []);

    return screenDimensions;
};

export default useScreenDimensions;
