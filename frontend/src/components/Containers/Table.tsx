import React from 'react';
import styled from 'styled-components';
import { media } from '../../utils';

export interface IDictOptions {
        id: string;
        labels: string[];
};

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
    data: IDictOptions[];
    columns: string[];
};

export const Table: React.FC<ITableProps> = ({
    data,
    columns,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <STable>
                <STableHead>
                    <SHeadTableRow>
                        {columns.map((column) => (
                            <STableHeader key={column}>
                                {column}
                            </STableHeader>
                        ))}
                    </SHeadTableRow>
                </STableHead>
                <tbody>
                    {data.map((row) => (
                        <STableRow key={row.id}>
                            {row.labels.map(cell => (
                                <STableData>
                                    {cell}
                                </STableData>
                            ))}
                        </STableRow>
                    ))}
                </tbody>
            </STable>
        </Wrapper>
    );
};
 
const Wrapper = styled.div`
    width: 100%;
    ${media(
        'tabletLarge',
        `
        width: 95%;
        display: column;
        justify-content: center;
        align-items: center;
        `,
    )}
`;
const STable = styled.table`
    padding: 10px 0;
    width: 50%;
`;
const STableHead = styled.thead`
    display: table;
    ${({ theme }) => `
        border-bottom: 1px solid ${theme.colors.caption};
    `};
`;
const STableData = styled.td`
    ${({ theme }): string => `
        ${media(
        'phone',
        `
        font-size: ${theme.size.small};
        `,
    )}
    `};
`;
const STableHeader = styled.th`
    text-align: left;
    margin-bottom: 20px;
    ${({ theme }): string => `
        ${media(
        'phone',
        `
        font-size: ${theme.size.defaultLarger};
        `,
    )}
    `};
`;
const SHeadTableRow = styled.tr`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
    margin: 0 10px;
    ${({ theme }): string => `
        font-size: ${theme.size.defaultLarger};
    `};
    overflow-x: auto;
`;
const STableRow = styled(SHeadTableRow)`
    ${({ theme }): string => `
        margin: 0 10px;
        padding: 20px;
        :hover {
            transform: ${theme.transitions.scale};
            transition: ${theme.transitions.cubicBezier};
            box-shadow: ${theme.boxShadow.topBottom};
        }
    `};
`;