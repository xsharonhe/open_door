import React from "react";
import { PageLayout } from '../components/hoc/PageLayout';

interface IProfile {};

const Profile: React.FC<IProfile> = (): React.ReactElement => {

  return (
      <PageLayout>
        <p>TODO: User Profile Page</p>
      </PageLayout>
  );
};

export default Profile;