import { Checkbox } from 'components/Checkbox/Checkbox.tsx'
import type { FC } from 'react'
import './GeometryControls.scss'
import { useStore } from 'store'

interface Control {
  name: string
  label: string
}

const controls: Control[] = [
  { name: 'plateCenter', label: 'Отображение центра ГРЗ' },
  { name: 'plateRegion', label: 'Отображение рамок ГРЗ' },
  { name: 'vehicleRegion', label: 'Отображение всех границ ТС' },
  { name: 'detectionStateTimestamp', label: 'Временные метки' },
]

export const GeometryControls: FC = () => {
  const setCheckboxState = useStore((state) => state.setCheckboxState)

  return (
    <div className={'geometry-controls'}>
      {controls.map((item) => (
        <Checkbox key={item.name} name={item.name} label={item.label} onChange={setCheckboxState} />
      ))}
    </div>
  )
}
