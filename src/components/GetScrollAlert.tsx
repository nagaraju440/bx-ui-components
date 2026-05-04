import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

interface GetScrollTypesAlertProps {
  id: string;
  children?: React.ReactNode;
  onBottom: () => void;
  onTop?: () => void;
}

const debounce = (callback: () => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(callback, wait);
  };
};

const GetScrollTypesAlert: React.FC<GetScrollTypesAlertProps> = ({
  id,
  children,
  onBottom,
  onTop,
}) => {
  const [onBottomReach, setOnBottomReach] = useState<boolean>(false);
  const [onTopReach, setOnTopReach] = useState<boolean>(false);

  const handleScroll = debounce(() => {
    let scrollContainer = document.getElementById(id);

    const scrollDifferenceTop = Math.abs(scrollContainer?.scrollTop || 0);
    const scrollDifferenceBottom = Math.abs(
      (scrollContainer?.scrollHeight || 0) -
        (scrollContainer?.scrollTop || 0) -
        (scrollContainer?.clientHeight || 0)
    );

    if (scrollDifferenceBottom <= 2) {
      onBottom();
      setOnBottomReach(true);
    } else if (onTop && scrollDifferenceTop <= 2) {
      onTop();
      setOnTopReach(true);
    }
  }, 100); // Adjust the debounce delay as needed

  useEffect(() => {
    let scrollContainer = document.getElementById(id);
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      setOnBottomReach(false);
      setOnTopReach(false);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onBottomReach, onTopReach, id, handleScroll]);

  return <div>{children}</div>;
};

export default GetScrollTypesAlert;
