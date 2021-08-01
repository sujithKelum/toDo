
import { GETTASK } from './toDo.types';

const INITIAL_STATE = {
    data:{},
};


const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GETTASK:
            return {
                ...state, data:state.data,
            };

        default: return state;
    }
};

export default reducer;