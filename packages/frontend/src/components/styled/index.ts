import styled from '@vue-styled-components/core';

export const StyledButton = styled.button`
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background: linear-gradient(to right, #42b883, #35495e);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.secondary {
    background: linear-gradient(to right, #606c88, #3f4c6b);
  }

  &.danger {
    background: linear-gradient(to right, #cb2d3e, #ef473a);
  }
`;

export const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1rem 0;

  th {
    background: #f8f9fa;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #2c3e50;
    border-bottom: 2px solid #eee;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    color: #34495e;
  }

  tbody tr:hover {
    background: #f8f9fa;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 0.5rem;
    }
  }
`;