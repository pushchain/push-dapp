// react
import { useEffect, useState } from 'react';

// components
import { ChainTestnet, notification } from 'blocks';
import { CommonLocalStorageKeys } from 'common';

export const useChainTestnetNotification = () => {
  const [hasMounted, setHasMounted] = useState(false);

  const notificationAlreadyShown = localStorage.getItem('testnetNotificationShown') === 'true';

  const showNotification = () =>
    notification.show({
      title: 'Donut Testnet Closed beta is Live!',
      description: 'Get a sneak peek into Testnet, Donut, build universal apps and win prizes!',
      image: <ChainTestnet />,
      position: 'bottom-left',
      onClick: () => {
        window.open('https://t.me/+dHOCilvxNR9jZjM9', '_blank');
        localStorage.setItem(CommonLocalStorageKeys.testnetNotificationShown, 'true');
        notification.hide();
      },
      onClose: () => {
        localStorage.setItem(CommonLocalStorageKeys.testnetNotificationShown, 'true');
      },
    });

  const showNotificationFn = () => {
    if (!notificationAlreadyShown && !hasMounted) {
      showNotification();
      setHasMounted(true);
    } else {
      notification.hide();
      setHasMounted(false);
    }
  };

  useEffect(() => {
    showNotificationFn();
  }, []);
};
