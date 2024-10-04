import {Button} from '@components/Design';

type MobileShareEventButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  text: string;
};

const MobileShareEventButton = ({text, ...buttonProps}: MobileShareEventButtonProps) => {
  return (
    <Button size="small" variants="tertiary" style={{marginRight: '1rem'}} {...buttonProps}>
      {text}
    </Button>
  );
};

export default MobileShareEventButton;
