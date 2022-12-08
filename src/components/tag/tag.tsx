import styled from "styled-components";

const TagStyle = styled.p`
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
  color: #d6d6ff;
  border-radius: 4px;
  font-family: "Space Mono";
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  padding: 0.25rem;
  font-size: 0.75rem;
`;

type TagInfo = {
  children: string;
  color: any;
};

const Tag = ({ children, color}: TagInfo) => {
  return (
      <TagStyle color={color}>{children}</TagStyle>
  );
};

export default Tag;
