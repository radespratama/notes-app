import {
  InputGroup,
  InputLeftElement,
  Input as InputComponent,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { IconSearch } from "@tabler/icons-react";

export default function Input({ title, color, ...props }) {
  return (
    <InputGroup>
      <InputLeftElement>
        <IconSearch size={20} color={color} />
      </InputLeftElement>
      <InputComponent placeholder={title} color={color} {...props} />
    </InputGroup>
  );
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  props: PropTypes.any,
};
