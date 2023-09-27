import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { CustomSwitcher } from './CustomSwitcher';
import { CSSOverrides } from './CustomSwitcher.types';

import image1 from './assets/1.jpg';
import image1thumbnail from './assets/1s.jpg';
import image2 from './assets/2.jpg';
import image2thumbnail from './assets/2s.jpg';
import image3 from './assets/3.jpg';
import image3thumbnail from './assets/3s.jpg';
import image4 from './assets/4.jpg';
import image4thumbnail from './assets/4s.jpg';
import image5 from './assets/5.jpg';
import image5thumbnail from './assets/5s.jpg';
import playIcon from './assets/play.svg';
import pauseIcon from './assets/pause.svg';

export default {
  title: 'Customization/Demo',
  component: CustomSwitcher,
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#111111' },
      ],
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Roboto, sans-serif',
        }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const optionsDemo = [
  {
    label: (
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundImage: `url(${image1thumbnail})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          border: '1px solid #fff',
        }}
      />
    ),
    value: '0',
    color: '#db126a',
  },
  {
    label: (
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundImage: `url(${image2thumbnail})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          border: '1px solid #fff',
        }}
      />
    ),
    value: '1',
    color: '#e3611e',
  },
  {
    label: (
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundImage: `url(${image3thumbnail})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          border: '1px solid #fff',
        }}
      />
    ),
    value: '2',
    color: '#d54692',
  },
  {
    label: (
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundImage: `url(${image4thumbnail})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          border: '1px solid #fff',
        }}
      />
    ),
    value: '3',
    color: '#fe0000',
  },
  {
    label: (
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundImage: `url(${image5thumbnail})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          border: '1px solid #fff',
        }}
      />
    ),
    value: '4',
    color: '#770656',
  },
];

const demoCSSOverrides: CSSOverrides = {
  division: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  switch: {
    border: '6px solid',
  },
};

const authors = [
  <span key={'author-1'}>
    Photo by{' '}
    <a
      href="https://unsplash.com/@agk42?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Alex Knight
    </a>{' '}
    on{' '}
    <a
      href="https://unsplash.com/photos/5-GNa303REg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Unsplash
    </a>
  </span>,
  <span key={'author-2'}>
    Photo by{' '}
    <a
      href="https://unsplash.com/@miyatankun?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Takashi Miyazaki
    </a>{' '}
    on{' '}
    <a
      href="https://unsplash.com/photos/64ajtpEzlYc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Unsplash
    </a>
  </span>,
  <span key={'author-3'}>
    Photo by{' '}
    <a
      href="https://unsplash.com/@sorasagano?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Sora Sagano
    </a>{' '}
    on{' '}
    <a
      href="https://unsplash.com/photos/8sOZJ8JF0S8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Unsplash
    </a>
  </span>,
  <span key={'author-4'}>
    Photo by{' '}
    <a
      href="https://unsplash.com/@jezar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Jezael Melgoza
    </a>{' '}
    on{' '}
    <a
      href="https://unsplash.com/photos/To5wAJDt1IM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Unsplash
    </a>
  </span>,
  <span key={'author-5'}>
    Photo by{' '}
    <a
      href="https://unsplash.com/@agk42?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Alex Knight
    </a>{' '}
    on{' '}
    <a
      href="https://unsplash.com/photos/DpPutJwgyW8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      target="_blank"
      rel="noreferrer"
      style={{ color: '#fff' }}>
      Unsplash
    </a>
  </span>,
];

const Template: StoryFn<typeof CustomSwitcher> = () => {
  const [currentImageValue, setCurrentImageValue] = React.useState(0);
  const [play, setPlay] = React.useState(false);

  const handleSelectImage = (currentImage: string) => {
    setPlay(false);
    setCurrentImageValue(parseInt(currentImage, 10));
  };

  React.useEffect(() => {
    const letsPlay = () => {
      if (play) {
        if (currentImageValue < 4) {
          setCurrentImageValue(currentImageValue + 1);
        } else {
          setCurrentImageValue(0);
        }
      }
    };

    const interval = setInterval(letsPlay, 1700);
    return () => clearInterval(interval);
  }, [play, currentImageValue]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#111',
        position: 'relative',
      }}>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image1})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: currentImageValue === 0 ? 1 : 0,
          transition: 'opacity 1s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image2})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: currentImageValue === 1 ? 1 : 0,
          transition: 'opacity 1s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image3})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: currentImageValue === 2 ? 1 : 0,
          transition: 'opacity 1s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image4})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: currentImageValue === 3 ? 1 : 0,
          transition: 'opacity 1s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image5})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: currentImageValue === 4 ? 1 : 0,
          transition: 'opacity 1s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 370,
          height: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#111',
            opacity: 0.7,
            borderRadius: 50,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -60,
            width: 50,
            height: 50,
            backgroundColor: '#fff',
            opacity: 0.85,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setPlay(!play)}>
          {!play ? (
            <img src={playIcon} style={{ width: 48, height: 48 }} />
          ) : (
            <img src={pauseIcon} style={{ width: 40, height: 40 }} />
          )}
        </div>
        <CustomSwitcher
          value={currentImageValue.toString()}
          options={optionsDemo}
          dragEnabled={!play}
          variant={'secondary'}
          containerWidth={350}
          switchSize={63}
          cssOverrides={demoCSSOverrides}
          callback={handleSelectImage}
          scaleWhileDrag={false}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: 4,
          borderRadius: 4,
          backgroundColor: '#111',
          opacity: 0.85,
          textAlign: 'center',
          color: '#fff',
          fontSize: 12,
        }}>
        {authors[currentImageValue]}
      </div>
    </div>
  );
};

export const Demo = Template.bind({});
