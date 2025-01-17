import React, {useState} from "react";
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from "wouter";
import { useFlashMessage } from "./FlashMessageStore";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);



  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    salutation: '',
    marketingPreferences: [],
    country: ''
  };

  const {showMessage} = useFlashMessage();

  const handleSubmit = async (values, formikHelpers) => {
   try {
    // const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, values);
    // console.log('Registeration successful:', response.data);
    showMessage('Registration successful:', 'success');

   } catch (error) {
    // console.log('Registeration failed:', error.response?.data || error.message);
    showMessage('Registeration failed', 'error');

   } finally {
    formikHelpers.setSubmitting(false);
    setLocation('/');
    console.log(values)
   }
  };

  const formValidationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    email: Yup.string().email('Invalid email').required("email is required"),
    password: Yup.string().min(8, 'password must be contain 8 char').required('password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwords must match' ).required("confrim password is required"),
    salutation: Yup.string().required('salutation is required'),
    country: Yup.string().required('country is required')
  });
  return (
    
      <div className="container mt-5">
        <h1 className="text-center">Register</h1>

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formValidationSchema}>
          {(formik) => (
              <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field type="text" id="name" className="form-control" name="name" />
                {formik.errors.name && formik.touched.name ? <div className="text-danger">{formik.errors.name}</div> : null}
              </div>
    
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" className="form-control" name="email"/>
                {formik.errors.email && formik.touched.email ? <div className="text-danger">{formik.errors.email}</div> : null}

              </div>
    
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" id="password" className="form-control" name="password"/>
                {formik.errors.password && formik.touched.password ? <div className="text-danger">{formik.errors.password}</div> : null}
              </div>
    
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <Field type="password" id="confirmPassword" className="form-control" name="confirmPassword" />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="text-danger">{formik.errors.confirmPassword}</div> : null}

              </div>
    
              <div className="mb-3">
                <label className="form-label">Salutation</label>
                <div>
                  <div className="form-check form-check-inline">
                    <Field className="form-check-input" type="radio" name="salutation" id="mr" value="Mr"/>
                    <label htmlFor="mr" className="form-check-label">Mr</label>
                  </div>
    
                  <div class="form-check form-check-inline">
                    <Field className="form-check-input" type="radio" name="salutation" id="ms" value="Ms"/>
                    <label htmlFor="ms" className="form-check-label">Ms</label>
                  </div>
    
                  <div class="form-check form-check-inline">
                    <Field className="form-check-input" type="radio" name="salutation" id="mrs" value="Mrs"/>
                    <label htmlFor="mrs" className="form-check-label">Mrs</label>
                  </div>
                </div>
                {formik.errors.salutation && formik.touched.salutation ? <div className="text-danger">{formik.errors.salutation}</div> : null}

              </div>
    
              <div className="mb-3">
                <label className="form-label">Marketing Perferences</label>
                <div className="form-check">
                  <Field className="form-check-input" id="emailMarketing" value="email" type="checkbox" name="marketingPreferences" />
                  <label className="form-check-label" htmlFor="emailMarketing">Email Marketing</label>
                </div>
    
                <div className="form-check">
                  <Field className="form-check-input" id="SmsMarketing" value="sms" type="checkbox" name="marketingPreferences" />
                  <label className="form-check-label" htmlFor="smsMarketing">SMS Marketing</label>
                </div>
              </div>
    
              <div className="mb-3">
                <label className="form-label" htmlFor="country">Country</label>
                <Field as="select" className="form-select" id="country" name="country">
                  <option value="">Select Country</option>
                  <option value="in">India</option>
                  <option value="sg">Singapore</option>
                  <option value="my">Malaysia</option>
                  <option value="th">Thailand</option>
                </Field>
                {formik.errors.country && formik.touched.country ? <div className="text-danger">{formik.errors.country}</div> : null}

              </div>
    
              <div className="mb-3">
              <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Register</button>
              </div>
            </Form>
          )}
        </Formik>
        
      </div>
  );
}
