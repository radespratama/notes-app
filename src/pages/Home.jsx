import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IconArchiveFilled, IconPlus } from "@tabler/icons-react";

import BaseLayout from "../layouts/BaseLayout";

import Input from "../components/Input";
import Header from "../components/Header";
import NotesCard from "../components/NotesCard";

import { showFormattedDate } from "../utils";
import { AppContext } from "../context/AppContext";
import { getNotes, getUser } from "../services/api";

export default function Home() {
  const navigate = useNavigate();

  const { token, setCurrentUser, language, colorTheme } =
    useContext(AppContext);

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [filteredNotes, setFilteredNotes] = useState(notes);

  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [isFetchingNotes, setIsFetchingNotes] = useState(true);

  function handleSearchNote(e) {
    setSearch(e.target.value);
  }

  const getLoggedInUser = async (token) => {
    try {
      setIsFetchingUser(true);

      const res = await getUser(token);

      if (res?.status === "fail") {
        toast.error(res?.message);

        setIsFetchingUser(false);
        return;
      }

      setCurrentUser(res?.data);
      setIsFetchingUser(false);
    } catch (error) {
      setIsFetchingUser(true);
      toast.error(error?.message);
      console.error(error);
    }
  };

  const fetchAllNotes = async (token) => {
    try {
      setIsFetchingUser(true);

      const res = await getNotes(token);

      if (res?.status === "fail") {
        toast.error(res?.message);

        setIsFetchingUser(false);
        return;
      }

      setNotes(res?.data);
      setFilteredNotes(res?.data);
      setIsFetchingNotes(false);
    } catch (error) {
      setIsFetchingNotes(true);
      toast.error(error?.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (search) {
      const filteredNote = filteredNotes?.filter((note) => {
        const lowerCaseNote = search?.toLowerCase();

        return note?.title?.toLowerCase().includes(lowerCaseNote);
      });

      setFilteredNotes(filteredNote);
    } else {
      setFilteredNotes(notes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (token) {
      getLoggedInUser(token);
    }

    return () => {
      setCurrentUser(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchAllNotes(token);
    }

    return () => {
      setNotes([]);
      setFilteredNotes([]);
    };
  }, [token]);

  return (
    <BaseLayout bgColor={colorTheme === "dark" ? "#141821" : "#FFF"}>
      {isFetchingUser || isFetchingNotes ? (
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
            title={language === "en" ? "Notes App" : "Aplikasi Catatan"}
          />
          <Box marginTop="20px" display="flex" gap="10px" alignItems="center">
            <Input
              title={language === "en" ? "Search note" : "Cari catatan"}
              value={search}
              onChange={handleSearchNote}
              color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
            />
            <Box display="flex" gap="10px">
              <Button
                type="button"
                onClick={() => navigate("/archive")}
                variant="solid"
              >
                <IconArchiveFilled size={24} />
              </Button>
              <Button
                type="button"
                variant="solid"
                onClick={() => navigate("/note/new")}
              >
                <IconPlus size={24} />
              </Button>
            </Box>
          </Box>

          <Box
            as="section"
            marginTop="20px"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="16px"
            paddingBottom="50px"
          >
            {filteredNotes.length !== 0 ? (
              filteredNotes.map((note) => {
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
