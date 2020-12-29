import React from 'react';
import styled from 'styled-components';
import { useTable, Column, TableProps, TableHeaderProps, TableRowProps } from 'react-table';
import { media } from '../../utils';

export interface IDictOptions {
    [key: string]: string;
};

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
    data: IDictOptions[];
    columns: Column<IDictOptions>[];
    tableHeaderProps?: TableHeaderProps;
    tableRowProps?: TableRowProps;
    tableProps?: TableProps;
};

export const Table: React.FC<ITableProps> = ({
    data,
    columns,
    tableHeaderProps,
    tableRowProps,
    tableProps,
    ...props
}): React.ReactElement => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns, 
        data
    });

    return (
        <Wrapper {...props}>
            <STable {...getTableProps()} {...tableProps}>
                <STableHead>
                    {headerGroups.map((headerGroup, index) => (
                        <SHeadTableRow
                            {...headerGroup.getHeaderGroupProps()}
                            key={headerGroup.headers[index].Header?.toString()}
                        >
                            {headerGroup.headers.map((column) => (
                                <STableHeader
                                    {...column.getHeaderProps()}
                                    key={column.Header?.toString()}
                                    {...tableHeaderProps}
                                >
                                    {column.render('Header')}
                                </STableHeader>
                            ))}
                        </SHeadTableRow>
                    ))}
                </STableHead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <STableRow {...row.getRowProps()} key={row.original.id} {...tableRowProps}>
                                {row.cells.map(cell => (
                                    <STableData {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </STableData>
                                ))}
                            </STableRow>
                        );
                    })}
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
    display: block;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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