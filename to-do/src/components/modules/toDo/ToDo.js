import React, { useState, useEffect } from 'react';

import { connect } from "react-redux"
import { callApi } from '../../../helpers/callApi';
import {
    getTask,
} from "../../../redux/ToDo/toDo.actions"
import { InputText } from '../../ui-components/elements/form/InputBox';
import { UICard } from "../../ui-components/elements/UiCard"
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
//import AddForm from './includes/AddForm';

let data = [];

const ToDo = (props) => {

    useEffect(() => {
        getInitialData();
    }, []);


    const getInitialData = () => {
        callApi('http://localhost:8080/api/toDo')
            .method('get')
            .send((err, result) => {
                if (!err) {
                    data = result.data.data;
                    props.getTask()
                }
            })
    }

    const remove = (id) => {
        callApi(`http://localhost:8080/api/toDo/${id}`)
            .method('delete')
            .send((err, result) => {
                if (!err) {
                    console.log("deleted", id);
                    getInitialData();
                }
            })
    }


    const done = (id) => {
        callApi(`http://localhost:8080/api/toDo/${id}`)
            .method('patch')
            .body({
                "complete": true,
            })
            .send((err, result) => {
                if (!err) {
                    getInitialData();
                    console.log("edited");
                }
            })
    };

    const AddForm = () => {
        const [formData, setFormData] = useState([]);
        const saveData = () => {
            let date = null;
            if (formData.endDate) {
                 date = new Date(formData.endDate).toUTCString();
            }

            callApi('http://localhost:8080/api/toDo')
                .method('post')
                .body({
                    "name": formData.todo,
                    "complete": false,
                    "status": true,
                    "end_date": date
                })
                .send((err, result) => {
                    if (!err) {
                        getInitialData();
                        console.log("added");
                    }
                })
        };

        const onChangeInput = (eventData) => {
            setFormData({ ...formData,[eventData.name]: eventData.value })
        };
        return (
            <div>
                <div className={"inputSize floatLeft"}>
                    <InputText
                        lableText="Add To Do"
                        required={true}
                        inputPlaceholder="Enter To Do"
                        inputValue={formData.todo}
                        inputName='todo'
                        inputType="text"
                        onChangeTxt={onChangeInput}
                    />
                </div>
                <div className={"inputSize floatLeft paddingLeft"}>
                    <InputText
                        lableText="End Date"
                        required={true}
                        inputPlaceholder="2021,07,01"
                        inputValue={formData.endDate}
                        inputName='endDate'
                        inputType="text"
                        onChangeTxt={onChangeInput}
                    />
                </div>

                <div className={"defaultPadding"}>
                    <button onClick={() => saveData()}>Add</button>
                </div>

            </div>



        )
    }

    return (
        <div className='todo'>
            <div className={"defaultPadding"}>
                <AddForm {...props} />
            </div>

            {
                props.data.length > 0 ? (
                    props.data.map((todo) => {
                        return (
                            <div>
                                <UICard
                                    elementStyle="defaultMarginTopBottom"
                                >
                                    <div>
                                        {todo.name} <DeleteIcon className={"floatRight"} onClick={() => remove(todo.id)} /><DoneIcon className={"floatRight"} onClick={() => done(todo.id)} />
                                    </div>
                                </UICard>
                            </div>
                        )
                    })
                ) : (
                    <p>You are to do items that are empty.</p>
                )
            }
        </div >
    )
}

const mapStateToProps = state => {
    return {
        data: data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTask: () => dispatch(getTask()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDo);