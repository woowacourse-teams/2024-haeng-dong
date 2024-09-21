import {AddEventHandlerArgs, ToastEventCallbackMap} from './toastEventManager.type';

const toastEventManager = (() => {
  const eventList = new Map();

  return {
    // eventType은 ToastEventCallbackMap 중 하나의 값을 받고 이 값에 따라 callback타입이 결정됩니다.
    // 모티브는 addEventListener으로.. listener 인자에 적용되는 타입 narrowing방법을 흉내낸 것입니다.
    addEventHandler<K extends keyof ToastEventCallbackMap>({eventType, callback}: AddEventHandlerArgs<K>) {
      eventList.set(eventType, callback);
    },

    trigger<K extends keyof ToastEventCallbackMap>(eventType: K, ...args: any) {
      if (!eventList.has(eventType)) {
        throw new Error(`토스트 이벤트 핸들러에 등록된 ${eventType} 이벤트가 없습니다. 이벤트 등록 후 호출해주세요.`);
      }

      const callback = eventList.get(eventType);
      callback(...args);
    },
  };
})();

export default toastEventManager;
