type ImageProps = React.ComponentProps<'img'> & {
  src: string;
  fallbackSrc?: string;
};

const Image = ({src, fallbackSrc, ...htmlProps}: ImageProps) => {
  return (
    <picture>
      <source srcSet={src} />
      <img src={fallbackSrc} {...htmlProps} />
    </picture>
  );
};

export default Image;
