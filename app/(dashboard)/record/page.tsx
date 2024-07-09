'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatTime, getCurrentFormattedDate } from '@/lib/utils'

import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function RecordPage() {
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [title, setTitle] = useState('Record your voice note')

  const generateUploadUrl = useMutation(api.notes.generateUploadUrl)
  const createNote = useMutation(api.notes.createNote)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  async function startRecording() {
    setIsRunning(true)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    const audioChunks: Blob[] = []

    recorder.ondataavailable = (e) => {
      audioChunks.push(e.data)
    }

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' })
      const postUrl = await generateUploadUrl()
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'audio/mp3' },
        body: audioBlob,
      })
      const { storageId } = await result.json()
      const noteId = await createNote({ storageId })
      router.push(`/recordings/${noteId}`)
    }
    setMediaRecorder(recorder)
    recorder.start()
  }

  function stopRecording() {
    mediaRecorder?.stop()
    setIsRunning(false)
  }

  const handleRecordClick = async () => {
    if (title === 'Record your voice note') {
      setTitle('Recording...')
      await startRecording()
    } else if (title === 'Recording...') {
      setTitle('Processing...')
      stopRecording()
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-xl font-medium md:text-4xl">{title}</h1>
      <p className="text-gray-400">{getCurrentFormattedDate()}</p>
      <div className="py-20">
        <div className="relative mx-auto flex h-[316px] w-[316px] items-center justify-center">
          <div
            className={`recording-box absolute h-full w-full rounded-[50%] p-[12%] pt-[17%] ${
              title === 'Recording...' ? 'record-animation' : ''
            }`}
          >
            <div
              className="h-full w-full rounded-[50%]"
              style={{ background: 'linear-gradient(#E31C1CD6, #003EB6CC)' }}
            />
          </div>
          <div className="z-20 flex h-fit w-fit flex-col items-center justify-center">
            <h1 className="text-light text-[60px] leading-[114.3%] tracking-[-1.5px]">
              {formatTime(Math.floor(totalSeconds / 60))}:
              {formatTime(totalSeconds % 60)}
            </h1>
          </div>
        </div>
      </div>
      <button onClick={handleRecordClick}>
        {!isRunning ? (
          <Image
            src={'/nonrecording_mic.svg'}
            alt="recording mic"
            width={148}
            height={148}
            className="h-[70px] w-[70px] md:h-[100px] md:w-[100px]"
          />
        ) : (
          <Image
            src={'/recording_mic.svg'}
            alt="recording mic"
            width={148}
            height={148}
            className="h-[70px] w-[70px] animate-pulse transition md:h-[100px] md:w-[100px]"
          />
        )}
      </button>
    </div>
  )
}
