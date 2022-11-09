import Head from "next/head";
import Link from "next/link";
import Dashboard from "src/modules/wallet/components/Dashboard";
import WalletConnect from "src/modules/wallet/components/WalletConnect";
import useWalletConnected from "src/modules/wallet/hooks/useWalletConnected";

export default function Home() {
  const walletConnected = useWalletConnected();

  return (
    <div>
      <Head>
        <title>Ethereum Login Test</title>
        <meta name="description" content="Ethereum login test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl mx-auto mt-12 space-y-6">
        <header>
          <WalletConnect />
        </header>
        <main className="links-styled">
          {!walletConnected ? (
            <div className="space-y-3">
              <h1>
                Connect your wallet to get some information about your account!
              </h1>
              <p>This is just a code sample</p>
              <p>
                Created by{" "}
                <Link href="https://www.jbernier.com">Jeremy Bernier</Link>
              </p>
            </div>
          ) : (
            <Dashboard />
          )}
        </main>
      </div>
    </div>
  );
}
