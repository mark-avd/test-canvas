import type { FC } from 'react'
import './Checkbox.scss'
interface CheckboxProps {
  name: string
  label: string
  onChange: (name: string, value: boolean) => void
}

export const Checkbox: FC<CheckboxProps> = ({ name, label, onChange }) => (
  <label className={'checkbox__label'}>
    <input className={'checkbox__input'} type="checkbox" onChange={(event) => onChange(name, event.target.checked)} />
    {label}
  </label>
)
