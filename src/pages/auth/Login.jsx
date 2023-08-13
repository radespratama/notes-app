import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { toast } from "react-hot-toast";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useInput from "../../hooks/useInput";
import Header from "../../components/Header";
import BaseLayout from "../../layouts/BaseLayout";

import { AppContext } from "../../context/AppContext";
import { normalLogin } from "../../services/api";

const StyledLink = styled(Link)({
  fontWeight: "bold",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default function Login() {
  const navigate = useNavigate();
  const { language, colorTheme, saveUserToken } = useContext(AppContext);

  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPayload = () => {
    return {
      email,
      password,
    };
  };

  const loginWithForm = async (email, password) => {
    try {
      const res = await normalLogin({
        email,
        password,
      });

      if (res?.status === "fail") {
        toast.error(res?.message);

        return;
      }

      saveUserToken(res?.data?.accessToken || "");
      toast.success(res?.message);
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = getPayload();

    try {
      setIsSubmitting(true);

      await loginWithForm(payload.email, payload.password);

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(true);
      toast.error("Something went wrong, please try again later");
      console.error(error);
    }
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
                      htmlFor="email"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                    >
                      Email
                    </FormLabel>
                    <Input
                      id="email"
                      type="email"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                      placeholder={`${
                        language === "en" ? "Example" : "Contoh"
                      }: papazola@insi.com`}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      htmlFor="password"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                    >
                      {language === "en" ? "Password" : "Kata Sandi"}
                    </FormLabel>
                    <Input
                      id="password"
                      type="password"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                      placeholder={`${
                        language === "en" ? "Example" : "Contoh"
                      }: ****`}
                      value={password}
                      onChange={handlePasswordChange}
                      autoComplete="****"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={email === "" || password === ""}
                  >
                    {language === "en" ? "Login" : "Masuk"}
                  </Button>
                </Stack>
              </Stack>
            </Box>

            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Text
                  color="fg.muted"
                  sx={{ color: colorTheme === "dark" ? "#FFF" : "#1A202C" }}
                >
                  {language === "en"
                    ? "Don't have an account?"
                    : "Belum punya akun?"}{" "}
                  <StyledLink to="/register">
                    {language === "en" ? "Sign up" : "Daftar"}
                  </StyledLink>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </BaseLayout>
  );
}
