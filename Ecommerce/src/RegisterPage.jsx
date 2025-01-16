import React from "react";
import {Formik, Field, Form} from 'formik';

export default function RegisterPage() {

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    salutation: '',
    marketingPreferences: [],
    country: ''
  };


  const handleSubmit = (values, formikHelpers) => {
    // Here you would typically make an API call to register the user
    console.log('Form values:', values);
    formikHelpers.setSubmitting(false);
  };
  return (
    
      <div className="container mt-5">
        <h1 className="text-center">Register</h1>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
              <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <Field type="text" id="name" className="form-control" name="name" />
              </div>
    
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" className="form-control" name="email"/>
              </div>
    
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" id="password" className="form-control" name="password"/>
              </div>
    
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <Field type="password" id="confirmPassword" className="form-control" name="confirmPassword" />
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
