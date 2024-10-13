import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

const Filter = ({ filter, onChangeFilter }) => (
  <label className={styles.filterLabel}>
    Find contacts by name
    <input
      type="text"
      value={filter}
      onChange={(e) => onChangeFilter(e.target.value)}
    />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
