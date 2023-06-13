import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoIosArrowDropdown } from "react-icons/io";
import Image from "next/image";

export const ConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="flex items-center px-6 py-3 space-x-3 bg-[#fb74b4] text-white shadow-lg rounded-full"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <Image
                      src="/wallet-icon.svg"
                      width="15"
                      height="15"
                      alt="dashboard"
                    />
                    <p>Connect Wallet</p>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    className="flex items-center w-auto p-2 bg-white rounded-xl font-semibold"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        className={`bg-${chain.iconBackground} w-25 h-25 rounded-full shadow-lg mr-1`}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 25, height: 25 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                    <IoIosArrowDropdown size={22} className="ml-[3px]" />
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="flex flex-row pl-2 pr-[2px] bg-white rounded-xl items-center font-semibold"
                    type="button"
                  >
                    {account.displayBalance ? `${account.displayBalance}` : ""}
                    <div className="flex items-center ml-2 bg-gray-200 p-1 py-[7px] rounded-lg">
                      {account.displayName}
                      <IoIosArrowDropdown size={22} className="ml-[3px]" />
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
