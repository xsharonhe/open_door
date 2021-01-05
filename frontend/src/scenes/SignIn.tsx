import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
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
import { signin } from "../store/actions/authActions";
import { connect } from "react-redux";
import Cookies from 'js-cookie';

interface ISignIn {
  username: string;
  password: string;
  signin: Function;
  isAuthenticated: boolean;
}

const SignIn: React.FC<ISignIn> = ({ 
  signin,
  isAuthenticated,
  ...props 
}): React.ReactElement => {

  const [creds, setCreds] = useState<Partial<Omit<ISignIn, "signin">>>({
    username: "",
    password: ""
  });

  const [error, setError] = useState(false);

  const { username, password } = creds;

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = Cookies.get('csrftoken');

    signin(username, password, token);
  };

  let history = useHistory();

  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  } else {
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
                <Text size="h4"><u>Sign Up!</u></Text>
              </LinkDiv>
            </LinkContainerDiv>
          </Form>
        </Container>
      </PageLayout>
    );
  }
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signin })(SignIn);