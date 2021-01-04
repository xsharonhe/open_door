import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { PageLayout } from '../components/hoc/PageLayout';

interface IDashboard {};

const Dashboard: React.FC<IDashboard> = (): React.ReactElement => {

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    console.log(location.state);
  }, [location]);

  return (
      <PageLayout>
        <p>TODO: User Dashboard Page</p>
      </PageLayout>
  );
};

export default Dashboard;