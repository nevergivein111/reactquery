import styledcomponent from "styled-components";

const H1 = styledcomponent.h1`
  font-size:50px;
`;

function StyledComp() {
  return (
    <>
      <H1>hey bro</H1>
    </>
  );
}

export default StyledComp;
