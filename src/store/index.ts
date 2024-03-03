import { createWithEqualityFn } from 'zustand/traditional'
import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

interface StoreState {
  checkboxState: {
    plateCenter: boolean
    plateRegion: boolean
    vehicleRegion: boolean
    detectionStateTimestamp: boolean
  }
}

interface StoreActions {
  setCheckboxState: (name: string, value: boolean) => void
}

export const useStore = createWithEqualityFn<StoreState & StoreActions>()(
  devtools((set) => ({
    checkboxState: {
      plateCenter: false,
      plateRegion: false,
      vehicleRegion: false,
      detectionStateTimestamp: false,
    },
    setCheckboxState: (name, value) =>
      set((state: StoreState) => ({ checkboxState: { ...state.checkboxState, [name]: value } })),
  })),
  shallow,
)
