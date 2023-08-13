import { Box, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";

import BaseLayout from "../../../layouts/BaseLayout";

import Input from "../../../components/Input";
import Header from "../../../components/Header";
import NotesCard from "../../../components/NotesCard";

import { showFormattedDate } from "../../../utils";
import { AppContext } from "../../../context/AppContext";
import { getArchivedNotes } from "../../../services/api";
import { toast } from "react-hot-toast";

export default function Archive() {
  const { language, colorTheme, token } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [archiveNotes, setArchivedNotes] = useState([]);
  const [filteredArchiveNotes, setFilteredArchiveNotes] =
    useState(archiveNotes);

  const [isFetchingArchiveNotes, setIsFetchingArchiveNotes] = useState(true);

  function handleSearchNote(e) {
    setSearch(e.target.value);
  }

  const fetchAllArchiveNotes = async (token) => {
    try {
      setIsFetchingArchiveNotes(true);

      const res = await getArchivedNotes(token);

      if (res?.status === "fail") {
        toast.error(res?.message);

        setIsFetchingArchiveNotes(false);
        return;
      }

      setArchivedNotes(res?.data);
      setFilteredArchiveNotes(res?.data);
      setIsFetchingArchiveNotes(false);
    } catch (error) {
      setIsFetchingArchiveNotes(false);
      toast.error(error?.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllArchiveNotes(token);
    }

    return () => {
      setArchivedNotes([]);
      setFilteredArchiveNotes([]);
    };
  }, [token]);

  useEffect(() => {
    if (search) {
      const filteredArchiveNote = filteredArchiveNotes?.filter((note) => {
        const lowerCaseNote = search?.toLowerCase();

        return note?.title?.toLowerCase().includes(lowerCaseNote);
      });

      setFilteredArchiveNotes(filteredArchiveNote);
    } else {
      setFilteredArchiveNotes(archiveNotes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <BaseLayout bgColor={colorTheme === "dark" ? "#141821" : "#FFF"}>
      {isFetchingArchiveNotes ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Spinner
            size="xl"
            color={colorTheme === "dark" ? "#FFF" : "#141821"}
          />
        </Box>
      ) : (
        <>
          <Header
            title={language === "en" ? "Archive Notes" : "Arsip Catatan"}
          />
          <Input
            title={
              language === "en" ? "Search archive note" : "Cari arsip catatan"
            }
            value={search}
            onChange={handleSearchNote}
            color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
          />

          <Box
            as="section"
            marginTop="20px"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="16px"
            paddingBottom="50px"
          >
            {filteredArchiveNotes.length !== 0 ? (
              filteredArchiveNotes.map((note) => {
                return (
                  <NotesCard
                    key={note.id}
                    notedId={note.id}
                    title={note.title}
                    description={note.body}
                    date={showFormattedDate(note.createdAt)}
                  />
                );
              })
            ) : (
              <Text
                variant="p"
                fontSize="16px"
                color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
              >
                {language === "en" ? "Nothing" : "Gaada"}
              </Text>
            )}
          </Box>
        </>
      )}
    </BaseLayout>
  );
}
