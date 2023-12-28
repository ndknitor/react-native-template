import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { AuthorizeContext } from './AuthorizeContextProvider';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
function NonAuthorize(props : PropsWithChildren) {
    const { authenticated, initLoading, forbidden } = useContext(AuthorizeContext);
    const { replace } = useNavigation<StackNavigationProp<ParamListBase>>();
    useEffect(() => {
        if (!initLoading) {
            if (authenticated) {
                replace(forbidden)
            }
        }
    }, [initLoading]);
    return (
        !initLoading ?
            authenticated ?
                null
                :
                <>{props.children}</>
            :
            null
    )
}

export default NonAuthorize