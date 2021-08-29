import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.css';
import s from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleSubmit = event => {
    const { onSubmit, contactList } = this.props;
    const { name } = this.state;
    const contacts = contactList.map(contact => contact.name.toLowerCase());

    event.preventDefault();
    if (contacts.includes(name.toLowerCase())) {
      Toastr.error(`${name} is already in contacts`);
      this.reset();
      return;
    }
    onSubmit(this.state);
    this.reset();
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            {' '}
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              className={s.input}
            />
          </label>
          <label>
            {' '}
            Number:
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleInputChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              className={s.input}
            />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func,
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
