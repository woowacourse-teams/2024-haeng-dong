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
            <Text size="subTitle">누구와도 간편하게 정산하세요</Text>
            <Text size="body">
              {`연락처가 없어도 링크만 보내면 끝!,
          모르는 사람과도 손쉽게 정산할 수 있어요.
          복잡한 절차 없이, 빠르게 정산을 마치세요.`}
            </Text>
          </div>
          <img src={`${process.env.IMAGE_URL}/feature1.svg`} />
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
          })}
        >
          <img src={`${process.env.IMAGE_URL}/feature2.svg`} css={css({})} />
          <div
            css={css({
              display: 'flex',
              width: 'max-content',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '1rem',
            })}
          >
            <Text size="subTitle">계산은 저희가 알아서 해드려요</Text>
            <Text size="body">
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
            <Text size="subTitle">누구와도 간편하게 정산하세요</Text>
            <Text size="body">
              {`연락처가 없어도 링크만 보내면 끝!,
          모르는 사람과도 손쉽게 정산할 수 있어요.
          복잡한 절차 없이, 빠르게 정산을 마치세요."`}
            </Text>
          </div>
          <img src={`${process.env.IMAGE_URL}/feature3.svg`} css={css({})} />
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
          })}
        >
          <img
            src={`${process.env.IMAGE_URL}/feature4.svg`}
            css={css({
              width: '50%',
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
            <Text size="subTitle">누구와도 간편하게 정산하세요</Text>
            <Text size="body">
              {`연락처가 없어도 링크만 보내면 끝!,
          모르는 사람과도 손쉽게 정산할 수 있어요.
          복잡한 절차 없이, 빠르게 정산을 마치세요."`}
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
            <Text size="subTitle">누구와도 간편하게 정산하세요</Text>
            <Text size="body">
              {`연락처가 없어도 링크만 보내면 끝!,
          모르는 사람과도 손쉽게 정산할 수 있어요.
          복잡한 절차 없이, 빠르게 정산을 마치세요."`}
            </Text>
          </div>
          <img src={`${process.env.IMAGE_URL}/feature5.svg`} css={css({})} />
        </div>
      </div>
    </>
  );
};

export default FeatureSection;
