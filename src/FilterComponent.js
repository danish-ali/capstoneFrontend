import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterComponent = ({ onFilter }) => {
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    newsSource: '',
    compoundValue: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFilterData((prevState) => ({ ...prevState, [name]: date }));
  };

  const handleFilter = () => {
    onFilter(filterData);
  };

  const handleReset = () => {
    setFilterData({
      startDate: null,
      endDate: null,
      newsSource: '',
      compoundValue: ''
    });
    onFilter({});
  };

  return (
    <div className="filter-container">
      <h3 className="filter-heading">Filter</h3>
      <div className="filter-row">
        <label>Start Date:</label>
        <DatePicker
          selected={filterData.startDate}
          onChange={(date) => handleDateChange('startDate', date)}
          className="filter-datepicker"
        />
      </div>
      <div className="filter-row">
        <label>End Date:</label>
        <DatePicker
          selected={filterData.endDate}
          onChange={(date) => handleDateChange('endDate', date)}
          className="filter-datepicker"
        />
      </div>
      <div className="filter-row">
        <label>News Source:</label>
        <input
          type="text"
          name="newsSource"
          value={filterData.newsSource}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-row">
        <label>Compound Value:</label>
        <input
          type="text"
          name="compoundValue"
          value={filterData.compoundValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-button-row">
        <button className="filter-button apply-button" onClick={handleFilter}>
          Apply Filter
        </button>
        <button className="filter-button reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
