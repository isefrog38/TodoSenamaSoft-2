import React, {ChangeEvent, useRef, useState} from 'react';
import {
    ButtonCancel,
    ButtonSave,
    ButtonsBlock,
    Close,
    Input,
    InputWrapper,
    Modal,
    ModalTextWrapper,
    ModalWindow,
    ModalWrapper,
    WrapperTextAndClose
} from "../StylesComponents/ModalWrappers";
import {colors} from "../StylesComponents/Colors";
import {FormWrapper, TextAuthWrapper} from "../StylesComponents/AuthCardWrapper";
import {useFormik} from "formik";
import {useTypedDispatch} from "../../Redux-Store/store";
import {createTodolistTC} from "../../Thunk/Todolist-thunk";
import {Button} from "../Common/Buttons/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

type AddPackModalType = {
    setShow: (show: boolean) => void
}

export type FormikErrorType = {
    nameTask?: string
};

export const AddTaskModal = ({setShow}: AddPackModalType) => {

    const maxLengthInput = 30;
    const dispatch = useTypedDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileURL] = useState<string | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState(new Date());
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files && e.target.files[0]);
            setFileURL(window.URL.createObjectURL(e.target.files && e.target.files[0]));
        }
    };

    const closeModalClick = () => setShow(false);

    const loginForm = useFormik({
        initialValues: {nameTask: ''},
        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {};
            if (!values.nameTask) {
                errors.nameTask = "Field is required";
            }
            return errors;
        },
        onSubmit: (values) => {
            if (file && fileUrl) {
                let fileTyped = {
                    id: new Date().getTime().toString(),
                    name: file?.name,
                    type: file?.type,
                    size: file?.size,
                    lastModified: file?.lastModified,
                    path: fileUrl,
                };
                dispatch(createTodolistTC(values.nameTask, date, fileTyped));
            } else {
                dispatch(createTodolistTC(values.nameTask, date));
            }
            setShow(false);
        },
    });

    return (
        <ModalWrapper>
            <ModalWindow>
                <FormWrapper onSubmit={loginForm.handleSubmit}>
                    <Modal>
                        <WrapperTextAndClose>
                            <ModalTextWrapper>Add Task</ModalTextWrapper>
                            <Close onClick={closeModalClick}/>
                        </WrapperTextAndClose>

                        <InputWrapper>
                            <TextAuthWrapper fontSz={13} opacity={0.5} color={colors.DarkBlue}>Name
                                Pack</TextAuthWrapper>
                            <Input maxLength={maxLengthInput}
                                   type="text"
                                   id="nameTask"
                                   placeholder={"New task name"}
                                   {...loginForm.getFieldProps("nameTask")}
                            />
                        </InputWrapper>
                        <div style={{display: "flex", marginTop: "20px"}}>
                            <input type={"file"} style={{display: "none"}} ref={fileInput} onChange={onChange}/>
                            <Button bg={colors.FilterButtonColor}
                                    br={5}
                                    width={40}
                                    name={"Uploads File"}
                                    onClick={() => fileInput?.current?.click()}
                            />
                            <DatePikerDiv>
                                <DatePicker selected={date} onChange={(date: Date) => setDate(date)}/>
                            </DatePikerDiv>
                        </div>
                        <ButtonsBlock>
                            <ButtonCancel onClick={closeModalClick}>
                                Cancel
                            </ButtonCancel>
                            <ButtonSave type="submit"
                                        disabled={!loginForm.isValid}>
                                Save
                            </ButtonSave>
                        </ButtonsBlock>
                    </Modal>
                </FormWrapper>
            </ModalWindow>
        </ModalWrapper>
    );
};


const DatePikerDiv = styled.div`
    margin-left: 30px;
`