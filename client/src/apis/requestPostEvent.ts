import {requestPost} from './fetcher';

interface RequestPostEventProps {
  name: string;
}

export const requestPostEvent = async ({name}: RequestPostEventProps) => {
  requestPost({
    headers: {'Content-Type': 'application/json'},
    body: {name},
    endpoint: '/api/events',
  });
};
