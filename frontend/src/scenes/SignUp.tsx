import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PageLayout } from "../components/hoc/PageLayout";
import { HomeSmile } from "@styled-icons/boxicons-regular/HomeSmile";
import { Text } from "../components/Texts";
import { Input } from "../components/Inputs";
import { Button } from "../components/Containers";
import { Container, IconDiv, Icon, Form, LinkDiv } from "../components/Containers/Form";
import axios from "axios";

interface ISignUp {
    username: string;
    password: string;
}

const SignUp: React.FC<ISignUp> = ({ ...props }): React.ReactElement => {
    const [creds, setCreds] = useState<ISignUp>({
        username: "",
        password: ""
    });

    const [error, setError] = useState(false);

    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios
        .post("http://127.0.0.1:8000/api/v1/users/register/", 
        {
            username: creds.username,
            password: creds.password,
            person: {
                "budget": "0.00",
                "rental_budget": "0.00",
                "food_budget": "0.00",
                "gym_budget": "0.00",
                "transportation_budget": "0.00",
                "other_budget": "0.00",
                "fav_rental_id": "" ,
                "fav_food_id": "",
            }
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            const newUserInfo = res.data;

            history.push({
                pathname: `/dashboard/${res.data.user.id}`,
                state: { newUserInfo }
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
          <Icon as={HomeSmile} />
        </IconDiv>
        <Text size="h3" color="primary" align="center" bold>
          Sign Up
        </Text>
        <Form>
          <Input 
            placeholder="Username *"
            value={creds.username || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setCreds({...creds, username: e.target.value.trim() });
            }} 
        />
          <Input 
            placeholder="Password *" 
            type="password"
            value={creds.password || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setCreds({...creds, password: e.target.value.trim() });
            }} 
          />
          <Button onClick={handleSignUp}>Sign Up</Button>
          <LinkDiv onClick={() => history.push(`/signin`)}>
            <Text size="h4" align="center">
              Have an account? Sign In!
            </Text>
          </LinkDiv>
        </Form>
      </Container>
    </PageLayout>
  );
};

export default SignUp;
