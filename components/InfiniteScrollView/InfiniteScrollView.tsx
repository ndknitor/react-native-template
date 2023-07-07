import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { View, ScrollView, ActivityIndicator, Text, NativeScrollEvent, NativeSyntheticEvent, ViewStyle, StyleProp, Animated, RefreshControl } from 'react-native';
import LoadingView from '../LoadingView/LoadingView';
import FadeTransition from '../FadeTransition/FadeTransition';

interface InfiniteScrollViewProps<T> {
    fetch: (page: number) => { data: T[], reset?: boolean } | Promise<{ data: T[], reset?: boolean }>;
    placeHolderView?: ReactElement;
    dataView: (data: T) => ReactElement;
    style?: StyleProp<ViewStyle>;
    onRefresh?: () => void | Promise<void>;
}
function InfiniteScrollView<T>(props: InfiniteScrollViewProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        props.onRefresh && await props.onRefresh();
        setRefreshing(false);
    };
    const scrollAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        // Animation configuration
        Animated.timing(scrollAnim, {
            toValue: 1,
            duration: 500, // Adjust this value as per your preference
            useNativeDriver: false, // `height` property requires non-native driver
        }).start();
    }, [data]);

    const interpolatedHeight = scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        const { data, reset } = await props.fetch(page);
        if (reset) {
            setData(data);
            setPage(1);
        }
        else {
            setData(prevData => [...prevData, ...data]);
            setPage(prevPage => prevPage + 1);
        }
        setIsLoading(false);
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isScrolledToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

        if (isScrolledToBottom && !isLoading) {
            fetchData();
        }
    };

    return (
        <Animated.ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            style={[props.style, { height: interpolatedHeight }]}
            onScroll={handleScroll}>
            {data.map(item =>
                props.dataView(item)
            )}
            {isLoading && props.placeHolderView}
        </Animated.ScrollView>
    );
};

export default InfiniteScrollView;