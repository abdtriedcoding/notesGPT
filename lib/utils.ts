import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentFormattedDate(): string {
  const currentDate = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return new Intl.DateTimeFormat('en-US', options).format(currentDate)
}

export function formatTime(time: number): string {
  return time < 10 ? `0${time}` : `${time}`
}

// Formats a number of seconds as m:ss (or h:mm:ss) for an audio player readout.
export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '0:00'
  const seconds = Math.floor(totalSeconds % 60)
  const minutes = Math.floor((totalSeconds / 60) % 60)
  const hours = Math.floor(totalSeconds / 3600)
  const mm = hours > 0 ? formatTime(minutes) : `${minutes}`
  if (hours > 0) return `${hours}:${formatTime(minutes)}:${formatTime(seconds)}`
  return `${mm}:${formatTime(seconds)}`
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}
