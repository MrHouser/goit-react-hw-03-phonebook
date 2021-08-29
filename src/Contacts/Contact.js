import PropTypes from 'prop-types';
import s from './Contacts.module.css';

function Contact({ id, name, number, onDelete }) {
  return (
    <li className={s.item}>
      <p className={s.text}>
        {name}: {number}
      </p>
      <button type="button" onClick={() => onDelete(id)} className={s.button}>
        X
      </button>
    </li>
  );
}

export default Contact;

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};
