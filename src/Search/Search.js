import PropTypes from 'prop-types';
import s from './Search.module.css';

function Search({ value, onSearch }) {
  return (
    <label className={s.label}>
      {' '}
      Find contacts by name:
      <input
        type="text"
        value={value}
        onChange={onSearch}
        className={s.input}
      ></input>
    </label>
  );
}

export default Search;

Search.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func,
};
