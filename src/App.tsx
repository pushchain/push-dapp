// React + Web3 Essentials
import { FC, useContext, useEffect, useMemo, useState } from 'react';

// External Packages
import * as dotenv from 'dotenv';
import ReactGA from 'react-ga';
import Joyride, { CallBackProps } from 'react-joyride';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { ChatUIProvider, darkChatTheme, IChatTheme } from '@pushprotocol/uiweb';
import { createGlobalStyle } from 'styled-components';

// Internal Compoonents
import InitState from 'components/InitState';
import { AppContext } from 'contexts/AppContext';
import NavigationContextProvider from 'contexts/NavigationContext';
import { useAccount, useInactiveListener } from 'hooks';
import { resetAdminSlice } from 'redux/slices/adminSlice';
import { resetChannelCreationSlice } from 'redux/slices/channelCreationSlice';
import { resetNotificationsSlice } from 'redux/slices/notificationSlice';
import { resetCanSendSlice } from 'redux/slices/sendNotificationSlice';
import { resetSpamSlice } from 'redux/slices/spamSlice';
import { resetUserSlice } from 'redux/slices/userSlice';
import UserJourneySteps from 'segments/userJourneySteps';
import Header from 'structure/Header';
import MasterInterfacePage from 'structure/MasterInterfacePage';
import Navigation from 'structure/Navigation';
import { setIndex, setRun, setWelcomeNotifsEmpty } from './redux/slices/userJourneySlice';

// Internal Configs
import GLOBALS from 'config/Globals';
import { themeDark, themeLight } from 'config/Themization';
import { appConfig } from 'config/index.js';
import { GlobalContext } from 'contexts/GlobalContext';

// space imports
import {
  ISpaceBannerProps,
  ISpaceCreateWidgetProps,
  ISpaceFeedProps,
  ISpaceInvitesProps,
  ISpaceWidgetProps,
  SpacesUI,
  SpacesUIProvider,
} from '@pushprotocol/uiweb';
import { useUpdateTheme } from '@web3-onboard/react';
import { darkTheme, lightTheme } from 'config/spaceTheme';
import SpaceComponentContextProvider from 'contexts/SpaceComponentsContext';
import SpaceContextProvider from 'contexts/SpaceContext';
import { SpaceWidgetSection } from 'sections/space/SpaceWidgetSection';
import { blocksColors, getBlocksCSSVariables, Notification } from 'blocks';
import APP_PATHS from 'config/AppPaths';
import { useChainTestnetNotification, useInAppNotifications } from 'common';

dotenv.config();

/**
  TODO: Remove the below config once the following issue is resolved
  https://github.com/push-protocol/push-sdk/issues/1373
*/

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.header.bg} !important;
    padding-right: 0 !important;
  }
  :root{

    /* deprecated */
    /* Spaces */
    --s0: 0px;
    --s1: 4px;
    --s2: 8px;
    --s3: 12px;
    --s4: 16px;
    --s5: 20px;
    --s6: 24px;
    --s7: 28px;
    --s8: 32px;
    --s9: 36px;
    --s10: 40px;
    --s11: 44px;
    --s12: 48px;
    --s13: 52px;
    --s14: 56px;
    --s15: 60px;
    --s16: 64px;
    --s17: 68px;
    --s18: 72px;
    --s19: 76px;
    --s20: 80px;
    --s21: 84px;
    --s22: 88px;
    --s23: 92px;
    --s24: 96px;
    --s25: 100px;
    // TODO: Add more as needed

    /* deprecated */
    /* Border Radius */
    --r0: 0px;
    --r1: 4px;
    --r2: 8px;
    --r3: 12px;
    --r4: 16px;
    --r5: 20px;
    --r6: 24px;
    --r7: 28px;
    --r8: 32px;
    --r9: 36px;
    --r10: 40px;
    // TODO: Add more as needed

    /* deprecated */
    /* Colors */
    ${Object.entries(blocksColors)
      .map(([colorName, code]) => `--${colorName}: ${code};`)
      .join('')}

    /* Font Family */
      --font-family: 'FK Grotesk Neu';

    /* New blocks theme css variables*/
    ${(props) => getBlocksCSSVariables(props.theme.blocksTheme)}
  }

`;

export interface IUseSpaceReturnValues {
  spaceUI: SpacesUI;
  SpaceInvitesComponent: FC<ISpaceInvitesProps>;
  SpaceWidgetComponent: FC<ISpaceWidgetProps>;
  SpaceFeedComponent: FC<ISpaceFeedProps>;
  SpaceBannerComponent: FC<ISpaceBannerProps>;
  CreateSpaceComponent: FC<ISpaceCreateWidgetProps>;
}

// Extend the console
const extendConsole = () => {
  'use strict';
  try {
    var disabledConsoles = {};
    console.enable = function (level, enabled) {
      if (window.console === 'undefined' || !window.console || window.console === null) {
        window.console = {};
      }
      if (window.console[level] === 'undefined' || !window.console[level] || window.console[level] === null) {
        window.console[level] = function () {};
      }
      if (enabled) {
        if (disabledConsoles[level]) {
          window.console[level] = disabledConsoles[level];
        }
      } else {
        disabledConsoles[level] = window.console[level];
        window.console[level] = function () {};
      }
    };
  } catch (e) {
    console.error('Extended console() threw an error!');
    console.debug(e);
  }
};

// extend console
extendConsole();

// Disable console but not on localhost
if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
  if (appConfig?.appEnv === 'prod') {
    console.enable('debug', false);
    console.enable('log', false);
    console.enable('info', false);

    // disable console.warn in prod
    if (appConfig?.appEnv === 'prod') {
      console.enable('warn', false);
    }
  }
}

// Provess App
export default function App() {
  // Initialize GA
  useEffect(() => {
    ReactGA.initialize(appConfig.googleAnalyticsId);
    ReactGA.pageview('/login');
  }, []);
  // Initialize GA

  const dispatch = useDispatch();

  const { isActive, account, provider } = useAccount();
  // TODO: comment until rewards v2 launch is accounced
  useChainTestnetNotification();
  const [currentTime, setcurrentTime] = useState(0);

  const { pgpPvtKey } = useContext<any>(AppContext);
  const { sidebarCollapsed, setSidebarCollapsed } = useContext(GlobalContext);
  const [hasMounted, setHasMounted] = useState(false);

  const updateOnboardTheme = useUpdateTheme();
  const { userPushSDKInstance } = useSelector((state: any) => {
    return state.user;
  });

  useInactiveListener();
  const { run, stepIndex, tutorialContinous } = useSelector((state: any) => state.userJourney);
  // const location = useLocation();
  // Build takes care of this now
  // const [title, setTitle] = useState(EnvHelper.dappTitle());

  // React.useEffect(() => {
  //   // This will run when the page first loads and whenever the title changes
  //   document.title = title;
  // }, [title]);

  useEffect(() => {
    const now = Date.now() / 1000;
    setcurrentTime(now);
  }, []);

  const resetState = () => {
    dispatch(resetSpamSlice());
    dispatch(resetNotificationsSlice());
    dispatch(resetCanSendSlice());
    dispatch(resetChannelCreationSlice());
    dispatch(resetAdminSlice());
    dispatch(resetUserSlice());
  };

  useEffect(() => {
    if (!hasMounted) {
      // do componentDidMount logic
      setHasMounted(true);
      if (!account) return;
      resetState();
    }
  }, [account]);

  // Initialize Theme
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    updateOnboardTheme(newTheme);
    document.documentElement.setAttribute('theme', newTheme);
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const data = localStorage.getItem('theme');
    if (data) {
      const isDarkMode = JSON.parse(data);
      const theme = isDarkMode ? 'dark' : 'light';
      setDarkMode(isDarkMode);
      updateOnboardTheme(theme);
      document.documentElement.setAttribute('theme', theme);
    }

    const SidebarCollapsable = localStorage.getItem('SidebarCollapsed');
    if (SidebarCollapsable) {
      const isSidebarCollapsed = JSON.parse(SidebarCollapsable);
      setSidebarCollapsed(isSidebarCollapsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
    localStorage.setItem('SidebarCollapsed', JSON.stringify(sidebarCollapsed));
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff';
  }, [darkMode]);

  useEffect(() => {
    window?.Olvy?.init({
      organisation: 'epns',
      target: '#olvy-target',
      type: 'sidebar',
      view: {
        showSearch: false,
        compact: false,
        showHeader: true, // only applies when widget type is embed. you cannot hide header for modal and sidebar widgets
        showUnreadIndicator: true,
        unreadIndicatorColor: '#cc1919',
        unreadIndicatorPosition: 'top-right',
      },
    });
    return function cleanup() {
      window?.Olvy?.teardown();
    };
  }, []);

  const steps = UserJourneySteps({ darkMode });
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, lifecycle, index } = data;
    if (lifecycle === 'ready') {
      setTimeout(() => {
        document.querySelector('div > section > div').scrollTop = 0;
      }, 100);
    }

    if (action === 'close' || index === 20) {
      //action === "close" ||
      dispatch(setRun(false));
      dispatch(setIndex(0));
      dispatch(setWelcomeNotifsEmpty());
    }
    // else if (action === 'next' && status === 'running') {
    //   dispatch(incrementStepIndex());
    // }
  };

  const librarySigner = provider?.getSigner(account);

  const spaceUI = useMemo(
    () =>
      new SpacesUI({
        account: account,
        signer: librarySigner,
        pgpPrivateKey: pgpPvtKey,
        env: appConfig?.appEnv,
      }),
    [account, librarySigner, pgpPvtKey, appConfig?.appEnv]
  );

  // const { spaceUI } = useSpaceComponents();

  const location = useLocation();
  const isHeaderHidden =
    location?.pathname.includes(APP_PATHS.PointsVault) || location?.pathname.includes(APP_PATHS.DiscordVerification);
  const isSidebarHidden =
    location?.pathname.includes(APP_PATHS.PointsVault) ||
    location?.pathname.includes('/snap') ||
    location?.pathname.includes(APP_PATHS.DiscordVerification);

  useInAppNotifications();

  return (
    <ThemeProvider theme={darkMode ? themeDark : themeLight}>
      {/* {(!isActive || !allowedChain) && (
        <SectionV2 minHeight="100vh">
          <AppLogin toggleDarkMode={toggleDarkMode} />
        </SectionV2>
      )} */}

      <>
        <GlobalStyle />
        <InitState />
        <Notification />
        <NavigationContextProvider>
          <ChatUIProvider
            user={userPushSDKInstance}
            theme={darkMode && darkChatTheme}
            debug={true}
            uiConfig={{
              suppressToast: false,
            }}
            infuraAPIKey={appConfig.infuraAPIKey}
          >
            <SpaceContextProvider>
              <SpaceComponentContextProvider spaceUI={spaceUI}>
                <Joyride
                  run={run}
                  steps={steps}
                  continuous={tutorialContinous}
                  stepIndex={stepIndex}
                  // hideFooter={true}
                  // primaryProps={false}
                  hideBackButton={true}
                  hideCloseButton={false}
                  disableScrolling={true}
                  disableScrollParentFix={true}
                  // disableFlip={true}
                  // showNextButton={false}
                  showSkipButton={false}
                  disableOverlayClose={true}
                  callback={handleJoyrideCallback}
                  styles={{
                    options: {
                      arrowColor: darkMode ? themeDark.dynamicTutsBg : themeLight.dynamicTutsBg,
                      backgroundColor: darkMode ? themeDark.dynamicTutsBg : themeLight.dynamicTutsBg,
                      overlayColor: darkMode ? themeDark.dynamicTutsBgOverlay : themeLight.dynamicTutsBgOverlay,
                      primaryColor: darkMode ? themeDark.dynamicTutsPrimaryColor : themeLight.dynamicTutsPrimaryColor,
                      textColor: darkMode ? themeDark.dynamicTutsFontColor : themeLight.dynamicTutsFontColor,
                      zIndex: 1000,
                    },
                  }}
                />

                {!isHeaderHidden && (
                  <HeaderContainer>
                    <Header
                      isDarkMode={darkMode}
                      darkModeToggle={toggleDarkMode}
                    />
                  </HeaderContainer>
                )}

                <ParentContainer headerHeight={GLOBALS.CONSTANTS.HEADER_HEIGHT}>
                  {!isSidebarHidden && (
                    <LeftBarContainer
                      leftBarWidth={
                        sidebarCollapsed
                          ? GLOBALS.CONSTANTS.COLLAPSABLE_LEFT_BAR_WIDTH
                          : GLOBALS.CONSTANTS.LEFT_BAR_WIDTH
                      }
                    >
                      <Navigation />
                    </LeftBarContainer>
                  )}

                  <ContentContainer
                    leftBarWidth={
                      isSidebarHidden
                        ? GLOBALS.CONSTANTS.NO_LEFT_BAR_WIDTH
                        : sidebarCollapsed
                        ? GLOBALS.CONSTANTS.COLLAPSABLE_RIGHT_BAR_WIDTH
                        : GLOBALS.CONSTANTS.LEFT_BAR_WIDTH
                    }
                  >
                    {/* Shared among all pages, load universal things here */}
                    <SpacesUIProvider
                      spaceUI={spaceUI}
                      theme={darkMode ? darkTheme : lightTheme}
                    >
                      <MasterInterfacePage />
                      <SpaceWidgetSection />
                    </SpacesUIProvider>
                  </ContentContainer>
                </ParentContainer>
              </SpaceComponentContextProvider>
            </SpaceContextProvider>
          </ChatUIProvider>
        </NavigationContextProvider>
      </>
    </ThemeProvider>
  );
}

// CSS STYLE

const HeaderContainer = styled.header`
  left: 0;
  right: 0;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
`;

const ParentContainer = styled.div`
  flex-wrap: wrap;
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  background: ${(props) => props.bg};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: ${(props) => props.headerHeight}px 0px 0px 0px;
  min-height: calc(100dvh - ${(props) => props.headerHeight}px);
  max-height: calc(100dvh - ${(props) => props.headerHeight}px);
`;

const LeftBarContainer = styled.div`
  left: 0;
  top: 0;
  bottom: 0;
  width: ${(props) => props.leftBarWidth}px;
  position: fixed;
  // position: absolute;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-self: center;
  width: calc(100% - ${(props) => props.leftBarWidth}px);
  margin: 0px 0px 0px ${(props) => props.leftBarWidth}px;

  @media (max-width: 1024px) {
    margin: 0px;
  }
`;

const PushLogo = styled.div`
  width: 200px;
  padding-bottom: 20px;
`;

const ProviderImage = styled.img`
  width: 73px;
  height: 69px;
  max-height: 69px;
  padding-bottom: 18px;
`;
