import {SetInitialParticipants} from '../../components/Modal/SetInitialParticipants';
import {Modal} from '../../components/Modal';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {SetActionModalContent} from '../../components/Modal/SetActionModalContent';
import {orderFooterStyle, orderHeaderStyle} from './Event.style';

export type PurchaseInformation = {
  name: string;
  price: number;
};

const Event = () => {
  const {eventId} = useParams();
  const [open, setOpen] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [order, setOrder] = useState(0);

  const [purchaseInformation, setPurchaseInformation] = useState<PurchaseInformation>({
    name: '',
    price: 0,
  });

  const setParticipantsAndModalClose = (participants: string[]) => {
    setParticipants(participants);
    setOrder(1);
    setOpen(false);
  };

  return (
    <section>
      <h1>{eventId}</h1>
      <h3>“초기인원 설정하기” 버튼을 눌러서 행사 초기 인원을 설정해 주세요.</h3>
      {order > 0 && (
        <article>
          <header css={orderHeaderStyle}>
            <h4>{`${order}차`}</h4>
            <p>{`${participants.length}명`}</p>
          </header>
          <section>
            <h5>{purchaseInformation.name}</h5>
            <p>{purchaseInformation.price.toLocaleString()}</p>
          </section>
          <footer css={orderFooterStyle}>
            <h6>총액</h6>
            <p>{purchaseInformation.price.toLocaleString()}</p>
          </footer>
        </article>
      )}
      <button onClick={() => setOpen(prev => !prev)}>
        {participants.length === 0 ? '초기인원 설정하기' : '행동 추가하기'}
      </button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          {participants.length === 0 ? (
            <SetInitialParticipants setParticipantsAndModalClose={setParticipantsAndModalClose} />
          ) : (
            <SetActionModalContent
              setOpen={setOpen}
              participants={participants}
              setParticipants={setParticipants}
              purchaseInformation={purchaseInformation}
              setPurchaseInformation={setPurchaseInformation}
            />
          )}
        </Modal>
      )}
    </section>
  );
};

export default Event;
