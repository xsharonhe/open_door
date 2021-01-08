import React from "react";
import { PageLayout } from '../components/hoc/PageLayout';
import ReactMarkdown from "react-markdown";

interface IFaq {};

const Faq: React.FC<IFaq> = (): React.ReactElement => {
  const markdown =` 
  # What is Open Door?
  As university students, we created a 
  `;
  return (
      <PageLayout>
        <ReactMarkdown source={markdown} />
      </PageLayout>
  );
};

export default Faq;