export interface FooterStyleProps {}

export interface FooterCustomProps {}

export type FooterOptionProps = FooterStyleProps & FooterCustomProps;

export type FooterProps = React.ComponentProps<'footer'> & FooterOptionProps;
