import { ConnectWallet } from "@/components/ConnectWallet";

export default function Home() {
  return (
    <main className={`flex justify-center p-2`}>
      <ConnectWallet />
    </main>
  );
}
