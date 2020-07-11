import React, { useState } from "react";
import Input from "antd/lib/input";

import './ContactFormComponent.scss'
import Button from "antd/lib/button";
import { Form, message } from "antd";
import { emailRegex, usernameRegex } from "../../constants/Regex";
import emailjs from 'emailjs-com';
import { defaultService, templateId, userId } from "../../constants/EmailJS";


export const ContactForm: React.FC = () => {

    const [hasUsernameError, setHasUsernameError] = useState<boolean>(false);
    const [hasEmailError, setHasEmailError] = useState<boolean>(false);
    const [firstInit, setFirstInit] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

    const onUsernameChange = (inputElement: React.ChangeEvent<HTMLInputElement>) => {
        validationCheck(inputElement.target.value, usernameRegex, setHasUsernameError, setUsername);
    }

    const onEmailChange = (inputElement: React.ChangeEvent<HTMLInputElement>) => {
        validationCheck(inputElement.target.value, emailRegex, setHasEmailError, setEmail);
    }

    const validationCheck = (value: string, regex: RegExp, setHook: Function, setUserValue: Function) => {
        if (firstInit) {
            setFirstInit(false)
        }
        if (!value) {
            setHook(true)
            setUserValue('');
        } else if (regex.test(value)) {
            setUserValue(value);
            setHook(false);
        } else {
            setUserValue(value);
            setHook(true);
        }
    }


    const submitForm = (e: any) => {
        e.preventDefault();

        if (firstInit) {
            setHasUsernameError(true);
            setHasEmailError(true);
            return;
        } else if (!firstInit && (hasEmailError || hasUsernameError)) { return; }

        setButtonDisabled(true)
        emailjs.sendForm(defaultService, templateId, e.target, userId)
            .then(message.loading('Wysyłanie wiadomości...'))
            .then(() => {
                message.success('Wysłane!', 10)
                setButtonDisabled(false)
            }, () => {
                message.error('Coś poszło nie tak. Spróbuj ponownie', 10)
                setButtonDisabled(false)
            });
    }

    return (
        <div className="contactForm">
            <div className="form">
                <Form id="contact-form" onSubmit={submitForm}>
                    <Form.Item label="Imię i nazwisko"
                               validateStatus={hasUsernameError ? 'error' : 'success'}
                               help={hasUsernameError ? 'To pole musi być wypełnione' : ''}
                               required={true}
                    >
                        <Input
                            name="username"
                            value={username}
                            onChange={onUsernameChange}/>
                    </Form.Item>
                    <Form.Item label="E-mail"
                               validateStatus={hasEmailError ? 'error' : 'success'}
                               help={hasEmailError ? 'Podaj proszę poprawny adres email' : ''}
                               required={true}>
                        <Input
                            name="userEmail"
                            value={email}
                            onChange={onEmailChange}/>
                    </Form.Item>
                    <Form.Item className="text-area" label="Napisz do nas">
                        <Input.TextArea
                            name="userMessage"/>
                    </Form.Item>
                    <Form.Item className="submitButton">
                        <Button type="primary" htmlType="submit" disabled={buttonDisabled}>
                            Wyślij
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ContactForm;