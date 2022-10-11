import adaptInputName from './adaptInputName';

const adaptPages = (pagesArray) => pagesArray.reduce((acc, val, idx) => {
  const currentPage = idx + 1;
  acc[currentPage] = {};

  for (let i = 0; i < val.props.inputs.length; i += 1) {
    const input = val.props.inputs[i];
    const adaptedName = adaptInputName(input.props.name);
    acc[currentPage][adaptedName] = { props: input.props, value: '' };
  }

  return acc;
}, {});

export default adaptPages;
