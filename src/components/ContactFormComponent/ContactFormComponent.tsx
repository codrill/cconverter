import React, {useState} from "react";
import Input from "antd/lib/input";

import './ContactFormComponent.scss'
import Button from "antd/lib/button";
import {Form, message} from "antd";
import {emailRegex, usernameRegex} from "../../constants/Regex";
import emailjs from 'emailjs-com';
import {defaultService, templateId, userId} from "../../constants/EmailJS";
import {Store} from "antd/lib/form/interface";


// Not used because for now there is no way to parametrize AntD form values.
// ISSUES:
// https://github.com/ant-design/ant-design/issues/21195
// https://github.com/react-component/field-form/issues/70
type FormValues = {
  username: string
  userEmail: string
  userMessage: string
}

export const ContactForm: React.FC = () => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)


  const submitForm = (values: Store): void => {
    setButtonDisabled(true)

    emailjs.send(defaultService, templateId, values, userId)
      .then(message.loading('Wysyłanie wiadomości...'))
      .then(() => {
        message.success('Wysłane!', 10)
      }, () => {
        message.error('Coś poszło nie tak. Spróbuj ponownie', 10)
      }).finally(() => setButtonDisabled(false));
  }

  return (
    <div className="form">
      <Form name="contactForm" id="contact-form" onFinish={submitForm} layout="vertical">
        <Form.Item label="Imię i nazwisko" name="username" hasFeedback rules={[
          {required: true, message: 'To pole musi być wypełnione'},
          {pattern: usernameRegex, message: 'Podaj proszę poprawne imię i nazwisko'},
          {min: 5, message: 'Podaj proszę poprawne imię i nazwisko'}
        ]}>
          <Input/>
        </Form.Item>
        <Form.Item label="E-mail" name="userEmail" hasFeedback rules={[
          {required: true, message: 'To pole musi być wypełnione'},
          {pattern: emailRegex, message: 'Podaj proszę poprawny adres email'}
        ]}>
          <Input/>
        </Form.Item>
        <Form.Item className="text-area" label="Napisz do nas" name="userMessage" hasFeedback rules={[
          {required: true, message: 'To pole musi być wypełnione'},
          {min: 20, message: 'Wiadomość powinna zawierać od 20 do 500 znaków'},
          {max: 500, message: 'Wiadomość powinna zawierać od 20 do 500 znaków'}
        ]}>
          <Input.TextArea autoSize={{minRows: 7, maxRows: 7}}/>
        </Form.Item>
        <Form.Item className="submitButton">
          <Button type="primary" htmlType="submit" disabled={buttonDisabled}>
            Wyślij
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactForm;