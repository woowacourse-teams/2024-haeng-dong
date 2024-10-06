import {SendStep} from '@hooks/useSendPage';

export type StepBase = {
  changeStep: (step: SendStep) => void;
};
