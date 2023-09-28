import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Modal, Pressable, View } from 'react-native';
import { ActivityIndicator, TextInput, Text, TouchableRipple } from 'react-native-paper';
import { useDebounce } from 'usehooks-ts'
import { useAsyncEffect } from 'use-async-effect';
import Svg, { Path, SvgProps } from 'react-native-svg';
interface Option<T> {
    label: string;
    value: T;
}
export interface AutoCompleteFetchResponse<T> {
    options: Option<T>[];
    hasMore: boolean;
}

interface FetchAutoCompleteProps<T> {
    fetch: (query: string, page: number) => Promise<AutoCompleteFetchResponse<T>>;
    placeholder: string;
    onChange: (selectedOption: Option<T> | null) => void;
    debounce?: number | 600;
    keyExtractor?: ((item: Option<T>, index: number) => string) | undefined
}

function FetchAutoComplete<T>(props: FetchAutoCompleteProps<T>) {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<Option<T>[]>([]);
    const [loading, setLoading] = useState(false);
    const [label, setLabel] = useState("");
    const [page, setPage] = useState(1);
    const hasMore = useRef(true);

    const inputDebounce = useDebounce(inputValue, 600);
    const pageDebounce = useDebounce(page, 600);

    const opacity = useRef(new Animated.Value(0));
    const y = useRef(new Animated.Value(24));

    const dataOpacity = useRef(new Animated.Value(0));
    const dataY = useRef(new Animated.Value(24));

    const [isModalVisible, setModalVisible] = useState(false);

    useAsyncEffect(async () => {
        await fetchData();
    }, [inputDebounce, props.fetch, pageDebounce]);
    useEffect(() => {
        animation.start();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const response = await props.fetch(inputValue, page);
        dataAnimation.reset();
        if (page === 1) {
            setOptions(response.options);
        } else {
            setOptions((prevOptions) => [...prevOptions, ...response.options]);
        }
        setTimeout(() => { }, 100);
        dataAnimation.start();
        hasMore.current = response.hasMore;
        setLoading(false);
    }

    const animation = Animated.parallel([
        Animated.timing(opacity.current, {
            toValue: 1,
            duration: 600, // You can use FadeInDown.duration(600) if it's a predefined animation
            useNativeDriver: false, // Set this to true if possible for performance improvements
        }),
        Animated.timing(y.current, {
            toValue: 1,
            duration: 600, // You can use FadeInDown.duration(600) if it's a predefined animation
            useNativeDriver: false, // Set this to true if possible for performance improvements
        }),
    ]);

    const dataAnimation = Animated.parallel([
        Animated.timing(dataOpacity.current, {
            toValue: 1,
            delay: 100,
            duration: 600, // You can use FadeInDown.duration(600) if it's a predefined animation
            useNativeDriver: false, // Set this to true if possible for performance improvements
        }),
        Animated.timing(dataY.current, {
            toValue: 0,
            delay: 100,
            duration: 600, // You can use FadeInDown.duration(600) if it's a predefined animation
            useNativeDriver: false, // Set this to true if possible for performance improvements
        }),
    ]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        setPage(1); // Reset page when input value changes
        hasMore.current = true; // Reset the hasMore flag
        setModalVisible(true); // Show the modal when the input changes
    };

    const handleEndReached = () => {
        if (!loading && hasMore.current) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleItemPress = (item: Option<T>) => {
        animation.reset();
        setLabel(item.label);
        props.onChange(item);
        setModalVisible(false); // Hide the modal when an item is selected
        animation.start();
    };
    const handleCancel = () => {
        animation.reset();
        setTimeout(() => setLabel(""), 100);
        props.onChange(null);
        animation.start();
    }

    return (
        <>
            <TouchableRipple style={{ borderWidth: 2, width: "100%", height: 40, borderRadius: 8, borderColor: "gray" }} onPress={() => { dataAnimation.reset(); dataAnimation.start(); setModalVisible(true); }}>
                <Animated.View style={{ marginTop: y.current, opacity: opacity.current }}>
                    <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
                        <View style={{ width: "88%", height: "100%", justifyContent: "center", paddingLeft: 10 }}>
                            <Text style={{ color: label != "" ? "black" : "gray", fontSize: 16 }} >{label || props.placeholder}</Text>
                        </View>
                        <View style={{ width: 60, height: "100%", alignItems: "center", justifyContent: "center" }}>
                            {label === "" ? <ArrowDown width={30} height={30} /> : <Exit width={24} height={24} onPress={handleCancel} />}
                        </View>
                    </View>
                </Animated.View>
            </TouchableRipple>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <Pressable onPress={() => setModalVisible(false)} style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
                    <View style={{ width: "90%", height: "90%", backgroundColor: "white", borderRadius: 8, elevation: 12 }}>
                        <View style={{ width: "95%", height: 50, alignItems: "flex-end", justifyContent: "center" }}>
                            <Exit style={{ width: 25, height: 25 }} onPress={() => setModalVisible(false)} />
                        </View>
                        <View style={{ flex: 1, overflow: "hidden" }}>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <TextInput
                                    onSubmitEditing={() => handleInputChange(inputValue)}
                                    label={props.placeholder}
                                    value={inputValue}
                                    onChangeText={handleInputChange}
                                    mode='outlined'
                                    style={{ width: "90%", backgroundColor: "transparent" }}
                                />
                            </View>
                            <Animated.View style={{ paddingTop: dataY.current, opacity: dataOpacity.current }}>
                                <Pressable style={{ display: loading ? "flex" : "none", width: "100%", height: "100%", position: "absolute", backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <ActivityIndicator size={60} />
                                </Pressable>
                                <FlatList
                                    style={{ height: "90%" }}
                                    data={options}
                                    keyExtractor={props.keyExtractor == undefined ? props.keyExtractor : (item) => item.label}
                                    renderItem={({ item }) => (
                                        <TouchableRipple onPress={() => handleItemPress(item)}>
                                            <View style={{ width: "100%", alignItems: "center" }}>
                                                <View style={{ width: "90%", height: 48, alignItems: "center", justifyContent: "center", borderBottomWidth: 0.5, borderBottomColor: "gray" }}>
                                                    <Text style={{ fontSize: 18 }}>{item.label}</Text>
                                                </View>
                                            </View>
                                        </TouchableRipple>
                                    )}
                                    onEndReached={handleEndReached}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={() =>
                                        loading ? <ActivityIndicator size="small" color="blue" /> : null
                                    }
                                />
                            </Animated.View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

function Exit(props: SvgProps) {
    return (
        <Svg
            viewBox="0 0 50 50"
            {...props}
        >
            <Path d="M7.719 6.281L6.28 7.72 23.563 25 6.28 42.281 7.72 43.72 25 26.437 42.281 43.72l1.438-1.438L26.437 25 43.72 7.719 42.28 6.28 25 23.563z" />
        </Svg>
    )
}

function ArrowDown(props: SvgProps) {
    return (
        <Svg
            height={24}
            viewBox="0 0 24 24"
            width={24}
            {...props}
        >
            <Path d="M0 0h24v24H0z" fill="none" />
            <Path d="M7 10l5 5 5-5z" />
        </Svg>
    )
}

export default FetchAutoComplete;