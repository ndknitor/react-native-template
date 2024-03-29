import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Modal, Pressable, View } from 'react-native';
import { ActivityIndicator, TextInput, Text, TouchableRipple, HelperText } from 'react-native-paper';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { useAsyncEffect, useDebounceState } from 'ndknitor-ts/hooks';
interface Option<T> {
    label: string;
    value: T;
}
export interface AutoCompleteFetchResponse<T> {
    options: Option<T>[];
    hasMore: boolean;
}

interface FetchAutoCompleteProps<T> {
    value?: T;
    fetch: (query: string, page: number) => Promise<AutoCompleteFetchResponse<T>>;
    placeholder?: string;
    onChange?: (selectedOption: Option<T> | null) => void;
    debounce?: number;
    keyExtractor?: ((item: Option<T>, index: number) => string) | undefined;
    helperText?: string;
    error?: boolean;
}

function FetchAutoComplete<T>(props: FetchAutoCompleteProps<T>) {
    const [options, setOptions] = useState<Option<T>[]>([]);
    const [loading, setLoading] = useState(false);
    const [label, setLabel] = useState("");
    const hasMore = useRef(true);

    const [inputValue, inputDebounce, setInputValue] = useDebounceState("", props.debounce || 750);
    const [page, pageDebounce, setPage] = useDebounceState(1, 50);

    const opacity = useRef(new Animated.Value(0));
    const y = useRef(new Animated.Value(24));

    const dataOpacity = useRef(new Animated.Value(0));
    const dataY = useRef(new Animated.Value(24));

    const [isModalVisible, setModalVisible] = useState(false);

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
        props.onChange && props.onChange(item);
        setModalVisible(false); // Hide the modal when an item is selected
        animation.start();
    };
    const handleCancel = () => {
        animation.reset();
        setTimeout(() => setLabel(""), 100);
        props.onChange && props.onChange(null);
        animation.start();
    }
    const openModal = () => {
        dataAnimation.reset();
        dataAnimation.start();
        setModalVisible(true);
    }

    const fetchData = async () => {
        setLoading(true);
        const response = await props.fetch(inputValue, page);
        if (page === 1) {
            dataAnimation.reset();
            setOptions(response.options);
        } else {
            setOptions((prevOptions) => [...prevOptions, ...response.options]);
        }
        setTimeout(() => { }, 100);
        if (page == 1) {
            dataAnimation.start();
        }
        hasMore.current = response.hasMore;
        setLoading(false);
    }

    useAsyncEffect(async () => {
        await fetchData();
    }, [inputDebounce, props.fetch, pageDebounce]);
    useEffect(() => {
        if (props.value) {
            setLabel(options.find(o => o.value === props.value)?.label || "");
        }
        animation.reset();
        animation.start();
    }, [props.value, fetchData, animation, dataAnimation]);

    return (
        <>
            <TouchableRipple style={{ borderWidth: 2, width: "100%", height: 40, borderRadius: 8, borderColor: "gray" }} onPress={openModal}>
                <Animated.View style={{ marginTop: y.current, opacity: opacity.current }}>
                    <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
                        <View style={{ width: "88%", height: "100%", justifyContent: "center", paddingLeft: 10 }}>
                            <Text style={{ color: label != "" ? "black" : "gray", fontSize: 16 }} >{label || props.placeholder}</Text>
                        </View>
                        <View style={{ width: 60, height: "100%", alignItems: "center", justifyContent: "center" }}>
                            {label === "" ? <ArrowDown width={30} height={30} /> : <Clear width={20} height={20} onPress={handleCancel} />}
                        </View>
                    </View>
                </Animated.View>
            </TouchableRipple>
            <View style={{ width: "100%" }}>
                <HelperText visible={props.helperText !== undefined || props.helperText !== ""} type={props.error ? "error" : "info"} >{props.helperText}</HelperText>
            </View>
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
                                <View style={{ width: "90%", justifyContent: "center" }}>
                                    <TextInput
                                        onSubmitEditing={() => handleInputChange(inputValue)}
                                        label={props.placeholder}
                                        value={inputValue}
                                        onChangeText={handleInputChange}
                                        mode='outlined'
                                        style={{ width: "100%", backgroundColor: "transparent" }} />
                                    <View style={{ position: "absolute", zIndex: 1, right: 10 }}>
                                        {
                                            inputDebounce == inputValue && inputValue !== "" ?
                                                (
                                                    <TouchableRipple onPress={() => setInputValue("")} >
                                                        <Clear width={18} height={18} />
                                                    </TouchableRipple>
                                                )
                                                :
                                                (
                                                    <TouchableRipple>
                                                        <Search width={18} height={18} />
                                                    </TouchableRipple>
                                                )
                                        }
                                    </View>
                                </View>
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
            </Modal >
        </>
    );
}

function Clear(props: SvgProps) {
    return (
        <Svg
            viewBox="0 0 50 50"
            {...props}
        >
            <Path d="M7.719 6.281L6.28 7.72 23.563 25 6.28 42.281 7.72 43.72 25 26.437 42.281 43.72l1.438-1.438L26.437 25 43.72 7.719 42.28 6.28 25 23.563z" />
        </Svg>
    )
}

function Exit(props: SvgProps) {
    return (
        <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={24}
            fill={"red"}
            strokeWidth={0.1}
            {...props}
        >
            <Path d="M336-307.692l144-144 144 144L652.308-336l-144-144 144-144L624-652.308l-144 144-144-144L307.692-624l144 144-144 144L336-307.692zM480.134-120q-74.673 0-140.41-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120-405.194 120-479.866q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194-840 479.866-840q74.673 0 140.41 28.339 65.737 28.34 114.365 76.922 48.627 48.582 76.993 114.257Q840-554.806 840-480.134q0 74.673-28.339 140.41-28.34 65.737-76.922 114.365-48.582 48.627-114.257 76.993Q554.806-120 480.134-120zM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93zm0-320z" />
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

function Search(props: SvgProps) {
    return (
        <Svg
            height={24}
            viewBox="0 -960 960 960"
            width={24}
            {...props}
        >
            <Path d="M784-120L532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56zM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400z" />
        </Svg>
    )
}

export default FetchAutoComplete;