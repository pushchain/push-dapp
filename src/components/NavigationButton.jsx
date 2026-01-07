// React + Web3 Essentials
import { useEffect, useState, useContext } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

// External Packages
import { MdError } from 'react-icons/md';
import styled, { css, useTheme } from 'styled-components';

// Internal Components
import LoaderSpinner, { LOADER_TYPE } from 'components/reusables/loaders/LoaderSpinner';
import useToast from 'hooks/useToast';
import { Anchor, Image, ItemH, RouterLink, Span } from 'primaries/SharedStyling';
import { ItemHV2, ItemVV2, SpanV2 } from './reusables/SharedStylingV2';

// Internal Configs
import GLOBALS from 'config/Globals';
import { AppContext } from 'contexts/AppContext';
import { GlobalContext } from 'contexts/GlobalContext';

// Assets
import { navigationIcons } from 'assets/navigation';
import { Text } from 'blocks';

// Interface

// Constants

// Main Component
function NavigationButton({ item, data, sectionID, active, bg = 'none' }) {
  const theme = useTheme();

  const [icon, setIcon] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const iconBorderRadius = navigationIcons[data.src] ? '0' : '50%';

  useEffect(() => {
    setIcon(navigationIcons[data.src] ?? data.src);
    setActiveIcon(navigationIcons[data.activeSrc] ?? data.activeSrc);
  }, [data.src, data.activeSrc]);

  const { showMetamaskPushSnap } = useContext(AppContext);
  const { readOnlyWallet, mode, sidebarCollapsed } = useContext(GlobalContext);

  const navigationToast = useToast(5000);

  let SelectedIcon;
  let RouteLogic;
  let definedMargin;

  switch (sectionID) {
    case GLOBALS.CONSTANTS.NAVBAR_SECTIONS.MOBILE:
      SelectedIcon = LeftBarPrimaryItemIcon;
      definedMargin = '5px';
      break;
    case GLOBALS.CONSTANTS.NAVBAR_SECTIONS.NOTIFICATION:
      SelectedIcon = item.isSection ? LeftBarSecondarySectionIcon : LeftBarSecondaryItemIcon;
      definedMargin = item.isSection ? '0px' : '5px';
      break;
    case GLOBALS.CONSTANTS.NAVBAR_SECTIONS.MESSAGING:
      SelectedIcon = item.isSection ? LeftBarSecondarySectionIcon : LeftBarSecondaryItemIcon;
      definedMargin = item.isSection ? '0px' : '5px';
      break;
    case GLOBALS.CONSTANTS.NAVBAR_SECTIONS.DEVELOPERS:
      SelectedIcon = item.isSection ? LeftBarSecondarySectionIcon : LeftBarSecondaryItemIcon;
      definedMargin = item.isSection ? '0px' : '5px';
      break;
    case GLOBALS.CONSTANTS.NAVBAR_SECTIONS.THIRD:
      SelectedIcon = item.isSection ? LeftBarSecondarySectionIcon : LeftBarSecondaryItemIcon;
      definedMargin = item.isSection ? '0px' : '5px';
      break;
    default:
      SelectedIcon = item.isSection ? LeftBarPrimarySectionIcon : LeftBarPrimaryItemIcon;
      definedMargin = item.isSection ? '0px' : '5px';
  }

  if (data.isRoute) {
    RouteLogic = RouterLink;
  } else {
    RouteLogic = Anchor;
  }
  // Don't navigate to these routes if user is using a read-only wallet
  const disallowNavigation = readOnlyWallet && data.allowReadOnly !== undefined && data.allowReadOnly === false;
  if (disallowNavigation) {
    RouteLogic = ProtectedRoute;
  }

  return (
    <>
      {data.loading && (
        <ItemVV2
          alignSelf="flex-start"
          padding="0px 15px"
        >
          <LoaderSpinner
            type={LOADER_TYPE.SEAMLESS}
            completed={false}
            spinnerSize={20}
            spinnerColor={(props) => props.theme.nav.color}
          />
        </ItemVV2>
      )}

      {!data.loading && !data.hidden && (
        <RouteLogic
          style={{ display: data.name === 'Hide' ? 'none' : 'block' }}
          flex="1"
          title={`${data.title}`}
          to={`${data.href ? data.href : '#'}`}
          href={`${data.href ? data.href : '#'}`}
          alt={`${data.alt}`}
          target={data.isRoute ? null : data.newTab ? '_blank' : 'self'}
          disabled={data.disabled}
          radius="16px"
          align="stretch"
          padding="10px"
          margin={definedMargin}
          bg={bg}
          active={active ? 1 : 0}
          className={data?.name?.toLowerCase()}
        >
          {data.iconFactory ? (
            <ItemHV2
              justifyContent="flex-start"
              padding="0 2rem"
            >
              {data.iconFactory}
            </ItemHV2>
          ) : (
            <ItemH align="center">
              {!active ? (
                <SelectedIcon
                  src={icon}
                  margin="0 4px"
                  alt={`${data.alt}`}
                  borderRadius={iconBorderRadius}
                  active={active ? 1 : 0}
                />
              ) : (
                <SelectedIcon
                  src={activeIcon}
                  margin="0 4px"
                  alt={`${data.alt}`}
                  borderRadius={iconBorderRadius}
                  active={active ? 1 : 0}
                />
              )}

              {!sidebarCollapsed && (
                <Span
                  flex="1"
                  cursor="pointer"
                  weight={!active ? '600' : '700'}
                  spacing="normal"
                  margin="0 4px"
                  color={theme.nav.color}
                  onClick={data?.hasOnClickFunction && showMetamaskPushSnap}
                  size="16px"
                >
                  {data.name}
                </Span>
              )}
              {!!data?.count && <NewTag2>{data?.count}</NewTag2>}

              {data?.showNewTag && !sidebarCollapsed && <NewTag>New</NewTag>}
            </ItemH>
          )}
        </RouteLogic>
      )}
    </>
  );
}

// filter: ${(props) =>
//   props.active
//     ? "brightness(1)"
//     : props.theme === themeDark
//     ? "brightness(0) invert(1)"
//     : "brightness(0)"};
// opacity: ${(props) =>
//   props.active ? "1" : props.theme === themeDark ? "0.5" : "0.25"};

// transition: transform 0.1s ease-out;

// filter: ${(props) =>
//   props.active
//     ? "brightness(1)"
//     : props.theme === themeDark
//     ? "brightness(0) invert(1)"
//     : "brightness(0)"};
// opacity: ${(props) =>
//   props.active ? "1" : props.theme === themeDark ? "0.5" : "0.25"};

// transition: transform 0.1s ease-out;

// css styles
const InheritedSectionGroupIcon = styled(Image)`
  height: 25px;
  width: 25px;
  margin: 0 4px;

  @media (max-width: 992px) {
    margin: 0px 0px;
  }
  border-radius : ${(props) => props.borderRadius};
  ${(props) =>
    props.active &&
    css`
      transform: scale(1.1) translate(0px, 0px);
    `};
`;

const InheritedSectionItemIcon = styled(Image)`
  height: 25px;
  width: 25px;
  margin: 0 4px;
  border-radius : ${(props) => props.borderRadius};


  @media (max-width: 992px) {
    margin: 0px 0px;
  }

  ${(props) =>
    props.active &&
    css`
      transform: scale(1.25) translate(0px, 0px);
    `};
`;

const LeftBarPrimarySectionIcon = styled(InheritedSectionGroupIcon)``;

const LeftBarPrimaryItemIcon = styled(InheritedSectionItemIcon)``;

const LeftBarSecondarySectionIcon = styled(InheritedSectionGroupIcon)`
  height: 25px;
  width: 25px;
`;

const LeftBarSecondaryItemIcon = styled(InheritedSectionItemIcon)``;

const NewTag = styled(SpanV2)`
  font-weight: 600;
  font-size: 12px;
  letter-spacing: normal;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #d53a94;
  margin-left: 10px;
  padding: 2px 6px;
  background: #f3d7fa;
  border-radius: 6px;
  height: 17px;
  width: fit-content;
`;

const NewTag2 = styled(SpanV2)`
  display: flex;
  max-width: 20px;
  height: 16px;
  padding: 1px 8px 0px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
  background: #E20880;
  font-weight: 500;
  line-height: 1;
  font-size: 12px;
`;

const ProtectedRoute = styled(SpanV2)``;

// Export Default
export default NavigationButton;
