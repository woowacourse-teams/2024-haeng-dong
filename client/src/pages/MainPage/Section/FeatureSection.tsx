import {css} from '@emotion/react';

import Text from '@components/Design/components/Text/Text';

const FeatureSection = () => {
  return (
    <>
      <div
        css={css({
          display: 'flex',
          height: '100vh',
          width: '100vw',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFA5B8',
        })}
      >
        <div
          css={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 4rem',
            alignItems: 'center',
            gap: '2rem',
            maxWidth: '1200px',
            '@media (max-width: 1024px)': {
              flexDirection: 'column-reverse',
            },
            '@media (min-width: 1200px)': {
              padding: '0',
            },
          })}
        >
          <div
            css={css({
              display: 'flex',
              width: 'max-content',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '1rem',
            })}
          >
            <Text size="subTitle" responsive={true}>
              누구와도 간편하게 정산하세요
            </Text>
            <Text size="body" responsive={true}>
              {`연락처가 없어도 링크만 보내면 끝!,
          모르는 사람과도 손쉽게 정산할 수 있어요.
          복잡한 절차 없이, 빠르게 정산을 마치세요.`}
            </Text>
          </div>
          <img
            src={`${process.env.IMAGE_URL}/feature1.svg`}
            css={css({
              minWidth: '15rem',
              maxWidth: '25rem',
              width: '100%',
              '@media (min-width: 1024px)': {
                minWidth: '20rem',
                maxWidth: '25rem',
                width: '100%',
              },
              '@media (min-width: 1600px)': {
                minWidth: '25rem',
                maxWidth: '30rem',
                width: '100%',
              },
            })}
          />
        </div>
      </div>

      <div
        css={css({
          display: 'flex',
          height: '100vh',
          width: '100vw',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        })}
      >
        <div
          css={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 4rem',
            alignItems: 'center',
            gap: '2rem',
            maxWidth: '1200px',
            '@media (max-width: 1024px)': {
              flexDirection: 'column',
            },
            '@media (min-width: 1200px)': {
              padding: '0',
            },
          })}
        >
          <img
            src={`${process.env.IMAGE_URL}/feature2.svg`}
            css={css({
              minWidth: '15rem',
              maxWidth: '25rem',
              width: '100%',
              '@media (min-width: 768px)': {
                minWidth: '20rem',
                maxWidth: '25rem',
                width: '100%',
              },
              '@media (min-width: 1600px)': {
                minWidth: '25rem',
                maxWidth: '30rem',
                width: '100%',
              },
            })}
          />
          <div
            css={css({
              display: 'flex',
              width: 'max-content',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '1rem',
            })}
          >
            <Text size="subTitle" responsive={true}>
              계산은 저희가 알아서 해드려요
            </Text>
            <Text size="body" responsive={true}>
              {`인원이나 메뉴에 따라 직접 계산할 필요 없어요.
              지출 내역만 기록하면 알아서 나눠 계산해 드려요.
              복잡한 계산은 이제 행동대장에게 맡기세요!`}
            </Text>
          </div>
        </div>
      </div>

      <div
        css={css({
          display: 'flex',
          height: '100vh',
          width: '100vw',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#DFC1FF',
        })}
      >
        <div
          css={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 4rem',
            alignItems: 'center',
            gap: '2rem',
            maxWidth: '1200px',
            '@media (max-width: 1024px)': {
              flexDirection: 'column-reverse',
            },
            '@media (min-width: 1200px)': {
              padding: '0',
            },
          })}
        >
          <div
            css={css({
              display: 'flex',
              width: 'max-content',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '1rem',
            })}
          >
            <Text size="subTitle" responsive={true}>
              입금 확인도 걱정 없어요
            </Text>
            <Text size="body" responsive={true}>
              {`매번 누가 입금했는지 따로 기억할 필요 없어요.
            참여자 관리 메뉴를 통해 더 이상 놓치는 사람 없이
            간편하게 관리할 수 있어요.`}
            </Text>
          </div>
          <img
            src={`${process.env.IMAGE_URL}/feature3.svg`}
            css={css({
              minWidth: '20rem',
              maxWidth: '30rem',
              width: '100%',
              '@media (min-width: 768px)': {
                minWidth: '25rem',
                maxWidth: '30rem',
                width: '100%',
              },
              '@media (min-width: 1600px)': {
                minWidth: '30rem',
                maxWidth: '35rem',
                width: '100%',
              },
            })}
          />
        </div>
      </div>

      <div
        css={css({
          display: 'flex',
          height: '100vh',
          width: '100vw',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        })}
      >
        <div
          css={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 4rem',
            alignItems: 'center',
            gap: '2rem',
            maxWidth: '1200px',
            '@media (max-width: 1024px)': {
              flexDirection: 'column',
            },
            '@media (min-width: 1200px)': {
              padding: '0',
            },
          })}
        >
          <img
            src={`${process.env.IMAGE_URL}/feature4.svg`}
            css={css({
              minWidth: '20rem',
              maxWidth: '30rem',
              width: '100%',
              '@media (min-width: 768px)': {
                minWidth: '25rem',
                maxWidth: '30rem',
                width: '100%',
              },
              '@media (min-width: 1600px)': {
                minWidth: '30rem',
                maxWidth: '35rem',
                width: '100%',
              },
            })}
          />
          <div
            css={css({
              display: 'flex',
              width: 'max-content',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '1rem',
            })}
          >
            <Text size="subTitle" responsive={true}>
              몇 번의 클릭으로 송금 완료!
            </Text>
            <Text size="body" responsive={true}>
              {`계좌번호나 금액을 일일이 확인하지 않아도 돼요.
            클릭 몇 번으로 바로 송금할 수 있어요.
            언제 어디서든 쉽게 정산을 끝내세요.`}
            </Text>
          </div>
        </div>
      </div>

      <div
        css={css({
          display: 'flex',
          height: '100vh',
          width: '100vw',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#C1CFFF',
        })}
      >
        <div
          css={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 4rem',
            alignItems: 'center',
            gap: '2rem',
            maxWidth: '1200px',
            '@media (max-width: 1024px)': {
              flexDirection: 'column-reverse',
            },
            '@media (min-width: 1200px)': {
              padding: '0',
            },
          })}
        >
          <div
            css={css({
              display: 'flex',
              width: 'max-content',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '1rem',
            })}
          >
            <Text size="subTitle" responsive={true}>
              추억도 간편하게 공유하세요
            </Text>
            <Text size="body" responsive={true}>
              {`모임에서 지출한 내역은 물론,
            그날의 사진과 추억도 함께 나눠보세요.
            정산은 투명하게, 추억은 오래오래 간직할 수 있어요.`}
            </Text>
          </div>
          <img
            src={`${process.env.IMAGE_URL}/feature5.svg`}
            css={css({
              minWidth: '20rem',
              maxWidth: '25rem',
              width: '100%',
              '@media (min-width: 768px)': {
                minWidth: '25rem',
                maxWidth: '30rem',
                width: '100%',
              },
              '@media (min-width: 1600px)': {
                minWidth: '30rem',
                maxWidth: '35rem',
                width: '100%',
              },
            })}
          />
        </div>
      </div>
    </>
  );
};

export default FeatureSection;
