import React from 'react';
import { uuid } from 'uuidv4';
import { Cell } from '../Cell/Cell';
import './Board.scss';

type Props = {
  cells: string[];
  clickOnCell: (i: number) => void;
};

export const Board: React.FC<Props> = (props) => {
  const { cells, clickOnCell } = props;

  return (
    <div className="Board">
      {cells.map((cell, i) => (
        <Cell
          value={cell}
          key={uuid()}
          clickOnCell={() => {
            clickOnCell(i);
          }}
        />
      ))}
    </div>
  );
};
