import React from 'react'
import './App.css';
import { useFormik } from 'formik';
import { object, string, number, date, InferType, ref, ValidationError, boolean } from 'yup';

function App() {
  const { handleSubmit, handleChange, values, errors, touched, handleBlur, handleReset, dirty, isSubmitting } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      agree: 'false',
      favoriteColor: "",
    },
    validationSchema:
      object({
        firstName: string().required("name field can't be left blank"),
        lastName: string().required("surname field can't be left blank"),
        email: string().email().required("email field can't be left blank"),
        favoriteColor: string().required("come on! everybody has an interest of one of the sports").oneOf(["football", "basketball", "tennis"]),
        agree: boolean().oneOf([true], "you must accept the conditions"),
      }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values); setTimeout(() => { resetForm() }, 2000)
    }
  })


  return (
    <div className='container'>

      <div className='brand-box'>
        <h1>Magic Form</h1>
        <p>Please choose the sport you are interested in</p>
      </div>

      <div className='magic-form'>
        <form onSubmit={handleSubmit}>

          <h3>Sign Up</h3>

          <label htmlFor='firstName'>Name</label>
          <input id='firstName' type="text" placeholder="Uygar" className="input" value={values.firstName} onChange={handleChange} ></input>

          {errors.firstName && touched.firstName && (
            <div className='input-feedback'>{errors.firstName} </div>
          )}

          <label htmlFor='lastName'>Surname</label>
          <input id='lastName' type="text" placeholder="Süslü" className="input" value={values.lastName} onChange={handleChange} ></input>

          {errors.lastName && touched.lastName && (
            <div className='input-feedback'>{errors.lastName} </div>
          )}

          <label htmlFor='email'>Email</label>
          <input id='email' type="email" placeholder="uygarsuslu@gmail.com" className="input" value={values.email} onChange={handleChange} ></input>

          {errors.email && touched.email && (
            <div className='input-feedback'>{errors.email} </div>
          )}

          <label htmlFor='favoriteColor'>Sports</label> <br />
          <select id='favoriteColor' value={values.favoriteColor} onChange={handleChange} style={{
            marginTop: 10,
            width: "130px",
            height: "6%",
            padding: "5px 10px",
            outline: "none",
            borderRadius: "8px",
          }}>
            <option value="" label='Choose Sport'></option>
            <option value="football" label='Football'></option>
            <option value="basketball" label='Basketball'></option>
            <option value="tennis" label='Tennis'></option>
          </select>

          {errors.favoriteColor && touched.favoriteColor && (
            <div className='input-feedback'>{errors.favoriteColor} </div>
          )}

          <div className='checkbox topMargin'>
            <input id='agree' type="checkbox" value={values.agree} onChange={handleChange}></input>
            <label htmlFor='agree' className='checkbox-label'>I have read the contract, I accept it.</label>
          </div>

          {errors.agree && touched.agree && (
            <div className='input-feedback'>{errors.agree} </div>
          )}

          <button type='submit' disabled={!dirty || isSubmitting}> Register </button>

        </form>
      </div>

    </div >
  )
}

export default App;