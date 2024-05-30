import styled from "styled-components";

export const StyledCircle = styled.circle<{
  progress: number;
  accumulator: number;
}>`
  ${({ progress, accumulator }) => `
  --dash: calc((${progress} * var(--circumference)) / 100);
  transform: rotate(${
    accumulator ? `${accumulator * 3.65 - 90}deg` : "-90deg"
  });
  `}
`;
