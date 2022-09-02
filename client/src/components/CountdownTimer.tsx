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
  enable = "Subscribe to updates about Glen's birthday",
  disable = "Disable Push Messaging",
  notSupported = "Push Notification Not Supported",
  resetPermission = "Notification permission denied, please reset your permission.",
}

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
  > = () => {
    setButtonDisabled(true);
    if (subscription.current) {
      // unsubscribeUser();
    } else {
      subscribeUser();
    }
  };
  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo"
    );
    swRegistration
      .current!.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      })
      .then((subs) => {
        console.log("User is subscribed.");
        sendSubscriptionToBackEnd(subs);
        subscription.current = subs;
        updateBtn();
      })
      .catch((error) => {
        console.error("Failed to subscribe the user: ", error);
        updateBtn();
      });
  }

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
          Hi Glen! Your birthday is happening in
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

function sendSubscriptionToBackEnd(subscription: PushSubscription) {
  return fetch("/api/save-subscription/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription.toJSON()),
  }).then(function (response) {
    if (!response.ok) {
      throw new Error("Bad status code from server.");
    }

    return response.json();
  });
}
