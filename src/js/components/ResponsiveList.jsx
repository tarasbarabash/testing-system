import React, { useState, useEffect } from "react";
import "../../styles/scss/list.scss";
import "../../styles/scss/items.scss";

const ResponsiveList = ({
  item: Item,
  title,
  data,
  sortFields,
  sort,
  dir = false,
  limit = 10,
  noResult = "No results!",
  onChange,
  total,
  offset = 0,
  filterFields,
  initialFilter
}) => {
  const limitOptions = [10, 15, 20, 30, 50];
  const [params, setParams] = useState({
    sort,
    dir,
    limit,
    offset
  });
  const [totalPages, setTotalPages] = useState(0);
  const [curPage, setCurPage] = useState(Math.ceil(params.offset / limit));
  const [timeout, setTimeoutState] = useState(0);
  const [filters, setFilters] = useState(initialFilter);
  useEffect(() => setTotalPages(Math.ceil(total / params.limit)), [total]);
  useEffect(() => {
    const direction = params.dir ? 1 : -1;
    let queryObj = { ...params, dir: direction };
    if (params.date) queryObj = { ...queryObj, date: Date.parse(params.date) };
    setTotalPages(Math.ceil(total / params.limit));
    onChange(queryObj);
  }, [params]);

  const renderSortingOptions = sortFields
    .sort(({ displayName }, { displayName: nDisplayName }) =>
      displayName < nDisplayName ? -1 : displayName > nDisplayName ? 1 : 0
    )
    .map(({ name, displayName }) => (
      <option key={name} value={name}>
        {displayName}
      </option>
    ));

  const onPageChanged = i => {
    if (i === curPage) return;
    setCurPage(i);
    setParams({ ...params, offset: params.limit * i });
  };

  const onFilterInputChange = object => {
    const isEmpty = Object.keys(object).length === 0;
    if (timeout) clearTimeout(timeout);
    if (isEmpty) setFilters(initialFilter);
    else setFilters({ ...filters, ...object });
    setTimeoutState(
      setTimeout(() => {
        if (isEmpty) setParams({ sort, dir, limit, offset });
        else {
          setParams({ ...params, ...object, offset: 0 });
          setCurPage(0);
        }
      }, 500)
    );
  };

  const renderPages = () => {
    const pages = [];
    const maxPages = 2;
    pages.push(
      <li key={-1}>
        <button
          className={`page-index ${curPage === 0 && "active"}`}
          onClick={() => onPageChanged(0)}
        >
          {1}
        </button>
      </li>
    );
    if (totalPages > 1) {
      if (curPage - 2 > 0)
        pages.push(
          <li key="dots_1">
            <button className="page-index dots">...</button>
          </li>
        );
      for (let i = 1; i < totalPages - 1; i++) {
        if (i > curPage - maxPages && i < curPage + maxPages)
          pages.push(
            <li key={i + 1} data-value={i}>
              <button
                className={`page-index ${curPage === i && "active"}`}
                onClick={() => onPageChanged(i)}
              >
                {i + 1}
              </button>
            </li>
          );
      }
      if (curPage + 2 < totalPages - 1)
        pages.push(
          <li key="dots_2">
            <button className="page-index dots">...</button>
          </li>
        );
      pages.push(
        <li key={totalPages}>
          <button
            className={`page-index ${curPage === totalPages - 1 && "active"}`}
            onClick={() => onPageChanged(totalPages - 1)}
          >
            {totalPages}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="root">
      <section className="left-column">
        <div className="row header">
          <div>
            <h3 className="heading-3">{title}</h3>
            <p className="muted">{total} items</p>
          </div>
          {data.length > 0 && (
            <div className="row sorting">
              <h3 className="heading-3">Sorting: </h3>
              <select
                value={params.sort}
                onChange={e => setParams({ ...params, sort: e.target.value })}
              >
                {renderSortingOptions}
              </select>
              <button
                className="btn-wrapper"
                onClick={() => setParams({ ...params, dir: !params.dir })}
              >
                <div
                  className={`direction ${params.dir ? "desc" : "asc"}`}
                ></div>
              </button>
            </div>
          )}
        </div>
        <div className="list stripped">
          {data.length === 0 && <div>{noResult}</div>}
          {data.map((item, index) => (
            <Item key={index} item={item} index={index + params.offset} />
          ))}
        </div>
        {data.length > 0 && <ul className="pagination">{renderPages()}</ul>}
      </section>
      <section className="right-column">
        <div>
          <h3 className="heading-3">Filters</h3>
          <div className="form">
            {filterFields.map(({ name, displayName, inputType }) => (
              <div key={name} className="form-group">
                <label htmlFor={name}>{displayName}:</label>
                <div className="row">
                  <input
                    type={inputType}
                    id={name}
                    name={name}
                    value={filters[name]}
                    onChange={({ target: { name, value } }) =>
                      onFilterInputChange({ [name]: value })
                    }
                  ></input>
                  <div
                    className="clear text-center"
                    onClick={() => onFilterInputChange({})}
                  >
                    x
                  </div>
                </div>
              </div>
            ))}
            <div className="action btn" onClick={() => onFilterInputChange({})}>
              Clear All
            </div>
          </div>
        </div>
        {total > 10 && (
          <div>
            <h3 className="heading-3">Show per page</h3>
            <ul className="pagination limit">
              {limitOptions.map(i => (
                <li
                  key={i}
                  className={`page-index filter-index ${i === params.limit &&
                    "active"}`}
                  onClick={() => {
                    setParams({ ...params, limit: i, offset: 0 });
                    setCurPage(0);
                  }}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default ResponsiveList;
