import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { AuthorizeContext } from './AuthorizeContextProvider';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
interface Props extends PropsWithChildren {
    roles?: string[];
}
function Authorize(props: Props) {
    const { replace } = useNavigation<StackNavigationProp<ParamListBase>>();
    const { authenticated, roles, initLoading, forbidden, unauthorized } = useContext(AuthorizeContext);
    const isInRole = () => {
        if (!props.roles) {
            return true;
        }
        for (let i = 0; i < roles.length; i++) {
            const element = roles[i];
            if (props.roles.includes(element)) {
                return true;
            }
        }
        return false;
    }
    useEffect(() => {
        if (initLoading) {
            return;
        }
        if (!authenticated) {
            replace(unauthorized);
            return;
        }
        if (!isInRole()) {
            replace(forbidden);
            return;
        }
    }, [initLoading])
    return (
        !initLoading ?
            authenticated ?
                isInRole() ?
                    <>{props.children}</>
                    :
                    null
                :
                null
            :
            null
    )
}

export default Authorize