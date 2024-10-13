import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "../redux/contactsSlice";
import { logoutUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./ContactsPage.module.css"; // Import stilul modular

const ContactsPage = () => {
  const { items, isLoading, error } = useSelector((state) => state.contacts);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newContactName, setNewContactName] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = () => {
    dispatch(addContact({ name: newContactName, number: newContactNumber }));
    setNewContactName("");
    setNewContactNumber("");
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className={styles["contacts-container"]}>
      <h2>Contacts</h2>
      <p>Logged in as: {user?.email}</p>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className={styles["add-contact"]}>
        <h3>Add a new contact</h3>
        <input
          type="text"
          placeholder="Contact name"
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
          className={styles["input"]}
        />
        <input
          type="text"
          placeholder="Contact number"
          value={newContactNumber}
          onChange={(e) => setNewContactNumber(e.target.value)}
          className={styles["input"]}
        />
        <button onClick={handleAddContact} className={styles["button"]}>
          Add Contact
        </button>
      </div>

      <ul className={styles["contacts-list"]}>
        {items.map((contact) => (
          <li key={contact.id} className={styles["contact-item"]}>
            {contact.name}: {contact.number}
            <button
              onClick={() => handleDeleteContact(contact.id)}
              className={styles["delete-button"]}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout} className={styles["button"]}>
        Logout
      </button>
    </div>
  );
};

export default ContactsPage;
