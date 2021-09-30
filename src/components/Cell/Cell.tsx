import React from 'react';
import './Cell.scss';

type Props = {
  value: string;
  clickOnCell: () => void;
};

export const Cell: React.FC<Props> = (props) => {
  const { value, clickOnCell } = props;

  return (
    <button
      type="button"
      className="Cell"
      onClick={clickOnCell}
    >
      {value}
    </button>
  );
};
