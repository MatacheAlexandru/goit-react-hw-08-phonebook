import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContact({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          placeholder="Enter name"
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Number
        <input
          placeholder="Enter number"
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleNumberChange}
        />
      </label>
      <button className={styles.add} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
