import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IconNotes } from "@tabler/icons-react";
import styled from "@emotion/styled";
import { Box, Text } from "@chakra-ui/react";

const StyledLink = styled(Link)({
  marginTop: "8px",
  fontWeight: 700,
  fontSize: "18px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "220px",

  "&:hover": {
    textDecoration: "underline",
  },
});

export default function NotesCard({ title = "-", date, description, notedId }) {
  return (
    <>
      <Box
        padding="16px 14px"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        position="relative"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        border="1px solid #E2E2E2"
        backgroundColor="#FFF"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position="relative"
        >
          <Text as="p" fontSize="sm" fontWeight="medium" color="#7A7A7A">
            {date}
          </Text>
          <Box>
            <IconNotes size={18} />
          </Box>
        </Box>

        <StyledLink to={`/note/${notedId}`}>{title}</StyledLink>

        <Text
          marginTop="8px"
          as="p"
          fontSize="md"
          color="#C4C4C4"
          whiteSpace="pre-wrap"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
          }}
        >
          {description ? description : "Belum ada deskripsi note 😊"}
        </Text>
      </Box>
    </>
  );
}

NotesCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  notedId: PropTypes.string.isRequired,
};
