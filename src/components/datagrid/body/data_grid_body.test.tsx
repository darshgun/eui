/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';

import { DataGridSortingContext } from '../data_grid_context';
import { schemaDetectors } from '../data_grid_schema';
import { RowHeightUtils } from '../row_height_utils';

import { EuiDataGridBody, getParentCellContent } from './data_grid_body';

describe('EuiDataGridBody', () => {
  const requiredProps = {
    isFullScreen: false,
    headerIsInteractive: true,
    rowCount: 1,
    toolbarHeight: 10,
    columnWidths: { columnA: 20 },
    columns: [
      { id: 'columnA', schema: 'boolean' },
      { id: 'columnB', isExpandable: true },
    ],
    schema: {
      columnA: { columnType: 'boolean' },
      columnB: { columnType: 'string' },
    },
    renderCellValue: () => <span>cell content</span>,
    interactiveCellId: 'someId',
    inMemory: { level: 'enhancements' as any },
    inMemoryValues: {},
    setColumnWidth: jest.fn(),
    handleHeaderMutation: jest.fn(),
    setVisibleColumns: jest.fn(),
    switchColumnPos: jest.fn(),
    schemaDetectors,
    rowHeightUtils: new RowHeightUtils(),
  };

  it('renders', () => {
    const component = mount(<EuiDataGridBody {...requiredProps} />);
    expect(component).toMatchSnapshot();
    expect(component.find('Cell')).toHaveLength(2);
  });

  it('renders leading columns, trailing columns, and footer rows', () => {
    const component = mount(
      <EuiDataGridBody
        {...requiredProps}
        leadingControlColumns={[
          {
            id: 'someLeadingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 30,
          },
        ]}
        trailingControlColumns={[
          {
            id: 'someTrailingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 40,
          },
        ]}
        renderFooterCellValue={() => <footer data-test-subj="footer" />}
      />
    );
    expect(component.find('Cell')).toHaveLength(4);
    expect(component.find('[data-test-subj="footer"]')).toHaveLength(2);
  });

  // TODO: This is likely better handled/asserted by Cypress.
  // I'm leaving it in for now to provide an example of props/inMemoryValues
  it('handles in-memory sorting and pagination', () => {
    mount(
      <DataGridSortingContext.Provider
        value={{
          onSort: jest.fn(),
          columns: [
            { id: 'columnA', direction: 'desc' },
            { id: 'columnB', direction: 'asc' },
          ],
        }}
      >
        <EuiDataGridBody
          {...requiredProps}
          inMemory={{ level: 'sorting' }}
          inMemoryValues={{
            '0': { columnA: 'true', columnB: 'sdff' },
            '1': { columnA: 'false', columnB: 'asdfsdf' },
          }}
          pagination={{
            pageIndex: 0,
            pageSize: 1,
            onChangeItemsPerPage: jest.fn(),
            onChangePage: jest.fn(),
          }}
        />
      </DataGridSortingContext.Provider>
    );
  });

  // TODO: Test final height/weights in Cypress
  it('calculates height and widths', () => {
    mount(
      <EuiDataGridBody
        {...requiredProps}
        rowHeightsOptions={{ defaultHeight: 10, rowHeights: { 0: 20 } }}
        defaultColumnWidth={50}
      />
    );
  });

  // TODO: Test tabbing in Cypress

  // TODO: Test column resizing in Cypress
});

describe('getParentCellContent', () => {
  const doc = document.createDocumentFragment();

  const body = document.createElement('body');
  doc.appendChild(body);

  const cell = document.createElement('div');
  cell.setAttribute('data-datagrid-cellcontent', 'true');
  body.appendChild(cell);

  const span = document.createElement('span');
  span.textContent = 'Here comes the text';
  cell.appendChild(span);

  const text = span.childNodes[0];

  it('locates the cell element when starting with the cell itself', () => {
    expect(getParentCellContent(cell)).toBe(cell);
  });

  it('locates the cell element when starting with an element inside the cell', () => {
    expect(getParentCellContent(span!)).toBe(cell);
  });

  it('locates the cell element when starting with a text node inside the cell', () => {
    expect(getParentCellContent(text!)).toBe(cell);
  });

  it('does not locate the cell element when starting outside the cell', () => {
    expect(getParentCellContent(body)).toBeNull();
  });
});
