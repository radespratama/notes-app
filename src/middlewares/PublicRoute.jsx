import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { AppContext } from "../context/AppContext";

export default function PublicRoute({
  children,
  redirectPath = "/",
  isAllowed,
}) {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isAllowed) {
      navigate(redirectPath || "/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAllowed, redirectPath]);

  return <>{children}</>;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
  isAllowed: PropTypes.bool,
};
