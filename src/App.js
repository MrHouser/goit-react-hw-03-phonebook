import React, { Component } from 'react';
import shortid from 'shortid';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Search from './Search/Search';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    this.setState({
      contacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  submitHandler = data => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, { id: shortid.generate(), ...data }],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const lowerCasedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCasedFilter),
    );

    return (
      <div className="wrapper">
        <h1 className="main-title">Phonebook</h1>
        <Form onSubmit={this.submitHandler} contactList={contacts} />
        <h2 className="title">Contacts</h2>
        <Search value={filter} onSearch={this.handleFilter} />
        <Contacts contacts={filteredContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}

export default App;
