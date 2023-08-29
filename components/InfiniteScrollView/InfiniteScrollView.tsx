import React, { useState, ReactElement, forwardRef, useImperativeHandle, Fragment, useRef } from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ViewStyle,
    StyleProp,
    RefreshControl,
    ScrollView,
    FlatList,
} from 'react-native';
import useAsyncEffect from 'use-async-effect';

interface InfiniteScrollViewProps<T> {
    fetch: (page: number) => T[] | Promise<T[]>;
    placeHolderView?: ReactElement;
    dataView: (data: T, index: number) => ReactElement;
    style?: StyleProp<ViewStyle>;
    maxPage: number;
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
        await fetchData(1);
    }, []);

    const fetchData = async (page: number) => {
        setIsLoading(true);
        const data = await props.fetch(page);
        setData(prevData => [...prevData, ...data]);
        setPage(page);
        setIsLoading(false);
    };

    const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isScrolledToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
        if (isScrolledToBottom && !isLoading) {
            if (page < props.maxPage) {
                fetchData(page + 1);
            }
        }
    };

    const fetchFromProps = async () => {
        setPage(1);
    };

    // Expose the fetchFromProps function to the parent component through the ref
    useImperativeHandle(ref, () => ({
        fetch: fetchFromProps,
    }));

    return (
        <FlatList
            {...props}
            data={data}
            renderItem={(item) => (
                <Fragment key={item.index}>
                    {props.dataView(item.item, item.index)}
                </Fragment>
            )}
            onScroll={handleScroll}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            ListFooterComponent={
                <Fragment>
                    {isLoading && props.placeHolderView}
                </Fragment>}>
        </FlatList>
    );
});

export default InfiniteScrollView;