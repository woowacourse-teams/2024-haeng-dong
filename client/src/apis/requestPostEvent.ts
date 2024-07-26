import {requestPost} from './fetcher';

interface RequestPostEventProps {
  name: string;
}

export const requestPostEvent = async ({name}: RequestPostEventProps) => {
  await requestPost({
    headers: {'Content-Type': 'application/json'},
    body: {name},
    endpoint: '/api/events',
  });
};
