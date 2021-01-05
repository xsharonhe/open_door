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
import { RentalProps, RadarData, media, BarData } from "../utils";

type TParams = { id: string};

const CustomToastWithLink = () => (
    <div>
      For more information about how our analytics are designed, 
      feel free to visit our <SLink to="/faq">faq page</SLink>!
    </div>
);

export const Rental = ({
  match
}: RouteComponentProps<TParams>) => {
  const [error, setError] = useState(false);
  const [rentalResult, setRentalResult] = useState<RentalProps>();
  const [percentileData, setPercentileData] = useState<RadarData[]>([]);
  const [barData, setBarData] = useState<BarData[]>([]);
  useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/rentals_stats/${match.params.id}`)
            .then(res => {
                const query = res.data.query;
                setRentalResult(query);
                const statsObj = [
                  {
                    "category": "Price",
                    "percentile": res.data.price_perc
                  },
                  {
                    "category": "Beds",
                    "percentile": res.data.beds_perc,
                  },
                  {
                    "category": "Rooms",
                    "percentile": res.data.rooms_perc,
                  },
                  {
                    "category": "Capacity",
                    "percentile": res.data.capacity_perc,
                  },
                  {
                    "category": "Baths",
                    "percentile": res.data.baths_perc,
                  }
                ];
                setPercentileData(statsObj);

                const stats2Obj = [
                {
                  "level": 'This rental',
                  "night_price": res.data.query.night_price,
                  "night_price_color": "hsl(198, 70%, 50%)",
                  "num_of_baths": res.data.query.num_of_baths,
                  "num_of_baths_color": "hsl(246, 70%, 50%)",
                  "num_of_rooms": res.data.query.num_of_rooms,
                  "num_of_rooms_color": "hsl(69, 70%, 50%)",
                  "num_of_beds": res.data.query.num_of_beds,
                  "num_of_beds_color": "hsl(348, 70%, 50%)",
                  "capacity": res.data.query.capacity_of_people,
                  "capacity_color": "hsl(98, 70%, 50%)"
                },
                {
                  "level": "All",
                  "night_price": res.data.price_avg,
                  "night_price_color": "hsl(59, 70%, 50%)",
                  "num_of_baths": res.data.baths_avg,
                  "num_of_baths_color": "hsl(304, 70%, 50%)",
                  "num_of_rooms": res.data.rooms_avg,
                  "num_of_rooms_color": "hsl(261, 70%, 50%)",
                  "num_of_beds": res.data.beds_avg,
                  "num_of_beds_color": "hsl(348, 70%, 50%)",
                  "capacity": res.data.query.capacity_of_people,
                  "capacity_color": "hsl(187, 70%, 50%)"
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
        {!!rentalResult ? (
            <Wrapper>
              <SHeading>
                <span>How does</span>
                {` ${rentalResult.name} `}
                <span>compare with other Open Door rentals?</span>
              </SHeading>
              <SText>
                <StyledText isSuccess={rentalResult.reviews_count > 20}>
                  Status:
                    <span>{rentalResult.reviews_count > 20 ? 'VERIFIED' : 'NOT VERIFIED'}</span>
                  </StyledText>
                  <span>Verified rentals are rentals with more than 20 reviews.</span>
              </SText>
              <TextWrapper>
                <StyledText>
                    Nightly price:
                    <span>${rentalResult.night_price}</span>
                </StyledText>
                <StyledText>
                    Airbnb neighbourhood:
                    <span> {rentalResult.airbnb_neighborhood.concat(", New York, USA")}</span> 
                </StyledText>
                <StyledText>
                    Property type:
                    <span> {rentalResult.property_type}</span> 
                </StyledText>
                <StyledText>
                    Num of rooms:
                    <span> {rentalResult.num_of_rooms}</span> 
                </StyledText>
                <StyledText>
                    Capacity of people:
                    <span> {rentalResult.capacity_of_people}</span> 
                </StyledText>
                <StyledText>
                    Number of baths:
                    <span> {rentalResult.num_of_baths}</span> 
                </StyledText>
                <StyledText>
                    Number of beds:
                    <span>{rentalResult.num_of_beds}</span>
                </StyledText>
              </TextWrapper>
              <BarWrapper>
                <RadarWrapper>
                  <SText>
                    Percentile
                    <span> Use this radar chart to see this rental's percentile compared to all rentals</span>
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
                    Features Average
                    <span>Use this bar chart to compare this rental's features with all rentals</span> 
                  </SText>
                  <ResponsiveBar
                      data={barData}
                      keys={['num_of_baths', 'num_of_rooms', 'capacity', 'num_of_beds']}
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
                                  id: 'capacity'
                              },
                              id: 'dots'
                          },
                          {
                              match: {
                                  id: 'num_of_baths'
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
                          legend: 'Type of rentals',
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
                    Price average
                    <span>Use this bar chart to compare this rental's nightly price with all rentals</span> 
                  </SText>
                  <ResponsiveBar
                        data={barData}
                        keys={['night_price']}
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
                                    id: 'night_price'
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
                            legend: 'Type of rental',
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
          color: ${isSuccess ? theme.colors.success : theme.colors.caption}
      `}; 
    }
`;

export default Rental;