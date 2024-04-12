import { useEffect, useState } from "react";
import css from "./App.module.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import { ContactList } from "./components/ContactList/ContactList";
import { nanoid } from "nanoid";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

function App() {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem("contacts");
    if (!stringifiedContacts) return initialContacts;
    const parsedContacts = JSON.parse(stringifiedContacts);
    return parsedContacts;
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onAddUser = (formData) => {
    const finalContact = {
      id: nanoid(),
      ...formData,
    };
    setContacts((prevState) => [...prevState, finalContact]);
  };

  const onDeleteContact = (contactId) => {
    setContacts((prevContact) =>
      prevContact.filter((contact) => contact.id !== contactId)
    );
  };

  const [filter, setFilter] = useState("");
  const onChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()) || contact.number.toString().includes(filter)
  );

  return (
    <div>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onAddUser={onAddUser} />
      <SearchBox onChangeFilter={onChangeFilter} filter={filter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}

export default App;
