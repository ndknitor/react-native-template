import React, { useState, ReactElement, forwardRef, useImperativeHandle, Fragment } from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ViewStyle,
    StyleProp,
    RefreshControl,
    ScrollView,
} from 'react-native';
import useAsyncEffect from 'use-async-effect';

interface InfiniteScrollViewProps<T> {
    fetch: (page: number) => T[] | Promise<T[]>;
    placeHolderView?: ReactElement;
    dataView: (data: T, index: number) => ReactElement;
    style?: StyleProp<ViewStyle>;
}

export interface InfiniteScrollViewRef {
    fetch: () => void;
}

const InfiniteScrollView = forwardRef<InfiniteScrollViewRef, InfiniteScrollViewProps<any>>(function <T = any>(
    props: InfiniteScrollViewProps<T>,
    ref: React.Ref<InfiniteScrollViewRef>
) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing] = useState(false);

    const handleRefresh = async () => {
        await fetchFromProps();
    };

    useAsyncEffect(async () => {
        await fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        const fetchedData = await props.fetch(page);
        setData(prevData => [...prevData, ...fetchedData]);
        setPage(prevPage => prevPage + 1);
        setIsLoading(false);
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isScrolledToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

        if (isScrolledToBottom && !isLoading) {
            fetchData();
        }
    };

    const fetchFromProps = async () => {
        setIsLoading(true);
        setData([]);
        const fetchedData = await props.fetch(1);
        setData(fetchedData);
        setPage(2);
        setIsLoading(false);
    };

    // Expose the fetchFromProps function to the parent component through the ref
    useImperativeHandle(ref, () => ({
        fetch: fetchFromProps,
    }));

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            style={[props.style]}
            onScroll={handleScroll}>
            {data.map((item, index) =>
                <Fragment key={index}>
                    {props.dataView(item, index)}
                </Fragment>
            )}
            {isLoading && props.placeHolderView}
        </ScrollView>
    );
});

export default InfiniteScrollView;