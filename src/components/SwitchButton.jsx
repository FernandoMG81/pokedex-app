import React from 'react'

export const SwitchButton = () => {
  return (
    <div class='switch'>
      <input type='checkbox' name='toggle' />
      <label for='toggle'>
        <i class='bulb'>
          <span class='bulb-center' />
          <span class='filament-1' />
          <span class='filament-2' />
          <span class='reflections'>
            <span />
          </span>
          <span class='sparks'>
            <i class='spark1' />
            <i class='spark2' />
            <i class='spark3' />
            <i class='spark4' />
          </span>
        </i>
      </label>
    </div>
  )
}
