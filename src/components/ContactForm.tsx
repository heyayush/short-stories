import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { useState } from 'react'

/*
  ⚠️ This is an example of a contact form powered with Netlify form handling.
  Be sure to review the Netlify documentation for more information:
  https://www.netlify.com/docs/form-handling/
*/

const Form = styled.form`
  max-width: ${(props) => props.theme.sizes.maxWidthCentered};
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
    background: ${(props) => props.theme.colors.tertiary};
    color: ${(props) => props.theme.colors.text};
    border-radius: 2px;
    padding: 1em;
    &::-webkit-input-placeholder {
      color: gray;
    }
    &::-moz-placeholder {
      color: gray;
    }
    &:-ms-input-placeholder {
      color: gray;
    }
    &:-moz-placeholder {
      color: gray;
    }
    &:required {
      box-shadow: none;
    }
  }
  &::before {
    content: '';
    background: black;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    transition: 0.2s all;
    opacity: ${(props) => (props.overlay ? '.8' : '0')};
    visibility: ${(props) => (props.overlay ? 'visible' : 'hidden')};
  }
`

const Name = styled.input`
  margin: 0 0 1em 0;
  width: 100%;
  @media (min-width: ${(props) => props.theme.responsive.small}) {
    width: 49%;
  }
`

const Email = styled.input`
  margin: 0 0 1em 0;
  width: 100%;
  @media (min-width: ${(props) => props.theme.responsive.small}) {
    width: 49%;
  }
`

const Message = styled.textarea`
  width: 100%;
  margin: 0 0 1em 0;
  line-height: 1.6;
  min-height: 250px;
  resize: vertical;
`

const Submit = styled.input`
  background: ${(props) => props.theme.colors.text} !important;
  color: white !important;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: ${(props) => props.theme.colors.highlight} !important;
  }
`

const Modal = styled.div`
  background: white;
  padding: 2em;
  border-radius: 2px;
  position: fixed;
  min-width: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 99;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  transition: 0.2s all;
  @media screen and (min-width: ${(props) => props.theme.responsive.small}) {
    min-width: inherit;
    max-width: 400px;
  }
  p {
    line-height: 1.6;
    margin: 0 0 2em 0;
  }
`

const Button = styled.div`
  background: ${(props) => props.theme.colors.text};
  font-size: 1em;
  display: inline-block;
  margin: 0 auto;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  padding: 1em;
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s;
  z-index: 99;
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${(props) => props.theme.colors.highlight};
  }
`

interface WriteToSheetsPayloadI {
  formData: unknown
  spreadsheetId: string
}

interface sendEmailNotificationPayloadI {
  formData: unknown
  emailContacts: unknown
}

const ContactForm: FC = () => {
  const {
    contactFormSpreadsheetId,
    googleSheetsAPI,
    contactFormEmailAPI,
    contactFromEmailAddress,
    contactToEmailAddress,
  } = useSiteMetadata()

  const [isSubmissionInProgress, setIsSubmissionInProgress] = useState(false)
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSumbit = async (e: any) => {
    e.preventDefault()
    const value = new FormData(e.target)
    const formData = {
      name: value.get('name'),
      email: value.get('email'),
      message: value.get('message'),
    }

    setIsSubmissionInProgress(true)
    const payloadWriteToSheets = { formData: formData, spreadsheetId: contactFormSpreadsheetId }
    const payloadSendEmailNotification = {
      formData: formData,
      emailContacts: { contactFromEmailAddress, contactToEmailAddress },
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [responseWriteToSheets, responseSendEmailNotification] = await Promise.all([
        writeToSheets(payloadWriteToSheets),
        sendEmailNotification(payloadSendEmailNotification),
      ])
    } catch (error) {
      setIsSubmissionInProgress(false)
    }
    setIsSubmissionInProgress(false)
    setIsSubmissionSuccess(true)
  }

  const writeToSheets = async (payload: WriteToSheetsPayloadI) => {
    let result
    try {
      result = await fetch(googleSheetsAPI, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.error('something went wrong', error)
    }
    return result
  }

  const sendEmailNotification = async (payload: sendEmailNotificationPayloadI) => {
    let result
    try {
      result = await fetch(contactFormEmailAPI, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.error('something went wrong', error)
    }
    return result
  }

  return !isSubmissionSuccess ? (
    <Form name="contact" id="contact-form" method="POST" onSubmit={onFormSumbit}>
      <Name name="name" id="name" type="text" placeholder="Full Name" required minLength={2} maxLength={40} />
      <Email
        name="email"
        id="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="email"
        title="please enter a valid email"
      />
      <Message name="message" id="message" placeholder="Message" required minLength={5} maxLength={1200} />
      <Submit name="submit" type="submit" value="Send" disabled={isSubmissionInProgress} />
    </Form>
  ) : (
    <Modal>
      <p>Thank you for reaching out. I will get back to you as soon as possible.</p>
      <Button onClick={() => setIsSubmissionSuccess(false)}>Ok</Button>
    </Modal>
  )
}

export default ContactForm
