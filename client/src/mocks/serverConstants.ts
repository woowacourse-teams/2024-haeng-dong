import {BASE_URL} from '@apis/baseUrl';
import {TEMP_PREFIX} from '@apis/tempPrefix';

export const VALID_EVENT_NAME_LENGTH_IN_SERVER = {
  min: 2,
  max: 30,
};

export const MSW_TEMP_PRIFIX = process.env.NODE_ENV === 'test' ? TEMP_PREFIX : `${BASE_URL.HD}${TEMP_PREFIX}`;
