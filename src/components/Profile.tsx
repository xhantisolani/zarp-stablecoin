import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
  import styles from './Profile.module.css'

  export function Profile() {
    const {  address, connector, isConnected } = useAccount()
   const { data: ensAvatar } = useEnsAvatar({ })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()
    
    if (isConnected) {
      return (
        <div>
          {ensAvatar ? (
            <img src={ensAvatar} alt="ENS Avatar" />
          ) : (
            <div>No ENS Avatar found for this address</div>
           
          )}
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          <div>Connected to {connector?.name || 'Unknown Connector'}</div>
          <button className={styles.button} onClick={() => disconnect()}>
            Disconnect
          </button>
        </div>
      );
    }
    
    // Render other UI when not connected    
    return (

      
      <div>
        <div> <p> Choose wallet to connect:</p></div>
        {connectors.map((connector) => (
          <button
            className={styles.button}
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>
        ))}
  
        {error && <div>{error.message}</div>}
      </div>
    )
  }
export default Profile;