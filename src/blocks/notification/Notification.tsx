import { FC } from 'react';
import styled from 'styled-components';
import { NotificationProps } from './Notification.types';
import { Cross } from 'blocks';
import { toast, Toaster } from 'sonner';
import { getTextVariantStyles } from 'blocks/Blocks.utils';
import { deviceMediaQ } from 'blocks/theme';

const NotificationContainer = styled.div`
  position: relative;
  background-color: var(--components-in-app-notification-background-default);
  border-radius: var(--radius-xxs);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 115px;
  width: 398px;
  cursor: pointer;
  box-sizing: border-box;
  border: var(--border-sm) solid var(--components-in-app-notification-stroke-bg);
  overflow: hidden;
  @media${deviceMediaQ.mobileL} {
    width: -webkit-fill-available;
  }
`;
const StyledToaster = styled(Toaster)`
  width: 412px;
  @media${deviceMediaQ.mobileL} {
    width: 100%;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--spacing-sm);
  flex: 1;
  box-sizing: border-box;
`;

const NotificationTitle = styled.span`
  ${() => getTextVariantStyles('h5-semibold', 'components-in-app-notification-text-default')}
  width: 95%;
`;

const NotificationDescription = styled.span`
  ${() => getTextVariantStyles('bes-regular', 'components-in-app-notification-text-secondary')}
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-xs);
  border-radius: var(--radius-xxs) var(--radius-none) var(--radius-none) var(--radius-xxs);
  background: #1B43C8;
`;

const CloseButton = styled.div`
  background-color: var(--surface-transparent);
  cursor: pointer;
  color: var(--components-in-app-notification-icon-default);
  padding: var(--spacing-none);
  position: absolute;
  right: var(--spacing-xxs);
  top: var(--spacing-xxs);
`;
const Container = styled.div``;

const NotificationItem: FC<NotificationProps> = ({ overlay, onClose, title, description, image, onClick }) => {
  const handleNotificationClick = () => onClick?.();
  const handleNotificationClose = () => {
    onClose?.();
    notification.hide();
  };
  return (
    <Container onClick={handleNotificationClick}>
      {overlay ? (
        <>{overlay}</>
      ) : (
        <NotificationContainer>
          {image && <IconContainer>{image}</IconContainer>}
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              handleNotificationClose();
            }}
          >
            <Cross size={16} />
          </CloseButton>
          <TextContainer>
            <NotificationTitle>{title}</NotificationTitle>
            <NotificationDescription>{description}</NotificationDescription>
          </TextContainer>
        </NotificationContainer>
      )}
    </Container>
  );
};

const Notification = () => {
  return (
    <StyledToaster
      offset={15}
      visibleToasts={5}
    />
  );
};

// Store the toastId(s) in an array to manage multiple notifications
const toastIds: Array<string | number> = [];

// Export the notification object with show and hide methods
const notification = {
  show: (config: NotificationProps, id?: string) => {
    const toastId = toast.custom(() => <NotificationItem {...config} />, {
      id: id,
      duration: config.duration || Infinity,
      position: config.position || 'bottom-right',
      onAutoClose: config.onAutoClose,
    });
    if (!toastIds.find((toastId) => toastId === id)) toastIds.push(toastId);
  },
  hide: () => {
    if (toastIds.length > 0) {
      toast.dismiss();
    }
  },
};

export { notification, Notification };
