import * as amplitude from '@amplitude/analytics-browser';
import {create} from 'zustand';

import {Amplitude} from 'types/amplitude';

type State = {
  amplitude: Amplitude;
};

type Action = {};

export const useAmplitudeStore = create<State & Action>(() => ({
  amplitude: amplitude as Amplitude,
}));
