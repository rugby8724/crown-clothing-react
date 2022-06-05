import { useState} from 'react'

import FormInput from '../form-input/form-input'
import Button from '../button/button'

import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase'

import './sign-up-form.scss'


const defaultFormFields= {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}


  

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(password !== confirmPassword){
      alert('passwords do not match')
      return
    }
    
    try{
      const {user} = await createAuthUserWithEmailandPassword(email, password)
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()
    } catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use')
      }else{
        console.log('user creation encountered and error', error)
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    //spread on previous fields, update specific field
    setFormFields({...formFields, [name]: value})

  }

  return(
    <div className='sign-up-container'>
      <h2>Don't have an account</h2>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text' 
          required onChange={handleChange} 
          name='displayName' 
          value={displayName} 
        />

        <FormInput
          label='Email'
          type='text' 
          required onChange={handleChange} 
          name='email' 
          value={email} 
        />

        <FormInput
          label='Password'
          type='text' 
          required onChange={handleChange} 
          name='password' 
          value={password} 
        />

        <FormInput
          label='Confirm Password'
          type='text' 
          required onChange={handleChange} 
          name='confirmPassword' 
          value={confirmPassword} 
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm