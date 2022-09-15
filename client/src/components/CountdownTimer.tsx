import React, { useEffect, useRef, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { ShowCounter } from "./ShowCounter";
import { ShowHappyBirthday } from "./ShowHappyBirthday";
import { SubscribeButton } from "./SubscribeButton";
import urlB64ToUint8Array from "../utils/urlB64ToUint8Array";
import {
  countdownTimerHeadingStyle,
  countdownTimerWrapperStyle,
} from "../styles/CountDownTimerStyles";

interface ICountdownTimerProps {
  targetDate: string;
}

enum ButtonText {
  enable = "Subscribe to updates about Jimmy's birthday",
  disable = "Disable Push Messaging",
  notSupported = "Push Notification Not Supported",
  resetPermission = "Notification permission denied, please reset your permission.",
}

const applicationServerKey = urlB64ToUint8Array(
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo"
);

export const CountdownTimer: React.FC<ICountdownTimerProps> = ({
  targetDate,
}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  const [subscribeButtonText, setSubscribeButtonText] = useState(
    ButtonText.enable
  );
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const subscription = useRef<PushSubscription | null>();
  const swRegistration = useRef<ServiceWorkerRegistration>();

  const handleSubscribeButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    setButtonDisabled(true);
    if (subscription.current) {
      const subs = await swRegistration.current!.pushManager.getSubscription();
      if (subs) {
        subs.unsubscribe();
        deleteSubscriptionOnServer(subs);
        subscription.current = null;
      }
    } else {
      const subs = await swRegistration.current!.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
      console.log("User is subscribed.");
      const response = await sendSubscriptionToBackEnd(subs);
      if (response.ok) {
        subscription.current = subs;
      } else {
        console.error("Server error: Failed to subscribe the user.");
      }
    }
    updateBtn();
  };

  function updateBtn() {
    if (Notification.permission === "denied") {
      setSubscribeButtonText(ButtonText.resetPermission);
      setButtonDisabled(true);
      return;
    }
    if (subscription.current) {
      setSubscribeButtonText(ButtonText.disable);
    } else {
      setSubscribeButtonText(ButtonText.enable);
    }
    setButtonDisabled(false);
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const registerSWAndSetSubscription = async () => {
        swRegistration.current = await navigator.serviceWorker.register(
          "serviceWorker.js"
        );
        console.log("Service Worker is registered", swRegistration);
        subscription.current =
          await swRegistration.current.pushManager.getSubscription();
        updateBtn();
      };
      console.log("Service Worker and Push are supported");
      registerSWAndSetSubscription().catch(console.error);
    } else {
      console.warn("Push messaging is not supported");
      setSubscribeButtonText(ButtonText.notSupported);
      setButtonDisabled(true);
    }
  }, []);

  // console.log(subscription.current?.toJSON());
  if (days + hours + minutes + seconds <= 0) {
    return <ShowHappyBirthday />;
  } else {
    return (
      <div className={countdownTimerWrapperStyle}>
        <div className={countdownTimerHeadingStyle}>
          Jimmy's birthday is happening in
        </div>
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
        <SubscribeButton
          buttonText={subscribeButtonText}
          handleClick={handleSubscribeButtonClick}
          disabled={buttonDisabled}
        />
      </div>
    );
  }
};

async function sendSubscriptionToBackEnd(subscription: PushSubscription) {
  const response = await fetch("/api/save-subscription/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription.toJSON()),
  });
  return response;
}

async function deleteSubscriptionOnServer(subscription: PushSubscription) {
  const response = await fetch(`/api/delete-subscription/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription.toJSON()),
  });
  return response;
}
