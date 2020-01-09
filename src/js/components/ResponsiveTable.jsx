import React from "react";
import "../../styles/scss/table.scss";

const ResponsiveTable = ({ headers, data }) => {
  const header = headers.map((i, index) => {
    return (
      <div className="table-cell" key={index}>
        {i}
      </div>
    );
  });
  const rows = data.map((i, index) => {
    return (
      <div className="row" key={index}>
        {Object.keys(i).map(key => (
          <div className="table-cell" key={key}>
            {i[key]}
          </div>
        ))}
      </div>
    );
  });
  return (
    <div className="table text-center stripped">
      <div className="table-header">
        <div className="row">{header}</div>
      </div>
      <div className="table-body">{rows}</div>
    </div>
  );
};

export default ResponsiveTable;
