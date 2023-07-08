import React, { useState } from 'react';

const FilterComponent = ({ onFilter }) => {
  const [filterData, setFilterData] = useState({
    startDate: '',
    endDate: '',
    newsSource: '',
    compoundValue: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFilter = () => {
    onFilter(filterData);
  };

  const handleReset = () => {
    setFilterData({
      startDate: '',
      endDate: '',
      newsSource: '',
      compoundValue: ''
    });
    onFilter({});
  };

  return (
    <div>
      <h3>Filter</h3>
      <div>
        <label>Start Date:</label>
        <input type="text" name="startDate" value={filterData.startDate} onChange={handleInputChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="text" name="endDate" value={filterData.endDate} onChange={handleInputChange} />
      </div>
      <div>
        <label>News Source:</label>
        <input type="text" name="newsSource" value={filterData.newsSource} onChange={handleInputChange} />
      </div>
      <div>
        <label>Compound Value:</label>
        <input type="text" name="compoundValue" value={filterData.compoundValue} onChange={handleInputChange} />
      </div>
      <button onClick={handleFilter}>Apply Filter</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default FilterComponent;
