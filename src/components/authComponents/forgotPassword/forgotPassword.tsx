import React from 'react';
import {useFormik} from "formik";
import {NavLink, useNavigate} from "react-router-dom";
import {useTypedDispatch} from '../../../reduxStore/store';
import {
    CardWrapper,
    ErrorWrapper,
    FormWrapper,
    TextAuthWrapper,
    TitleAuthWrapper
} from '../../stylesComponents/taskWrapper';
import {Input} from '../../stylesComponents/modalWrappers';
import {Button} from '../../stylesComponents/button';
import {colors} from '../../stylesComponents/colors';
import {PATH} from '../../../utilsFunction/enumPath';
import {ButtonHovered} from "../login/login";
import {ForgetPasswordTC} from "../../../thunk/commonThunk";


export const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useTypedDispatch();

    const ForgotPassword = useFormik({
        initialValues: {email: ""},
        validate: (values: { email: string }) => {
            const errors: { email?: string } = {};
            if (!values.email) {
                errors.email = "Field is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(ForgetPasswordTC(values.email, navigate));
            ForgotPassword.resetForm();
        },
    });
    return (
        <CardWrapper width={413} height={540}>
            <TitleAuthWrapper fontSz={26}>SenamaSoft</TitleAuthWrapper>
            <TitleAuthWrapper fontSz={22}>Forgot your password?</TitleAuthWrapper>
            <FormWrapper height={200} onSubmit={ForgotPassword.handleSubmit}>

                <Input type="email"
                       id="email"
                       placeholder="email"
                       {...ForgotPassword.getFieldProps("email")}/>
                {ForgotPassword.touched.email && ForgotPassword.errors.email ? (
                    <ErrorWrapper>{ForgotPassword.errors.email}</ErrorWrapper>
                ) : null}

                <TextAuthWrapper opacity={0.5} color={colors.DarkBlue} fontSz={16}>
                    Enter your email address and we will send you further instructions</TextAuthWrapper>

                <Button type={'submit'}
                        disabled={!(ForgotPassword.isValid && ForgotPassword.dirty)}
                        bgColor={colors.Blue} width={266} height={36} color={colors.Lavender}>
                    Send Instructions</Button>

            </FormWrapper>
            <TextAuthWrapper textAlign='center' opacity={0.5} color={colors.DarkBlue} fontSz={16}>
                Did you remember your password?</TextAuthWrapper>

            <TitleAuthWrapper fontSz={16} color={colors.Blue}>
                <ButtonHovered>
                    <NavLink to={PATH.login}>Try logging in</NavLink>
                </ButtonHovered>
            </TitleAuthWrapper>
        </CardWrapper>
    )
}
