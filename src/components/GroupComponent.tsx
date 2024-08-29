import { FunctionComponent, type CSSProperties } from "react";
import styled from "styled-components";

export type GroupComponentType = {
  className?: string;
  development?: string;
  azureIntegration?: string;
  shfdstgvdbHuyjsvCuyscjShcuysjvcm?: string;
  aG?: string;

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
};

const FrameChild = styled.div`
  width: 312px;
  height: 207px;
  position: relative;
  border-radius: var(--br-xl);
  background-color: var(--color-white);
  display: none;
`;
const FrameItem = styled.div`
  width: 9px;
  height: 9px;
  position: relative;
  border-radius: 50%;
  background-color: var(--color-deepskyblue);
  z-index: 1;
`;
const CardFiveActionsInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-12xs) 0px 0px;
`;
const Development = styled.div<{ propMinWidth?: CSSProperties["minWidth"] }>`
  position: relative;
  font-weight: 500;
  display: inline-block;
  min-width: 55px;
  z-index: 1;
  min-width: ${(p) => p.propMinWidth};
`;
const CardFiveActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-8xs);
`;
const AzureIntegration = styled.h3`
  margin: 0;
  position: relative;
  font-size: var(--font-size-lg);
  font-weight: 500;
  font-family: inherit;
  color: var(--color-black);
  z-index: 1;
`;
const CardFiveDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const CardSixContentChild = styled.img`
  width: 16px;
  height: 2px;
  position: relative;
  z-index: 1;
`;
const CardSixContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-7xs) 0px 0px;
`;
const CardFiveContent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--gap-xl);
`;
const ShfdstgvdbHuyjsvCuyscj = styled.div`
  align-self: stretch;
  position: relative;
  font-size: var(--font-size-xs);
  color: var(--color-black);
  z-index: 1;
`;
const CardFive = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const FrameInner = styled.div<{
  propBackgroundColor?: CSSProperties["backgroundColor"];
}>`
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  background-color: var(--color-sandybrown);
  border: 0px solid var(--color-white);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${(p) => p.propBackgroundColor};
`;
const Ag = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  display: inline-block;
  min-width: 18px;
  z-index: 2;
`;
const EllipseParent = styled.div`
  width: 29px;
  height: 29px;
  position: relative;
  font-size: var(--font-size-xs);
  color: var(--color-white);
`;
const RectangleParentRoot = styled.div`
  align-self: stretch;
  border-radius: var(--br-xl);
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xl);
  gap: var(--gap-2xl);
  z-index: 1;
  text-align: left;
  font-size: var(--font-size-5xs);
  color: var(--color-dimgray);
  font-family: var(--font-poppins);
`;

const GroupComponent: FunctionComponent<GroupComponentType> = ({
  className = "",
  development,
  propMinWidth,
  azureIntegration,
  shfdstgvdbHuyjsvCuyscjShcuysjvcm,
  propBackgroundColor,
  aG,
}) => {
  return (
    <RectangleParentRoot className={className}>
      <FrameChild />
      <CardFive>
        <CardFiveContent>
          <CardFiveDetails>
            <CardFiveActions>
              <CardFiveActionsInner>
                <FrameItem />
              </CardFiveActionsInner>
              <Development propMinWidth={propMinWidth}>
                {development}
              </Development>
            </CardFiveActions>
            <AzureIntegration>{azureIntegration}</AzureIntegration>
          </CardFiveDetails>
          <CardSixContent>
            <CardSixContentChild loading="lazy" alt="" src="/group-544.svg" />
          </CardSixContent>
        </CardFiveContent>
        <ShfdstgvdbHuyjsvCuyscj>
          {shfdstgvdbHuyjsvCuyscjShcuysjvcm}
        </ShfdstgvdbHuyjsvCuyscj>
      </CardFive>
      <EllipseParent>
        <FrameInner propBackgroundColor={propBackgroundColor} />
        <Ag>{aG}</Ag>
      </EllipseParent>
    </RectangleParentRoot>
  );
};

export default GroupComponent;
