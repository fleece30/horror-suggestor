import React, {useState} from 'react';

import _noop from 'lodash/noop';

const withState = (WrappedComponent, ACTIONS, INITIAL_STATE = {}) => {
    return props => {
        const [bigDaddyState, setBigDaddyState] = useState({...INITIAL_STATE});

        const getState = () => ({...bigDaddyState});

        const setState = newState => {
            setBigDaddyState({...newState})
        };

        const onAction = (type, payload) => {
            const funcToExec = ACTIONS[type] || _noop;
            funcToExec({ type, payload }, { getState, setState });
        }

        return (<WrappedComponent
                {...props}
                {...bigDaddyState}
                onAction={onAction}
            />
        )
    };
};

export default withState;