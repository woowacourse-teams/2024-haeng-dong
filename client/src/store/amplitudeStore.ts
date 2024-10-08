import * as amplitude from '@amplitude/analytics-browser';
import {Amplitude} from 'types/amplitude';

import {create} from 'zustand';

type State = {
  amplitude: Amplitude;
};

type Action = {};

export const useAmplitudeStore = create<State & Action>(() => ({
  amplitude: amplitude as Amplitude,
}));
