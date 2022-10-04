import React, { useEffect, useState } from "react";

const WinterCheckout: React.FC<{
  showModal: boolean;
  contractAddress?: string;
  tokenId?: string;
  walletAddress?: string;
  email?: string;
  mintQuantity?: number;
  production?: boolean;
  fillSource?: string;
  orderSource?: string;
  onClose?: () => void;
  onSuccess?: (txId: string, email: string) => void;
}> = ({
  showModal,
  contractAddress,
  tokenId,
  walletAddress,
  email,
  mintQuantity,
  production,
  fillSource,
  orderSource,
  onClose,
  onSuccess,
}) => {
  const [projectUrl, setProjectUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowEvent = (
        e: Event & {
          data:
            | { name: string; transactionhash: string; email: string }
            | string;
        }
      ) => {
        if (typeof e.data === "string") {
          if (e.data === "closeWinterCheckoutModal") {
            onClose?.();
          }
        } else {
          if (e.data.name === "closeWinterCheckoutModal") {
            onClose?.();
          }
        }
      };
      window.addEventListener("message", handleWindowEvent);
      return () => window.removeEventListener("message", handleWindowEvent);
    }
  }, [onClose, onSuccess]);

  useEffect(() => {
    let queryString = "contractAddress=" + contractAddress;
    queryString += "&tokenId=" + tokenId;
    if (walletAddress) {
      queryString += "&walletAddress=" + walletAddress;
    }
    if (email) {
      queryString += "&email=" + email;
    }
    if (mintQuantity) {
      queryString += "&mintQuantity=" + mintQuantity;
    }
    if (fillSource) {
      queryString += `&fillSource=` + fillSource;
    }
    if (orderSource) {
      queryString += `&orderSource=` + orderSource;
    }

    const url = production
      ? "https://production-marketplace-nft-checkout.onrender.com/?" +
        queryString
      : "https://sandbox-marketplace-nft-checkout.onrender.com/?" + queryString;

    setProjectUrl(url);
  }, [
    contractAddress,
    tokenId,
    production,
    walletAddress,
    email,
    mintQuantity,
    orderSource,
    fillSource,
  ]);

  return showModal ? (
    <div
      dangerouslySetInnerHTML={{
        __html: `<iframe id="winter-checkout" src="${projectUrl}" style="position: fixed; top: 0px; bottom: 0px; right: 0px; width: 100%; border: none; margin: 0px; padding: 0px; overflow: hidden; z-index: 999999; height: 100%;" />`,
      }}
    />
  ) : (
    <></>
  );
};

// How to implement the component

function BuyPage() {
  const [showWinterModal, setShowWinterModal] = useState(false);
  return (
    <div>
      <WinterCheckout
        showModal={showWinterModal}
        contractAddress={"0xef2d92168835eb485d79733a0274fc5866025c17"}
        tokenId={"134"}
        production={true}
        orderSource={"x2y2.io"}
        fillSource={"x2y2.io"}
        onClose={() => {
          setShowWinterModal(false);
        }}
      />
    </div>
  );
}
