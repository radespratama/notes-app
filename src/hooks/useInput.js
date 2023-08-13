import { useState } from "react";
import PropTypes from "prop-types";

export default function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = (e) => setValue(e.target.value);

  return [value, handleValueChange];
}

useInput.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
