// import { useEffect } from "react";
import css from "./App.module.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import { ContactList } from "./components/ContactList/ContactList";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { addContact, deleteContact } from "./redux/contactsSlice";
import { changeFilter } from "./redux/filtersSlice";


function App() {
  
  const dispatch = useDispatch();
  const selectContacts = useSelector((state) => state.contact.contacts.items);
  const selectNameFilter = useSelector((state) => state.filter.filters.name);

  // useEffect(() => {
  //   localStorage.setItem("contacts", JSON.stringify(contacts));
  // }, [contacts]);

  const onAddUser = (formData) => {
    const finalContact = {
      id: nanoid(),
      ...formData,
    };
    dispatch(addContact(finalContact));
  };

  const onDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const onChangeFilter = (event) => {
    dispatch(changeFilter(event.currentTarget.value));
  };
 

  const filteredContacts = useMemo(
    () =>
    selectContacts.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(selectNameFilter.toLowerCase()) ||
          contact.number.toLowerCase().includes(selectNameFilter.toLowerCase())
        );
      }),
    [selectNameFilter, selectContacts]
  );

  return (
    <div>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onAddUser={onAddUser} />
      <SearchBox onChangeFilter={onChangeFilter} filter={selectNameFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />  
    </div>
  );
}

export default App;
