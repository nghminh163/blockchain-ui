interface Peer {
  host: string;
  is_active: boolean;
  port: number;
}

export interface PeerResponse {
  peers: Peer[];
  total: number;
}
