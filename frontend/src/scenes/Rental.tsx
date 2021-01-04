import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ResponsiveRadar } from '@nivo/radar';
import { RouteComponentProps } from "react-router-dom";
import { PageLayout } from '../components/hoc/PageLayout';
import {
  Heading,
} from "../components";
import { RentalProps, RadarData, media } from "../utils";

type TParams = { id: string};

export const Rental = ({
  match
}: RouteComponentProps<TParams>) => {
  const [error, setError] = useState(false);
  const [rentalResult, setRentalResult] = useState<RentalProps>();
  const [percentileData, setPercentileData] = useState<RadarData[]>([]);
  useEffect(() => {
        axios
            .get(`http://localhost:8000/api/v1/rentals_stats/${match.params.id}`)
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
            })
            .catch(err => {
                setError(true);
            });
  }, []);
  return (
      <PageLayout>
        {!!rentalResult && (
            <Wrapper>
              <Heading>{rentalResult.name}</Heading>
            </Wrapper>
        )}  
        <RadarWrapper>
            <ResponsiveRadar
              data={percentileData}
              keys={['percentile']}
              indexBy="category"
              maxValue={100}
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              curve="linearClosed"
              borderWidth={2}
              borderColor={{ from: 'color' }}
              gridLevels={5}
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
      </PageLayout>
  );
};

const Wrapper = styled.div`
`;
const RadarWrapper = styled.div`
    height: 500px;
    width: 500px;
    ${media("mobile",
    `
        height: 300px;
        width: 300px;
    `)}
`;

export default Rental;