'use client'

import { useId, useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Switch } from '@/Components/ui/switch'
import { BackgroundPaths } from '@/Components/ui/background-paths'


const SwitchDualIconLabelDemo = () => {
  const id = useId()
  const [checked, setChecked] = useState(false)

  // Initialize theme from HTML element or localStorage
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || 
                   localStorage.getItem('theme') === 'dark';
    setChecked(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleSwitch = (val) => {
    setChecked(val);
    if (val) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className='group inline-flex items-center gap-2' data-state={checked ? 'checked' : 'unchecked'}>
      <span
        id={`${id}-light`}
        className='group-data-[state=checked]:text-gray-400 cursor-pointer text-left text-sm font-medium dark:text-zinc-500 text-amber-500'
        aria-controls={id}
        onClick={() => toggleSwitch(false)}
      >
        <SunIcon className='h-4 w-4' aria-hidden='true' />
      </span>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={toggleSwitch}
        aria-labelledby={`${id}-dark ${id}-light`}
        aria-label='Toggle between dark and light mode'
      />
      <span
        id={`${id}-dark`}
        className='group-data-[state=unchecked]:text-gray-400 cursor-pointer text-right text-sm font-medium dark:text-violet-400 text-zinc-500'
        aria-controls={id}
        onClick={() => toggleSwitch(true)}
      >
        <MoonIcon className='h-4 w-4' aria-hidden='true' />
      </span>
    </div>
  )
}

export default SwitchDualIconLabelDemo

export function DemoBackgroundPaths() {
    return <BackgroundPaths title="Background Paths" />
}

