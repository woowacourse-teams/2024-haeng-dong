/** @jsxImportSource @emotion/react */
import {BankIconId} from '@constants/bank';

type BankIconProps = {
  iconId: BankIconId;
  size?: number;
} & React.SVGAttributes<SVGElement>;

export const BankIcon = ({iconId, size = 36, className}: BankIconProps) => {
  return (
    <svg className={className} fill="none" width={size} height={size}>
      <use href={`#${iconId}`} />
    </svg>
  );
};
