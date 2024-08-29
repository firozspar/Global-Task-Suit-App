import { FunctionComponent } from "react";
import styled from "styled-components";

export type FrameComponentType = {
  className?: string;
};

const FrameChild = styled.img`
  width: 18px;
  height: 18px;
  position: relative;
`;
const SearchIconPaddingInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-9xs) 0px 0px;
`;
const Search = styled.a`
  text-decoration: none;
  position: relative;
  color: inherit;
  display: inline-block;
  min-width: 57px;
`;
const SearchIconPadding = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
`;
const SearchIconPaddingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-2xs) 0px 0px;
`;
const Image5Icon = styled.img`
  height: 50.9px;
  width: 56.5px;
  position: relative;
  object-fit: cover;
`;
const FrameParent = styled.header`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 100%;
  gap: var(--gap-xl);
  text-align: left;
  font-size: var(--font-size-base);
  color: var(--color-dimgray);
  font-family: var(--font-poppins);
`;
const FrameWrapperRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 0px var(--padding-10xs);
  box-sizing: border-box;
  max-width: 100%;
`;

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  return (
    <FrameWrapperRoot className={className}>
      <FrameParent>
        <SearchIconPaddingWrapper>
          <SearchIconPadding>
            <SearchIconPaddingInner>
              <FrameChild loading="lazy" alt="" src="/group-9.svg" />
            </SearchIconPaddingInner>
            <Search>Search</Search>
          </SearchIconPadding>
        </SearchIconPaddingWrapper>
        <Image5Icon loading="lazy" alt="" src="/image-5@2x.png" />
      </FrameParent>
    </FrameWrapperRoot>
  );
};

export default FrameComponent;
