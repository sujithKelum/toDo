import React, { useState } from 'react';

import { InputText } from '../../../ui-components/elements/form/InputBox';
import { callApi } from '../../../../helpers/callApi';

const AddForm = (props) => {

    console.log('kkkkkkkkkkkkkkkkkkkklllllllllllll',props);
    const [formData, setFormData] = useState([]);

    const saveData = () => {
        callApi('http://localhost:8080/api/toDo')
            .method('post')
            .body({
                "name": formData.todo,
                "complete": false,
                "status": true
            })
            .send((err, result) => {
                if (!err) {
                    props.getTask()
                    console.log("added");
                }
            })
    };

    const onChangeInput = (eventData) => {
        setFormData({ [eventData.name]: eventData.value })
    };
    return (
        <div>
            <InputText
                lableText="Add To Do"
                required={true}
                inputPlaceholder="Enter To Do"
                inputValue={formData.todo}
                inputName='todo'
                inputType="text"
                onChangeTxt={onChangeInput}
            />
            <button onClick={() => saveData()}>Add</button>
        </div>
    )
}


export default AddForm;