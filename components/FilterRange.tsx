import React from 'react'
import { Range } from 'react-range';
import { useFilters } from "../contexts/FiltersContext"

const FilterRange = ({ startValue, endValue, min, max, step, onChangeFunc }) => {

  const [filters] = useFilters()

  const { weight: { weightStart, weightEnd } } = filters

  return (
    <Range
      min={min}
      max={max}
      step={step}
      values={[startValue, endValue]}
      onChange={onChangeFunc}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          // ref={props.ref}
          style={{
            ...props.style,
            height: '6px',
            width: '100%',
            backgroundColor: '#ccc'
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '12px',
            width: '12px',
            backgroundColor: '#999',
            borderRadius: '4px'
          }}
        />
      )}
    />
  )
}

export default FilterRange
