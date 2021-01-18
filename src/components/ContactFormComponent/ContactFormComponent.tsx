import { Form, message } from 'antd'
import Button from 'antd/lib/button'
import { Store } from 'antd/lib/form/interface'
import Input from 'antd/lib/input'
import emailjs from 'emailjs-com'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { defaultService, templateId, userId } from '../../constants/EmailJS'
import { emailRegex, usernameRegex } from '../../constants/Regex'

import './ContactFormComponent.scss'

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
  const { t } = useTranslation()
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const submitForm = (values: Store): void => {
    setButtonDisabled(true)

    emailjs
      .send(defaultService, templateId, values, userId)
      .then(message.loading(`${t('ContactFormSendingMessage')}`))
      .then(
        () => {
          message.success(`${t('ContactFormMessageSent')}`, 10)
        },
        () => {
          message.error(`${t('ContactFormMessageError')}`, 10)
        },
      )
      .finally(() => setButtonDisabled(false))
  }

  return (
    <div className="form">
      <Form name="contactForm" id="contact-form" onFinish={submitForm} layout="vertical">
        <Form.Item
          label={t('ContactFormUsername')}
          name="username"
          hasFeedback
          rules={[
            { required: true, message: `${t('ContactFormRequiredField')}` },
            { pattern: usernameRegex, message: `${t('ContactFormRegexUsername')}` },
            { min: 5, message: `${t('ContactFormRegexUsername')}` },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('ContactFormEmail')}
          name="userEmail"
          hasFeedback
          rules={[
            { required: true, message: `${t('ContactFormRequiredField')}` },
            { pattern: emailRegex, message: `${t('ContactFormRegexEmail')}` },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="text-area"
          label={t('ContactFormMessage')}
          name="userMessage"
          hasFeedback
          rules={[
            { required: true, message: `${t('ContactFormRequiredField')}` },
            { min: 20, message: `${t('ContactFormRegexMessage')}` },
            { max: 500, message: `${t('ContactFormRegexMessage')}` },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item className="submitButton">
          <Button type="primary" size="large" htmlType="submit" disabled={buttonDisabled} className="cc-btn--gradient">
            <span>{t('ContactFormSendButton')}</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactForm
