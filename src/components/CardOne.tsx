import { FunctionComponent, type CSSProperties } from "react";
import styled from "styled-components";

export type CardOneType = {
  className?: string;
  dataSecurity?: string;
  azureSecurity?: string;
  ytedwHjadlskyaudsBjsjkaUsdkiyudb?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
};

const FrameChild = styled.div<{
  propBackgroundColor?: CSSProperties["backgroundColor"];
}>`
  width: 9px;
  height: 9px;
  position: relative;
  border-radius: 50%;
  background-color: var(--color-deeppink);
  z-index: 1;
  background-color: ${(p) => p.propBackgroundColor};
`;
const CardOneActionsInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-12xs) 0px 0px;
`;
const DataSecurity = styled.div`
  position: relative;
  font-weight: 500;
  display: inline-block;
  min-width: 55px;
  z-index: 1;
`;
const CardOneActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-8xs);
`;
const AzureSecurity = styled.h3<{
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
}>`margin: 0;
  position: relative;
  font-size: var(--font-size-lg);
  font-weight: 500;
  font-family: inherit;
  color: var(--color-black);
  display: inline-block;
  min-width: 129px;
  z-index: 1;
  display: ${(p) => p.propDisplay}
  min-width: ${(p) => p.propMinWidth}
`;
const CardOneDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const CardTwoContentChild = styled.img`
  width: 16px;
  height: 2px;
  position: relative;
  z-index: 1;
`;
const CardTwoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-7xs) 0px 0px;
`;
const CardOneContent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--gap-xl);
`;
const YtedwHjadlskyaudsBjsjka = styled.div`
  align-self: stretch;
  position: relative;
  font-size: var(--font-size-xs);
  color: var(--color-black);
  z-index: 1;
`;
const CardOneRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
  text-align: left;
  font-size: var(--font-size-5xs);
  color: var(--color-dimgray);
  font-family: var(--font-poppins);
`;

const CardOne: FunctionComponent<CardOneType> = ({
  className = "",
  propBackgroundColor,
  dataSecurity,
  azureSecurity,
  propDisplay,
  propMinWidth,
  ytedwHjadlskyaudsBjsjkaUsdkiyudb,
}) => {
  return (
    <CardOneRoot className={className}>
      <CardOneContent>
        <CardOneDetails>
          <CardOneActions>
            <CardOneActionsInner>
              <FrameChild propBackgroundColor={propBackgroundColor} />
            </CardOneActionsInner>
            <DataSecurity>{dataSecurity}</DataSecurity>
          </CardOneActions>
          <AzureSecurity propDisplay={propDisplay} propMinWidth={propMinWidth}>
            {azureSecurity}
          </AzureSecurity>
        </CardOneDetails>
        <CardTwoContent>
          <CardTwoContentChild loading="lazy" alt="" src="/group-544.svg" />
        </CardTwoContent>
      </CardOneContent>
      <YtedwHjadlskyaudsBjsjka>
        {ytedwHjadlskyaudsBjsjkaUsdkiyudb}
      </YtedwHjadlskyaudsBjsjka>
    </CardOneRoot>
  );
};

export default CardOne;
