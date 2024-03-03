export interface Data {
  timestamp: string
  history: History
  version: Version
}

interface History {
  uuid: string
  class: string
  plate: string
  tracks: Track[]
}

interface Track {
  points: Point[]
}

export interface Point {
  plate: Plate
  vehicle_region: RectCoordinates
  detection_state: DetectionState
}

interface Plate {
  center: PointCoordinates
  region: RectCoordinates
  interior: RectCoordinates
  text: string
  recogn_confidence: number
  detect_confidence: number
  contrast: number
}

export interface PointCoordinates {
  x: number
  y: number
}

export interface RectCoordinates {
  lt: PointCoordinates
  rt: PointCoordinates
  lb: PointCoordinates
  rb: PointCoordinates
}

interface DetectionState {
  local_timestamp: string
  framespeed_timestamp: string
  car_class: string
  object_id: number
  tracking_info: TrackingInfo
}

interface TrackingInfo {
  prev_iou: number
  prev_plate_iou: number
  prev_pspeed?: number
  kalman_error?: number
  diff_symbols?: number
  match_elapsed_msec: number
}

interface Version {
  tag: string
  revision: string
  lprsdk: string
  model: string
}
