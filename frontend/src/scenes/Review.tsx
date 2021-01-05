import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveBar } from '@nivo/bar';
import { RouteComponentProps } from "react-router-dom";
import { PageLayout } from '../components/hoc/PageLayout';
import { Heading, Text } from "../components";
import { ReviewProps, RadarData, media, BarDataReview } from "../utils";

type TParams = { id: string};

const CustomToastWithLink = () => (
    <div>
      For more information about how our analytics are designed, 
      feel free to visit our <SLink to="/faq">faq page</SLink>!
    </div>
);


export const Review = ({
  match
}: RouteComponentProps<TParams>) => {
  const [error, setError] = useState(false);
  const [reviewResult, setReviewResult] = useState<ReviewProps>();
  const [percentileData, setPercentileData] = useState<RadarData[]>([]);
  const [barData, setBarData] = useState<BarDataReview[]>([]);
  useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/reviews_stats/${match.params.id}`)
            .then(res => {
                const query = res.data.query;
                setReviewResult(query);
                const statsObj = [
                  {
                    "category": "Score",
                    "percentile": Math.round(res.data.score_perc * 100) / 100,
                  },
                  {
                    "category": "Rating",
                    "percentile": Math.round(res.data.rating_perc * 100) / 100,
                  },
                  {
                    "category": "Reviews count",
                    "percentile": Math.round(res.data.count_perc * 100) / 100,
                  },
                  {
                    "category": "Price",
                    "percentile": Math.round(res.data.price_perc * 100) / 100,
                  } 
                ];
                setPercentileData(statsObj);

                const stats2Obj = [
                {
                  "level": 'This restaurant',
                  "score": res.data.query.score,
                  "score_color": "hsl(69, 70%, 50%)",
                  "rating": res.data.query.rating,
                  "rating_color": "hsl(198, 70%, 50%)",
                  "count": res.data.query.review_count,
                  "count_color": "hsl(246, 70%, 50%)",
                  "price": res.data.query.price,
                  "price_color": "hsl(348, 70%, 50%)",
                },
                {
                  "level": "All",
                  "score": res.data.score_avg,
                  "score_color": "hsl(59, 70%, 50%)",
                  "rating": res.data.rating_avg,
                  "rating_color": "hsl(304, 70%, 50%)",
                  "count": res.data.count_avg,
                  "count_color": "hsl(261, 70%, 50%)",
                  "price": res.data.price_avg,
                  "price_color": "hsl(348, 70%, 50%)",
                }];

                setBarData(stats2Obj);
            })
            .catch(err => {
                setError(true);
            });
        notify();
  }, []);
  const notify = () => {
    toast(CustomToastWithLink);
  };
  return (
      <PageLayout>
        <SToastContainer autoClose={8000}/>
        {!!reviewResult ? (
            <Wrapper>
              <SHeading>
                <span>How does</span>
                {` ${reviewResult.name} `}
                <span>compare with other Open Door restaurants?</span>
              </SHeading>
              <SText>
                <StyledText isSuccess={reviewResult.review_count > 20}>
                  Status:
                    <span>{reviewResult.review_count > 200 ? 'VERIFIED' : 'NOT VERIFIED'}</span>
                  </StyledText>
                  <span>Verified rentals are rentals with more than 200 reviews.</span>
              </SText>
              <TextWrapper>
                <StyledText>
                    Status:
                    <span>{reviewResult.status}</span>
                </StyledText>
                <StyledText>
                    Address:
                    <span> {reviewResult.address.concat(", New York, USA")}</span> 
                </StyledText>
                <StyledText>
                    Phone Number:
                    <span>{reviewResult.display_phone}</span>
                </StyledText>
                <StyledText>
                    Price:
                    <span>{reviewResult.price} from a scale of 1 to 4</span>
                </StyledText>
                <StyledText>
                    Rating:
                    <span>{reviewResult.rating}</span>
                </StyledText>
                <StyledText>
                    Score:
                    <span>{reviewResult.score}</span>
                </StyledText>
                <StyledText>
                    Status:
                    <span>{reviewResult.status}</span>
                </StyledText>
                <SText>
                    Summary Review Sentiment:
                    <span> {reviewResult.summary}</span> 
                </SText>
              </TextWrapper>
              <BarWrapper>
                <RadarWrapper>
                  <SText>
                    Percentile
                    <span> Use this radar chart to see this restaurant's percentile compared to all restaurants</span>
                  </SText>
                    <ResponsiveRadar
                      data={percentileData}
                      keys={['percentile']}
                      indexBy="category"
                      maxValue={100}
                      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                      curve="linearClosed"
                      borderWidth={2}
                      borderColor={{ from: 'color' }}
                      gridLevels={10}
                      gridShape="circular"
                      gridLabelOffset={36}
                      enableDots={true}
                      dotSize={10}
                      dotColor={{ theme: 'background' }}
                      dotBorderWidth={2}
                      dotBorderColor={{ from: 'color' }}
                      enableDotLabel={true}
                      dotLabel="value"
                      dotLabelYOffset={-12}
                      colors={{ scheme: 'nivo' }}
                      fillOpacity={0.25}
                      blendMode="multiply"
                      animate={true}
                      isInteractive={true}
                  />
                </RadarWrapper>
                <RadarWrapper>
                  <SText>
                    Stats Average
                    <span>Use this bar chart to compare this restaurant's stats with all restaurants</span> 
                  </SText>
                  <ResponsiveBar
                      data={barData}
                      keys={['score', 'rating', 'price']}
                      indexBy="level"
                      groupMode="grouped"
                      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                      padding={0.3}
                      valueScale={{ type: 'linear' }}
                      indexScale={{ type: 'band', round: true }}
                      colors={{ scheme: 'nivo' }}
                      defs={[
                          {
                              id: 'dots',
                              type: 'patternDots',
                              background: 'inherit',
                              color: '#38bcb2',
                              size: 4,
                              padding: 1,
                              stagger: true
                          },
                          {
                              id: 'lines',
                              type: 'patternLines',
                              background: 'inherit',
                              color: '#eed312',
                              rotation: -45,
                              lineWidth: 6,
                              spacing: 10
                          }
                      ]}
                      fill={[
                          {
                              match: {
                                  id: 'count'
                              },
                              id: 'dots'
                          },
                          {
                              match: {
                                  id: 'rating'
                              },
                              id: 'lines'
                          },
                      ]}
                      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'Type of restaurants',
                          legendPosition: 'middle',
                          legendOffset: 32
                      }}
                      axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'Count',
                          legendPosition: 'middle',
                          legendOffset: -40
                      }}
                      enableLabel={false}
                      legends={[
                          {
                              dataFrom: 'keys',
                              anchor: 'bottom-right',
                              direction: 'column',
                              justify: false,
                              translateX: 120,
                              translateY: 0,
                              itemsSpacing: 2,
                              itemWidth: 100,
                              itemHeight: 20,
                              itemDirection: 'left-to-right',
                              itemOpacity: 0.85,
                              symbolSize: 20,
                              effects: [
                                  {
                                      on: 'hover',
                                      style: {
                                          itemOpacity: 1
                                      }
                                  }
                              ]
                          }
                      ]}
                      animate={true}
                      motionStiffness={90}
                      motionDamping={15}
                  />
                </RadarWrapper>
                <RadarWrapper style={{ width: 300 }}>
                  <SText>
                    Review average
                    <span>Use this bar chart to compare this restaurant's review count with all restaurants</span> 
                  </SText>
                  <ResponsiveBar
                        data={barData}
                        keys={['count']}
                        indexBy="level"
                        groupMode="grouped"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        defs={[
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'rating'
                                },
                                id: 'lines'
                            }
                        ]}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Type of restaurants',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Nightly price',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        enableLabel={false}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </RadarWrapper> 
            </BarWrapper>
        </Wrapper>
        ) : (
          <SText>
            Content cannot be found.
          </SText>
        )}  
      </PageLayout>
  );
};
const Wrapper = styled.div`
    padding-bottom: 100px;
    ${media("tablet",
    `
        padding: 0 20px;
    `)};
`;
const RadarWrapper = styled.div`
    height: 300px;
    width: 400px;
    align-items: center;
    justify-content: center;
    margin: 10px;
    ${media("1364",
    `
        height: 300px;
        width: 300px;
        margin-bottom: 40px;
    `)};
`;
const BarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    ${media("1028",
    `
        flex-direction: column;
        align-items: center;
    `)};
`;
const SHeading = styled(Heading)`
    ${({ theme }) => `
        span {
          color: ${theme.colors.caption};
        }
        ${media("tablet",
        `
            font-size: ${theme.size.defaultLarger};
        `)}
    `};
`;
const SToastContainer = styled(ToastContainer)`
    ${({ theme }) => `
        .Toastify__toast {
            border-radius: ${theme.radius.border};
            padding: 20px;
            font-family: ${theme.font.body};
            color: ${theme.colors.background};
            background-color: ${theme.colors.primary};
        }
    `};
`;
const SLink = styled(Link)`
    ${({ theme }) => `
        color: ${theme.colors.secondary};
        text-decoration: underline;
        font-weight: 700;
    `};
`;
const SText = styled(Text)`
    ${({ theme }) => `
        font-size: ${theme.size.h3};
        color: ${theme.colors.primary};
        font-weight: 500;

        span {
          font-size: ${theme.size.default};
          color: ${theme.colors.caption};
          font-weight: 400;
        }
    `};
    display: flex;
    flex-direction: column;
    padding: -10px 20px;
    margin-bottom: -20px;
`;
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
`;
interface StyledTextProps {
    isSuccess?: boolean;
}
const StyledText = styled(SText)<StyledTextProps>`
    flex-direction: row;
    align-items: center;
    margin: 5px 0;
    
    span {
      margin-left: 8px;
      ${({ theme, isSuccess }) => `
          font-size: ${theme.size.defaultLarger};
          color: ${isSuccess ? theme.colors.success : theme.colors.caption};
      `}; 
    }
`;

export default Review;