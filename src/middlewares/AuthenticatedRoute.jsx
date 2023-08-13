import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { AppContext } from "../context/AppContext";

export default function AuthenticatedRoute({
  children,
  redirectPath = "/login",
  isAllowed = true,
}) {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && isAllowed) {
      navigate(redirectPath || "/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAllowed, redirectPath]);

  if (!isAllowed || token) {
    return <>{children}</>;
  }

  return null;
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
  isAllowed: PropTypes.bool,
};
