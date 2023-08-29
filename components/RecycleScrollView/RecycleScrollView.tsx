import { useScrollToTop } from '@react-navigation/native';
import React, { useState, ReactElement, forwardRef, useImperativeHandle, Fragment, useRef } from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ViewStyle,
    StyleProp,
    FlatList,
} from 'react-native';
import useAsyncEffect from 'use-async-effect';

interface RecycleScrollViewProps<T> {
    fetch: (page: number) => T[] | Promise<T[]>;
    placeHolderView?: ReactElement;
    dataView: (data: T, index: number) => ReactElement;
    maxPage: number;
    topOffset?: number;
    bottomOffset?: number;
    style?: StyleProp<ViewStyle>;
}

export interface RecycleScrollViewRef {
    fetch: (page: number) => void | Promise<void>;
}

const RecycleScrollView = forwardRef<RecycleScrollViewRef, RecycleScrollViewProps<any>>(function <T = any>(
    props: RecycleScrollViewProps<T>,
    ref: React.Ref<RecycleScrollViewRef>
) {
    const scrollViewRef = useRef<FlatList>(null);

    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useAsyncEffect(async () => {
        await fetchData(1, 0);
    }, []);

    const fetchData = async (page: number, offset: number) => {
        setIsLoading(true);
        setData(await props.fetch(page));
        setPage(page);
        scrollViewRef.current?.scrollToOffset({ offset: offset, animated: false });
        setIsLoading(false);
    };

    const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        const isScrolledToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
        const isScrolledToTop = contentOffset.y - 10 <= 0;

        if (isScrolledToTop && !isLoading) {
            if (page > 1) {
                fetchData(page - 1, contentSize.height - layoutMeasurement.height - (props.bottomOffset || 30));
            }
        }
        if (isScrolledToBottom && !isLoading) {
            if (page < props.maxPage) {
                fetchData(page + 1, props.topOffset || 30);
            }
        }
    };

    const fetchFromProps = async (page: number) => {
        await fetchData(page, 0);
    };

    // Expose the fetchFromProps function to the parent component through the ref
    useImperativeHandle(ref, () => ({
        fetch: fetchFromProps,
    }));

    return (
        <FlatList
            {...props}
            ref={scrollViewRef}
            data={data}
            renderItem={(item) => (
                <Fragment key={item.index}>
                    {props.dataView(item.item, item.index)}
                </Fragment>
            )}
            onScroll={handleScroll}
            ListHeaderComponent={
                <Fragment>
                    {isLoading && props.placeHolderView}
                </Fragment>
            }
            ListFooterComponent={
                <Fragment>
                    {isLoading && props.placeHolderView}
                </Fragment>}>

        </FlatList>
    );
});

export default RecycleScrollView;


// ref={scrollViewRef}
// refreshControl={
//     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
// }
// style={[props.style]}
// onScroll={handleScroll}>
// {data.map((item, index) =>
//     <Fragment key={index}>
//         {props.dataView(item, index)}
//     </Fragment>
// )}
// {isLoading && props.placeHolderView}