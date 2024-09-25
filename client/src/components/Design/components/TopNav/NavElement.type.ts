export type NavElementOptionProps = {
  displayName?: string;
  onHandleRouteInFunnel?: () => void;
};

export type NavElementRequireProps = {
  routePath: string;
};

export type NavElementStyleProps = {
  noEmphasis?: boolean;
};

export type NavElementProps = NavElementRequireProps &
  NavElementOptionProps &
  NavElementStyleProps &
  React.PropsWithChildren;
