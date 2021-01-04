import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PageLayout } from "../components/hoc/PageLayout";
import { Key } from "@styled-icons/boxicons-solid/Key";
import { Text } from "../components/Texts";
import { Input } from "../components/Inputs";
import { Button } from "../components/Containers";
import {
  Container,
  IconDiv,
  Icon,
  Form,
  LinkContainerDiv,
  LinkDiv,
} from "../components/Containers/Form";

interface ISignIn {
  username: string;
  password: string;
  authStatus: string;
}

const SignIn: React.FC<ISignIn> = ({ ...props }): React.ReactElement => {
  const [creds, setCreds] = useState<Partial<Omit<ISignIn, "authStatus">>>({});

  const [error, setError] = useState(false);

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/v1/users/auth/",
        {
          username: creds.username,
          password: creds.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {

        const userInfo = res.data;

        history.push({
          pathname: `/dashboard/${res.data.user.id}`,
          state: { userInfo }
        });
        console.log(res.data);
      })
      .catch((err) => {
        setError(true);
        console.log(err.message)
      });
  };

  let history = useHistory();

  return (
    <PageLayout {...props}>
      <Container>
        <IconDiv>
          <Icon as={Key} />
        </IconDiv>
        <Text size="h3" color="primary" align="center" bold>
          Sign In
        </Text>
        <Form>
          <Input
            placeholder="Username *"
            value={creds.username || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setCreds({ ...creds, username: e.target.value.trim() });
            }}
          />
          <Input
            placeholder="Password *"
            type="password"
            value={creds.password || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setCreds({ ...creds, password: e.target.value.trim() });
            }}
          />
          <Button onClick={handleSignIn}>Sign In</Button>
          <LinkContainerDiv>
            <LinkDiv onClick={() => history.push(`/`)}>
              <Text size="h4">Forgot password?</Text>
            </LinkDiv>
            <LinkDiv onClick={() => history.push(`/signup`)}>
              <Text size="h4">Sign Up!</Text>
            </LinkDiv>
          </LinkContainerDiv>
        </Form>
      </Container>
    </PageLayout>
  );
};

export default SignIn;
