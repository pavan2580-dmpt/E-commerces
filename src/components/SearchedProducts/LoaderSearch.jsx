import React from 'react';
import "./LoaderSearch.css"
function Loader() {
  const loaderItems = [];
  for (let i = 1; i <= 12; i++) {
    loaderItems.push(<div key={i} style={{ '--i': i }} className="loader_item"></div>);
  }

  return (
    <div className="loaderSearch">
      {loaderItems}
    </div>
  );
}

export default Loader;
