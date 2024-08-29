import { FunctionComponent } from "react";
import styled from "styled-components";

export type Navigation1Type = {
  className?: string;
};

const LogOut = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: none;
  z-index: 0;
`;
const TaskManage = styled.a`
  text-decoration: none;
  position: relative;
  font-weight: 700;
  color: inherit;
  display: inline-block;
  min-width: 111px;
  z-index: 1;
`;
const GridIcon = styled.img`
  height: 24px;
  width: 24px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  z-index: 1;
`;
const Dashboard1 = styled.a`
  text-decoration: none;
  position: relative;
  font-weight: 500;
  color: inherit;
  display: inline-block;
  min-width: 91px;
  z-index: 1;
`;
const Separator = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  margin: 0 !important;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: var(--color-cornflowerblue);
  z-index: 2;
`;
const LayoutBoard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-6xs) var(--padding-19xl) var(--padding-2xs)
    var(--padding-36xl);
  position: relative;
  gap: var(--gap-base);
`;
const CreateTsk = styled.div`
  position: relative;
  font-weight: 500;
  display: inline-block;
  min-width: 89px;
  z-index: 1;
`;
const CreateTskWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0px var(--padding-15xl);
`;
const MainContent = styled.div`
  margin-left: -95px;
  width: 224px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px var(--padding-650xl);
  box-sizing: border-box;
  gap: var(--gap-3xl);
  color: var(--color-dimgray);
  @media screen and (max-width: 800px) {
    padding-bottom: var(--padding-416xl);
    box-sizing: border-box;
  }
`;
const LogOut1 = styled.div`
  position: relative;
  font-weight: 500;
  display: inline-block;
  min-width: 59px;
  z-index: 1;
`;
const DatabaseElementsChild = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  box-shadow: 7px -1px 12px rgba(0, 0, 0, 0.11);
  background-color: var(--color-white);
  width: 100%;
  height: 100%;
`;
const CodesandboxIcon = styled.img`
  position: absolute;
  top: 51px;
  left: 81px;
  width: 24px;
  height: 24px;
  overflow: hidden;
  z-index: 1;
`;
const VectorIcon = styled.img`
  position: absolute;
  top: 938px;
  left: 84px;
  width: 6px;
  height: 18px;
  z-index: 1;
`;
const VectorIcon1 = styled.img`
  position: absolute;
  top: 942px;
  left: 97px;
  width: 5px;
  height: 10px;
  z-index: 1;
`;
const VectorIcon2 = styled.img`
  position: absolute;
  top: 947px;
  left: 90px;
  width: 12px;
  height: 1px;
  z-index: 2;
`;
const DatabaseElementsItem = styled.img`
  position: absolute;
  top: 191px;
  left: 79px;
  width: 36px;
  height: 25px;
  overflow: hidden;
  z-index: 1;
`;
const DatabaseElements = styled.div`
  width: 276px;
  height: 1024px;
  position: absolute;
  margin: 0 !important;
  top: -19px;
  left: -38px;
`;
const NavigationChild = styled.div`
  align-self: stretch;
  height: 24px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: none;
  z-index: 5;
`;
const NavigationRoot = styled.div`
  width: 238px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-13xl) var(--padding-7xl) var(--padding-46xl)
    var(--padding-64xl);
  box-sizing: border-box;
  position: relative;
  gap: var(--gap-32xl);
  text-align: left;
  font-size: var(--font-size-base);
  color: var(--color-black);
  font-family: var(--font-poppins);
  @media screen and (max-width: 1125px) {
    padding-top: var(--padding-2xl);
    padding-bottom: var(--padding-23xl);
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    padding-top: var(--padding-xl);
    padding-bottom: var(--padding-8xl);
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    gap: var(--gap-6xl);
    padding-left: var(--padding-xl);
    box-sizing: border-box;
  }
`;

const Navigation1: FunctionComponent<Navigation1Type> = ({
  className = "",
}) => {
  return (
    <NavigationRoot className={className}>
      <LogOut />
      <TaskManage>Task Manage</TaskManage>
      <MainContent>
        <LayoutBoard>
          <GridIcon loading="lazy" alt="" src="/grid.svg" />
          <Dashboard1>Dashboard</Dashboard1>
          <Separator />
        </LayoutBoard>
        <CreateTskWrapper>
          <CreateTsk>Create TSK</CreateTsk>
        </CreateTskWrapper>
      </MainContent>
      <LogOut1>Log out</LogOut1>
      <DatabaseElements>
        <DatabaseElementsChild />
        <CodesandboxIcon loading="lazy" alt="" src="/codesandbox.svg" />
        <VectorIcon loading="lazy" alt="" src="/vector.svg" />
        <VectorIcon1 loading="lazy" alt="" src="/vector-1.svg" />
        <VectorIcon2 alt="" src="/vector-2.svg" />
        <DatabaseElementsItem loading="lazy" alt="" src="/frame-3.svg" />
      </DatabaseElements>
      <NavigationChild />
    </NavigationRoot>
  );
};

export default Navigation1;
