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
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import useInput from "../../hooks/useInput";
import Header from "../../components/Header";
import BaseLayout from "../../layouts/BaseLayout";
import { AppContext } from "../../context/AppContext";

import { normalRegister } from "../../services/api";

const StyledLink = styled(Link)({
  fontWeight: "bold",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default function Register() {
  const navigate = useNavigate();
  const { language, colorTheme } = useContext(AppContext);

  const [fullname, handleFullnameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [passwordConfirmation, handlePasswordConfirmationChange] = useInput("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisable = {
    fullname,
    email,
    password,
    passwordConfirmation,
  };

  const getPayload = () => {
    return {
      fullname,
      email,
      password,
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = getPayload();
    try {
      setIsSubmitting(true);

      const res = await normalRegister({
        name: payload.fullname,
        email: payload.email,
        password: payload.password,
      });

      if (res?.status === "fail") {
        toast.error(res?.message);

        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      toast.success(res?.message);
      navigate("/login");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }
  };

  const checkPasswordIsMatch = () => {
    return password === passwordConfirmation;
  };

  useEffect(() => {
    if (
      password !== "" &&
      passwordConfirmation !== "" &&
      !checkPasswordIsMatch()
    ) {
      toast.error("Password is not match");
    } else {
      toast.dismiss();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkPasswordIsMatch, password]);

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
                      htmlFor="fullname"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                    >
                      {language === "en" ? "Fullname" : "Nama Lengkap"}
                    </FormLabel>
                    <Input
                      id="fullname"
                      type="text"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                      placeholder={`${
                        language === "en" ? "Example" : "Contoh"
                      }: John Doe`}
                      value={fullname}
                      onChange={handleFullnameChange}
                    />
                  </FormControl>

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
                      min={6}
                    />

                    <Text as="span" fontSize="xs">
                      {language === "en"
                        ? "Password must be at least 6 characters"
                        : "Kata sandi minimal 6 karakter"}
                    </Text>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      htmlFor="password_confirmation"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                    >
                      {language === "en"
                        ? "Password Confirmation"
                        : "Konfirmasi Kata Sandi"}
                    </FormLabel>
                    <Input
                      id="password_confirmation"
                      type="password"
                      color={colorTheme === "dark" ? "#FFF" : "#1A202C"}
                      placeholder={`${
                        language === "en" ? "Example" : "Contoh"
                      }: ****`}
                      value={passwordConfirmation}
                      onChange={handlePasswordConfirmationChange}
                      min={6}
                    />

                    <Text as="span" fontSize="xs">
                      {language === "en"
                        ? "Password must be at least 6 characters"
                        : "Kata sandi minimal 6 karakter"}
                    </Text>
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={
                      Object.values(isDisable).some((value) => value === "") ||
                      !checkPasswordIsMatch()
                    }
                  >
                    {language === "en" ? "Register" : "Daftar"}
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
                    ? "Already have an account?"
                    : "Sudah punya akun?"}{" "}
                  <StyledLink to="/login">
                    {language === "en" ? "Sign in" : "Masuk"}
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
