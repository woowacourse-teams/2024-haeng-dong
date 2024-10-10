const SessionStorage = {
  get: <T>(key: string): T | null => {
    const savedElement = sessionStorage.getItem(key);

    if (savedElement === null) {
      return null;
    }

    const element = JSON.parse(savedElement) as T;
    return element;
  },

  set: <T>(key: string, data: T) => {
    const element = JSON.stringify(data);
    sessionStorage.setItem(key, element);
  },
};

export default SessionStorage;
