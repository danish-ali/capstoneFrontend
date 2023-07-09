import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterComponent = ({ onFilter }) => {
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    compoundValue: '',
    newsSources: []
  });
  const [showAllSources, setShowAllSources] = useState(false);
  const [maxSourcesCount, setMaxSourcesCount] = useState(5);

  useEffect(() => {
    const fetchNewsSources = async () => {
      try {
        const response = await fetch('http://localhost:5000/getNewsChannels');
        const responseData = await response.json();
        const maxSources = responseData.slice(0, maxSourcesCount);
        setFilterData(prevState => ({
          ...prevState,
          newsSources: maxSources.map(source => ({ name: source, checked: false }))
        }));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNewsSources();
  }, [maxSourcesCount]);

  const handleDateChange = (name, date) => {
    setFilterData(prevState => ({
      ...prevState,
      [name]: date
    }));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFilterData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;

  setFilterData(prevState => {
    const updatedSources = prevState.newsSources.map(source => {
      if (source.name === name) {
        return { ...source, checked };
      }
      return source;
    });

    return {
      ...prevState,
      newsSources: updatedSources
    };
  });
};

  const handleFilter = () => {
    onFilter(filterData);
  };

  const handleReset = () => {
    setFilterData({
      startDate: null,
      endDate: null,
      compoundValue: '',
      newsSources: []
    });
    onFilter({});
  };

  const handleShowAllSources = () => {
    setShowAllSources(true);
    setMaxSourcesCount(Infinity);
  };

  const handleHideSources = () => {
    setShowAllSources(false);
    setMaxSourcesCount(5);
  };

  const handleSelectAll = () => {
    const allSources = filterData.newsSources.map(source => ({
      ...source,
      checked: true
    }));
    setFilterData(prevState => ({
      ...prevState,
      newsSources: allSources
    }));
  };

  const handleDeselectAll = () => {
    const updatedSources = filterData.newsSources.map(source => ({
      ...source,
      checked: false
    }));
    setFilterData(prevState => ({
      ...prevState,
      newsSources: updatedSources
    }));
  };

  return (
    <div className="filter-container">
      <h3>Filter</h3>
      <div className="filter-row">
        <label>Compound Value:</label>
        <input
          type="text"
          name="compoundValue"
          value={filterData.compoundValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-row">
        <label>Start Date:</label>
        <DatePicker
          name="startDate"
          selected={filterData.startDate}
          onChange={date => handleDateChange('startDate', date)}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
        />
      </div>
      <div className="filter-row">
        <label>End Date:</label>
        <DatePicker
          name="endDate"
          selected={filterData.endDate}
          onChange={date => handleDateChange('endDate', date)}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
        />
      </div>
      <div className="filter-row">
        <label>News Sources:</label>
        {filterData.newsSources.map(source => (
          <div key={source.name}>
            <input
              type="checkbox"
              name={source.name}
              checked={source.checked}
              onChange={handleCheckboxChange}
            />
            <label>{source.name}</label>
          </div>
        ))}
      </div>
      {!showAllSources ? (
        <div className="filter-row">
          <button className="show-all-button" onClick={handleShowAllSources}>
            Show All
          </button>
        </div>
      ) : (
        <div className="filter-row">
          <button className="hide-button" onClick={handleHideSources}>
            Hide
          </button>
        </div>
      )}
      <div className="filter-row">
        <button className="select-all-button" onClick={handleSelectAll}>
          Select All
        </button>
        <button className="deselect-all-button" onClick={handleDeselectAll}>
          Deselect All
        </button>
      </div>
      <div className="filter-row">
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
