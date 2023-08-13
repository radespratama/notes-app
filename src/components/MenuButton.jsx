import { useContext } from "react";
import {
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  IconLanguage,
  IconLogout,
  IconMenu2,
  IconMoonFilled,
  IconSunFilled,
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { removeValueFromLocalStorage } from "../utils";

export default function MenuToggler() {
  const location = useLocation();
  const { changeLanguage, changeColorTheme, language, colorTheme } =
    useContext(AppContext);

  const newLanguage = language === "en" ? "id" : "en";
  const newColorTheme = colorTheme === "light" ? "dark" : "light";

  const handleLogout = () => {
    removeValueFromLocalStorage("@token");

    window.location.href = "/login";
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<IconMenu2 size={18} />}
        variant="solid"
      />
      <MenuList>
        <MenuItem
          onClick={() => {
            changeColorTheme(newColorTheme);
          }}
          icon={
            colorTheme === "light" ? (
              <IconMoonFilled size={18} />
            ) : (
              <IconSunFilled size={18} />
            )
          }
        >
          {colorTheme === "light" ? "Dark" : "Light"}
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage(newLanguage);
          }}
          icon={<IconLanguage size={18} />}
        >
          {newLanguage === "en" ? "English" : "Indonesia"}
        </MenuItem>
        {location.pathname === "/login" || location.pathname === "/register" ? (
          <></>
        ) : (
          <>
            <Divider />
            <MenuItem
              icon={<IconLogout size={18} color="#b91c1c" />}
              sx={{ color: "#b91c1c", marginTop: "8px" }}
              onClick={() => handleLogout()}
            >
              Logout
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}
