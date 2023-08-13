import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

export default function BaseLayout({ children, bgColor = "white" }) {
  return (
    <Box as="main" backgroundColor={bgColor} transition="all 0.3s">
      <Box
        maxWidth={768}
        margin="0 auto"
        minHeight="100vh"
        paddingX="16px"
        sx={{
          "@media (min-width: 768px)": {
            paddingX: 0,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string,
};
