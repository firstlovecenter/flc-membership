export interface Member {
  id: string
  firstName: string
  lastName: string
}

export type Role =
  | 'leaderFellowship'
  | 'leaderBacenta'
  | 'leaderConstituency'
  | 'leaderCouncil'
  | 'leaderStream'
  | 'leaderGatheringService'
  | 'leaderOversight'
  | 'leaderFederalMinistry'
  | 'leaderMinistry'
  | 'leaderHub'
  | 'leaderSonta'
  | 'adminConstituency'
  | 'adminCouncil'
  | 'adminStream'
  | 'adminGatheringService'
  | 'adminOversight'
  | 'adminFederalministry'
  | 'adminMinistry'
  | 'arrivalsAdminGatheringService'
  | 'arrivalsAdminStream'
  | 'arrivalsAdminCouncil'
  | 'arrivalsAdminConstituency'
  | 'arrivalsCounterStream'
  | 'arrivalsPayerStream'
  | 'tellerStream'
  | 'sheepseekerStream'
  | 'all'