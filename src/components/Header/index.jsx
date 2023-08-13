import PropTypes from "prop-types";
import { Box, Button, Text } from "@chakra-ui/react";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

import MenuButton from "../MenuButton";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Header({ title, customBack, clean }) {
  const { colorTheme } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof customBack === "function") {
      customBack();
    } else {
      navigate(-1);
    }
  };

  if (clean) {
    return (
      <Box
        as="header"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <MenuButton />
      </Box>
    );
  }

  return (
    <Box
      as="header"
      paddingY="10px"
      display="grid"
      gridTemplateColumns="10% 1fr 10%"
    >
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        {location.pathname !== "/" ? (
          <Button onClick={() => handleBack()} type="button">
            <IconArrowBackUp size={20} />
          </Button>
        ) : null}
      </Box>
      <Text
        as="h1"
        fontSize="4xl"
        fontWeight="bold"
        textAlign="center"
        color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
      >
        {title}
      </Text>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <MenuButton />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  customBack: PropTypes.func,
  clean: PropTypes.bool,
};
