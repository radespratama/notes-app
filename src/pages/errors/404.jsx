import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "underline",

  "&:hover": {
    color: "#fff",
    textDecoration: "none",
  },
});

export default function NotFoundPage() {
  return (
    <Box
      backgroundColor="#0C0B0B"
      display="grid"
      placeItems="center"
      minHeight="100vh"
    >
      <Box textAlign="center">
        <Text fontSize="4xl" fontWeight="bold" marginBottom="20px" color="#fff">
          Halaman yang kamu cari tidak ditemukan
        </Text>

        <StyledLink to="/">Kembali</StyledLink>
      </Box>
    </Box>
  );
}
