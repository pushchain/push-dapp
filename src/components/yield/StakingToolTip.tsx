// React + Web3 Essentials
import React from 'react';
import styled from 'styled-components';

// Internal Components
import { AInlineV2, H2V2, ItemVV2 } from 'components/reusables/SharedStylingV2';
import Tooltip from 'components/reusables/tooltip/Tooltip';


const StakingToolTip = (props) => {
    return (
        <Tooltip
            wrapperProps={{
                width: '100%',
                maxWidth: 'none',
                minWidth: 'auto',
                display: 'flex',
                flex: '1',
                margin: props.margin ? props.margin : '0'
            }}
            placementProps={{
                background: 'none',
                bottom: props.bottom ? props.bottom : '25px',
                left: props.error ? '40px' : "0px",
            }}
            tooltipContent={
                props.error ? (
                    <ErrorToolTipContent
                        title={props.ToolTipTitle}
                        width={props.ToolTipWidth}
                    />
                ) : (
                    <StakingToolTipContent
                        title={props.ToolTipTitle}
                        body={props.ToolTipBody}
                    />
                )
            }
        >
            {props.children}
        </Tooltip>
    );
};

export const ErrorToolTipContent = (props) => {
    return (
        <ItemVV2
            width={props.width}
            background='#131313'
            justifyContent='flex-start'
            border='1px solid rgba(173, 176, 190, 0.2)'
            alignItems='flex-start'
            padding='0.75rem 0.75rem 0.75rem 1rem'
            boxShadow='0px 4px 20px rgba(0, 0, 0, 0.05)'
            color='#FFF'
            borderRadius='2px 12px 12px 12px'

        >
            <H2V2 color='inherit'>{props.title}</H2V2>
        </ItemVV2>
    )
}

export const StakingToolTipContent = ({
    title,
    body,
}) => {
    return (
        <Container>
            <TopHeading>{title}</TopHeading>
            <TopSubHeading >
                {body}  {" "} 
                {body.includes("Push Fee Pool APR") &&
                    <AInlineV2 cursor='pointer' href="https://medium.com/push-protocol/new-push-yield-farming-rewards-full-details-4a9ff473226d" target='_blank'>
                      here
                    </AInlineV2>
                }
            </TopSubHeading>

        </Container>
    );
};

export default StakingToolTip;

const Container = styled(ItemVV2)`
  box-sizing: border-box;
  width: 16rem;
  background: ${(props) => props.theme.default.bg};
  justify-content: flex-start;
  border: 1px solid rgba(173, 176, 190, 0.2);
  align-items: flex-start;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius:1rem 1rem 1rem 0.125rem;

  @media (max-width:400px){
    width:16.75rem;
  }


`;

const TopHeading = styled(H2V2)`
  color: ${(props) => props.theme.tooltipTopHeading};
  font-weight: 500;
  font-size: 0.75rem;
`;

const TopSubHeading = styled(H2V2)`
  color: ${(props) => props.theme.tooltipTopSubHeading};
  font-weight: 300;
  font-size: 0.625rem;
  text-align:left;
`;
