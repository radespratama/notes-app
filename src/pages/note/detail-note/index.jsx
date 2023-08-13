import { useEffect, useState, useContext } from "react";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import BaseLayout from "../../../layouts/BaseLayout";

import { showFormattedDate } from "../../../utils";
import HeaderDetail from "../../../components/Header/HeaderDetail";

import { AppContext } from "../../../context/AppContext";
import {
  archiveNote,
  unArchiveNote,
  getNoteById,
  deleteNote,
} from "../../../services/api";
import { toast } from "react-hot-toast";
import { IconArchive, IconArchiveOff, IconTrash } from "@tabler/icons-react";

export default function DetailNote() {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const { token, language, colorTheme } = useContext(AppContext);

  const [note, setNote] = useState(null);
  const [isFetchingNote, setIsFetchingNote] = useState(true);

  const [isArchived, setIsArchived] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const getDetailNoteById = async (noteId) => {
    try {
      setIsFetchingNote(true);

      const res = await getNoteById(token, noteId);

      if (res?.status === "fail") {
        toast.error(res?.message);

        setIsFetchingNote(false);
        return;
      }

      setNote(res?.data);
      setIsFetchingNote(false);
    } catch (error) {
      setIsFetchingNote(true);
      toast.error(error?.message);
      console.error(error);
    }
  };

  const handleUnArchiveNote = async (noteId) => {
    try {
      setIsArchived(true);
      const res = await unArchiveNote(token, noteId);

      if (res?.status === "fail") {
        toast.error(res?.message);
        return;
      }

      toast.success(res?.message);
      setIsArchived(false);
    } catch (error) {
      setIsArchived(false);
      console.error(error);
    }
  };

  const handleArchiveNote = async (noteId) => {
    try {
      setIsArchived(true);
      const res = await archiveNote(token, noteId);

      if (res?.status === "fail") {
        toast.error(res?.message);
        return;
      }

      toast.success(res?.message);
      setIsArchived(false);
    } catch (error) {
      setIsArchived(false);
      console.error(error);
    }
  };

  const handleArchive = async (noteId) => {
    if (note.archived) {
      await handleUnArchiveNote(noteId);
      navigate("/archive", {
        replace: true,
      });
    } else {
      await handleArchiveNote(noteId);
      navigate("/", {
        replace: true,
      });
    }
  };

  const handleDelete = async (noteId) => {
    try {
      setIsDeleted(true);

      const res = await deleteNote(token, noteId);

      if (res?.status === "fail") {
        toast.error(res?.message);

        setIsDeleted(false);
        return;
      }

      setIsDeleted(false);
      toast.success(res?.message);
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      setIsDeleted(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailNoteById(id);
    }

    return () => {
      setNote(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <BaseLayout bgColor={colorTheme === "dark" ? "#141821" : "#FFF"}>
      {isFetchingNote ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box paddingY="20px">
          <HeaderDetail
            handleArchive={() => {}}
            handleDelete={() => handleDelete(id)}
          />

          <Box marginTop="40px">
            <Text
              as="h1"
              fontSize="4xl"
              fontWeight="bold"
              color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
            >
              {note?.title ||
                (language === "en" ? "No Title" : "Tidak ada Judul")}
            </Text>

            <Text
              as="p"
              fontSize="sm"
              fontWeight="medium"
              color={colorTheme === "dark" ? "#f3f4f6" : "#7A7A7A"}
            >
              {showFormattedDate(note?.createdAt)}
            </Text>

            <Text
              as="p"
              fontSize="md"
              marginTop="20px"
              fontWeight="medium"
              color={colorTheme === "dark" ? "#e5e7eb" : "#6b7280"}
            >
              {note?.body ||
                (language === "en" ? "No description" : "Tidak ada deskripsi")}
            </Text>
          </Box>
        </Box>
      )}

      <>
        <Box position="fixed" bottom={10}>
          <Button
            isDisabled={isArchived || isDeleted}
            type="button"
            onClick={() => handleArchive(id)}
            marginRight="16px"
          >
            {note?.archived ? (
              <IconArchiveOff size={18} />
            ) : (
              <IconArchive size={18} />
            )}
          </Button>
          <Button
            type="button"
            isDisabled={isDeleted || isArchived}
            onClick={() => handleDelete(id)}
          >
            <IconTrash size={18} />
          </Button>
        </Box>
      </>
    </BaseLayout>
  );
}
