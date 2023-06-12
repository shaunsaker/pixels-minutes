import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// from @tremor/react
export const COLORS = [
  'amber',
  'green',
  'blue',
  'purple',
  'red',
  'pink',
  'teal',
  'yellow',
  'emerald',
  'indigo',
  'lime',
  'cyan',
  'sky',
  'rose',
  'violet',
  'fuchsia',
  'slate',
] as const

export type Color = (typeof COLORS)[number]

export type Project = {
  id: string
  name: string
  color: Color
}

const atom = atomWithStorage<Record<string, Project>>('projects', {})

export const useProjects = () => useAtom(atom)
