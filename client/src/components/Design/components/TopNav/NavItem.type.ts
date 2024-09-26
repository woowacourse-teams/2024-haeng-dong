export type NavItemOptionProps = {
  displayName?: string;
  onHandleRouteInFunnel?: () => void;
};

export type NavItemRequireProps = {
  routePath: string;
};

export type NavItemStyleProps = {
  noEmphasis?: boolean;
};

export type NavItemProps = NavItemRequireProps & NavItemOptionProps & NavItemStyleProps & React.PropsWithChildren;
