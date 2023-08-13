import PropTypes from "prop-types";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IconArrowBackUp } from "@tabler/icons-react";

import MenuButton from "../MenuButton";

export default function HeaderDetail({ customBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof customBack === "function") {
      customBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="10px"
    >
      <Button onClick={() => handleBack()} type="button">
        <IconArrowBackUp size={20} />
      </Button>

      <Box display="flex" gap="10px">
        <MenuButton />
      </Box>
    </Box>
  );
}

HeaderDetail.propTypes = {
  customBack: PropTypes.func,
  handleArchive: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
