import React, { useState } from 'react';
import { RefreshControl, ScrollView,  ScrollViewProps } from 'react-native';

interface RefreshScrollViewProps extends ScrollViewProps {
    onRefresh: () => Promise<void>;
}

const RefreshScrollView: React.FC<RefreshScrollViewProps> = ({
    onRefresh,
    children,
    ...rest
}) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await onRefresh();
        setRefreshing(false);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            {...rest}
        >
            {children}
        </ScrollView>
    );
};

export default RefreshScrollView;
