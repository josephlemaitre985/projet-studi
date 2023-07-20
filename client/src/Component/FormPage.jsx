import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Form.css";
import Menu from './Menu';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis'),
  email: Yup.string().email("L'adresse e-mail est invalide").required("L'adresse e-mail est requise"),
  message: Yup.string().required('Le message est requis'),
  phone: Yup.string().required('Le numéro de téléphone est requis'),
});

const FormPage = () => {
  return (

    <div>
      <Menu noMarginTop/>
    
    <div className="form-container">
      <Formik
        initialValues={{ name: '', email: '', message: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          // Logique de soumission du formulaire
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <div className="form-field">
            <label htmlFor="name" className="form-label">Nom :</label>
            <Field type="text" id="name" name="name" className="form-input" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="email" className="form-label">Adresse e-mail :</label>
            <Field type="email" id="email" name="email" className="form-input" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="phone" className="form-label">Numéro de téléphone :</label>
            <Field type="text" id="phone" name="phone" className="form-input" />
            <ErrorMessage name="phone" component="div" className="error-message" />
          </div>

          <div className="form-field">
            <label htmlFor="message" className="form-label">Message :</label>
            <Field as="textarea" id="message" name="message" className="form-input" />
            <ErrorMessage name="message" component="div" className="error-message" />
          </div>

          <button type="submit" className="form-submit">Envoyer</button>
        </Form>
      </Formik>
    </div>
    </div>
  );
};

export default FormPage;
