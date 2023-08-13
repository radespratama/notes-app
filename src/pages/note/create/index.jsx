import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import BaseLayout from "../../../layouts/BaseLayout";
import { AppContext } from "../../../context/AppContext";
import Header from "../../../components/Header";
import useInput from "../../../hooks/useInput";
import { createNote } from "../../../services/api";
import { toast } from "react-hot-toast";

export default function AddNote() {
  const navigate = useNavigate();
  const { language, colorTheme, token } = useContext(AppContext);

  const [title, handleTitleChange] = useInput("");
  const [description, handleDescriptinChange] = useInput("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPayload = () => {
    return {
      title,
      description,
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = getPayload();

    try {
      setIsSubmitting(true);

      const res = await createNote(token, {
        title: payload.title,
        body: payload.description,
      });

      if (res?.status === "fail") {
        toast.error(res?.message);

        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      toast.success(res?.message);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }

    navigate("/", {
      replace: true,
    });
  };

  return (
    <BaseLayout bgColor={colorTheme === "dark" ? "#141821" : "#FFF"}>
      <Box display="grid" placeItems="center" minHeight="100vh">
        <Container
          maxW="lg"
          py={{ base: "12", md: "24" }}
          px={{ base: "0", sm: "8" }}
        >
          <Header clean />
          <Stack spacing="8">
            <Box
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              bg={{
                base: "transparent",
                sm: colorTheme === "dark" ? "#1A202C" : "#fff",
              }}
              boxShadow={{ base: "none", sm: "md" }}
              borderRadius={{ base: "none", sm: "xl" }}
            >
              <Stack as="form" onSubmit={(e) => onSubmit(e)} spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel
                      htmlFor="title"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                    >
                      {language === "en" ? "Title" : "Judul"}
                    </FormLabel>
                    <Input
                      id="title"
                      type="text"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                      placeholder={`${
                        language === "en" ? "Example" : "Contoh"
                      }: Belajar React JS`}
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      htmlFor="description"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                    >
                      {language === "en" ? "Description" : "Deskripsi"}
                    </FormLabel>
                    <Input
                      type="text"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                      placeholder={`${
                        language === "en" ? "Example" : "Contoh"
                      }: Hari ini aku belajar React JS`}
                      value={description}
                      onChange={handleDescriptinChange}
                    />
                  </FormControl>
                </Stack>
                <Stack
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  spacing="6"
                >
                  <Button
                    width="full"
                    type="button"
                    variant="solid"
                    onClick={() =>
                      navigate("/", {
                        replace: true,
                      })
                    }
                    isDisabled={isSubmitting}
                  >
                    {language === "en" ? "Back" : "Kembali"}
                  </Button>
                  <Button
                    width="full"
                    type="submit"
                    variant="solid"
                    isLoading={isSubmitting}
                    isDisabled={title === "" || description === ""}
                  >
                    {language === "en" ? "Create note" : "Buat Catatan"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </BaseLayout>
  );
}
