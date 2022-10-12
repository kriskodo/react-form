const adaptResultPages = (pages) => Object.keys(pages).reduce((acc, currentPage) => {
  Object.keys(pages[currentPage]).forEach((pageKey) => {
    acc[pageKey] = pages[currentPage][pageKey].value;
  });

  return acc;
}, {});

export default adaptResultPages;
