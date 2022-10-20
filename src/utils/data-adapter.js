export const adaptInputName = (name) => name.toLowerCase().split(' ').join('_');

export const adaptResultPages = (pages) => Object.keys(pages).reduce((acc, currentPage) => {
  Object.keys(pages[currentPage]).forEach((pageKey) => {
    acc[pageKey] = pages[currentPage][pageKey].value;
  });

  return acc;
}, {});

export const adaptPages = (pagesArray) => pagesArray.reduce((acc, val, idx) => {
  const currentPage = idx + 1;
  acc[currentPage] = {};

  for (let i = 0; i < val.props.inputs.length; i += 1) {
    const input = val.props.inputs[i];

    const adaptedName = adaptInputName(input.props.name);
    acc[currentPage][adaptedName] = {
      props: input.props,
      value: '',
      isVisited: false,
      isValid: false,
    };
  }

  return acc;
}, {});
