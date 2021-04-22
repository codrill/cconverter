import { Form, message } from 'antd'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import emailjs from 'emailjs-com'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { defaultService, templateId, userId } from '../../constants/emailJS'
import { emailRegex, usernameRegex } from '../../constants/regex'

import './contactForm.scss'

type FormValues = {
  username: string
  userEmail: string
  userMessage: string
}

type ContactFormProps = {
  onMessageSent: (isSent: boolean) => void
}

export const ContactForm: React.FC<ContactFormProps> = ({ onMessageSent }) => {
  const { t } = useTranslation()
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const submitForm = (values: FormValues): void => {
    setButtonDisabled(true)

    emailjs
      .send(defaultService, templateId, values, userId)
      .then(message.loading(`${t('ContactFormSendingMessage')}`))
      .then(
        () => {
          message.success(`${t('ContactFormMessageSent')}`, 10)
          onMessageSent(true)
        },
        () => {
          message.error(`${t('ContactFormMessageError')}`, 10)
        },
      )
      .finally(() => setButtonDisabled(false))
  }

  return (
    <>
      <h1>{t('ContactFormHeader')}</h1>
      <div className="form">
        <Form<FormValues> name="contactForm" id="contact-form" onFinish={submitForm} layout="vertical">
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
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={buttonDisabled}
              className="cc-btn--gradient"
            >
              <span>{t('ContactFormSendButton')}</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
