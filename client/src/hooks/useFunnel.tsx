import {useState} from 'react';

type UseFunnel = {
  defaultStep: string;
  stepList: string[];
};

type StepProps = {
  children: React.ReactNode;
  name: string;
};

type FunnelProps = {
  children: React.ReactElement<StepProps>[];
};

const useFunnel = ({defaultStep, stepList}: UseFunnel) => {
  const [step, setStep] = useState(defaultStep);

  const moveToNextStep = () => {
    const curStepIndex = stepList.indexOf(step);

    if (curStepIndex === stepList.length - 1) return;

    setStep(stepList[curStepIndex + 1]);
  };

  const moveToPrevStep = () => {
    const curStepIndex = stepList.indexOf(step);

    if (curStepIndex === 0) return;

    setStep(stepList[curStepIndex - 1]);
  };

  const Step = (stepProps: StepProps) => {
    return <>{stepProps.children}</>;
  };

  const Funnel = ({children}: FunnelProps) => {
    const targetStep = children.find(curStep => curStep.props.name === step);

    if (!targetStep)
      throw new Error(`현재 ${step} 단계에 보여줄 컴포넌트가 존재하지 않습니다. Step 컴포넌트를 호출해 사용해주세요.`);

    return <>{targetStep}</>;
  };

  return {
    Step,
    step,
    Funnel,
    moveToNextStep,
    moveToPrevStep,
  };
};

export default useFunnel;
