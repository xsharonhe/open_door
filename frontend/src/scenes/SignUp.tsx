import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { PageLayout } from "../components/hoc/PageLayout";
import { HomeSmile } from "@styled-icons/boxicons-regular/HomeSmile";
import { Text } from "../components/Texts";
import { Input } from "../components/Inputs";
import { Button } from "../components/Containers";
import {
  Container,
  IconDiv,
  Icon,
  Form,
  LinkDiv,
} from "../components/Containers/Form";
import { signup } from "../store/actions/authActions";
import { connect } from "react-redux";
import Cookies from 'js-cookie';

interface ISignUp {
  username: string;
  password: string;
  verifyPassword: string;
  signup: Function;
  isAuthenticated: boolean;
}

const SignUp: React.FC<ISignUp> = ({
  signup,
  isAuthenticated,
  ...props
}): React.ReactElement => {

  const [creds, setCreds] = useState<Partial<Omit<ISignUp, "signup">>>({
    username: "",
    password: "",
    verifyPassword: ""
  });

  const [newAccount, setNewAccount] = useState(false);

  const { username, password, verifyPassword } = creds;

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = Cookies.get('csrftoken');

    if (password === verifyPassword) {
      signup(username, password, verifyPassword, token);
      setNewAccount(true);
    }
  };

  let history = useHistory();

  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  } else if (newAccount) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <PageLayout {...props}>
        <Container>
          <IconDiv>
            <Icon as={HomeSmile} />
          </IconDiv>
          <Text size="h3" color="primary" align="center" bold>
            Sign Up
          </Text>
          <Text color="primary" align="center">
            Please ensure your password is at least 8 characters.
          </Text>
          <Form>
            <Input
              placeholder="Username *"
              type="text"
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
            <Input
              placeholder="Verify Password *"
              type="password"
              value={creds.verifyPassword || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setCreds({ ...creds, verifyPassword: e.target.value.trim() });
              }}
            />
            <Button onClick={handleSignUp}>Sign Up</Button>
            <LinkDiv onClick={() => history.push(`/signin`)}>
              <Text size="h4" align="center">
                Have an account? <u>Sign In!</u>
              </Text>
            </LinkDiv>
          </Form>
        </Container>
      </PageLayout>
    );
  }
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignUp);
