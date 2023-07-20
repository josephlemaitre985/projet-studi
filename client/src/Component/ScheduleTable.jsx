import React, { useState, useEffect } from 'react';
import './ScheduleTable.css';
import Menu from './Menu';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Form.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis'),
  email: Yup.string().email("L'adresse e-mail est invalide").required("L'adresse e-mail est requise"),
  message: Yup.string().required('Le message est requis'),
  phone: Yup.string().required('Le numéro de téléphone est requis'),
});

const ScheduleTable = () => {
  const [openingHours, setOpeningHours] = useState([]);

  useEffect(() => {
    fetch('/api/openinghours')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOpeningHours(data.openingHours);
        } else {
          console.error('Erreur lors de la récupération des horaires d\'ouverture:', data.error);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des horaires d\'ouverture:', error);
      });
  }, []);

  return (
    <div>
      <Menu noMarginTop />
      <div className="schedule-container">
        <div className="schedule-table">
          <h2>Horaires d'Ouverture</h2>
          <table>
            <thead>
              <tr>
                <th>Jour</th>
                <th>Matinée</th>
                <th>Après-midi</th>
              </tr>
            </thead>
            <tbody>
              {openingHours.map((schedule) => (
                <tr key={schedule.day}>
                  <td>{schedule.day}</td>
                  <td>{schedule.morningfrom} - {schedule.morningto}</td>
                  <td>{schedule.afternoonfrom} - {schedule.afternoonto}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="contact-info">
            <div>
              <strong>Téléphone:</strong> <a href="tel:0123456789">0123456789</a>
            </div>
            <div>
              <strong>Email:</strong> <a href="mailto:vincent.parrot@parrot.fr">vincent.parrot@parrot.fr</a>
            </div>
            <div>
              <strong>Adresse:</strong>{" "}
              <a
                href="https://www.google.com/maps?q=155+rue+de+Charonne,+Paris,+France"
                target="_blank"
                rel="noopener noreferrer"
              >
                123 rue du Paradis, 31000, Toulouse FRANCE
              </a>
            </div>
          </div>
        </div>
        
        <div className="form-container">
          <h3>Formulaire</h3>
          <Formik
            initialValues={{ name: '', email: '', message: '', phone: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
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
    </div>
  );
};

export default ScheduleTable;
