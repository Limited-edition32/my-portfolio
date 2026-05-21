"use client"

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { Check, Loader2, SendHorizontal, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const DRAG_CONSTRAINTS = { left: 0, right: 135 } // adjusted constraint to fit inside
const DRAG_THRESHOLD = 0.9

const BUTTON_STATES = {
  initial: { width: "12rem" },
  completed: { width: "12rem" }, // keep width same so it doesn't shrink awkwardly
}

const ANIMATION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
}

const StatusIcon = ({ status }) => {
  const iconMap = useMemo(
    () => ({
      loading: <Loader2 className="animate-spin text-black" size={20} />,
      success: <Check size={20} className="text-black" />,
      error: <X size={20} className="text-black" />,
    }),
    []
  )

  if (!iconMap[status]) return null

  return (
    <motion.div
      key={crypto.randomUUID()}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {iconMap[status]}
    </motion.div>
  )
}

const useButtonStatus = (resolveTo) => {
  const [status, setStatus] = useState("idle")

  const handleSubmit = useCallback(() => {
    setStatus("loading")
    setTimeout(() => {
      setStatus(resolveTo)
    }, 2000)
  }, [resolveTo])

  return { status, handleSubmit }
}

const SlideButton = forwardRef(
  ({ className, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [completed, setCompleted] = useState(false)
    const dragHandleRef = useRef(null)
    const { status, handleSubmit } = useButtonStatus("success")

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    )

    const handleDragStart = useCallback(() => {
      if (completed) return
      setIsDragging(true)
    }, [completed])

    const handleDragEnd = () => {
      if (completed) return
      setIsDragging(false)

      const progress = dragProgress.get()
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true)
        handleSubmit()
      } else {
        dragX.set(0)
      }
    }

    const handleDrag = (
      _event,
      info
    ) => {
      if (completed) return
      const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
      dragX.set(newX)
    }

    const adjustedWidth = useTransform(springX, (x) => x + 48) // start width to cover knob

    return (
      <motion.div
        animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
        transition={ANIMATION_CONFIG.spring}
        className="relative flex h-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden"
      >
        {!completed && (
          <>
            <motion.div
              style={{
                width: adjustedWidth,
              }}
              className="absolute inset-y-0 left-0 z-0 rounded-full bg-white/20 backdrop-blur-xl border-r border-white/10"
            />
            {/* Added "Explore" text in the track */}
            <span className="absolute z-0 font-medium text-white/80 pointer-events-none pl-6 transition-opacity duration-200">Explore</span>
          </>
        )}
        <AnimatePresence key={crypto.randomUUID()}>
          {!completed && (
            <motion.div
              ref={dragHandleRef}
              drag="x"
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              style={{ x: springX }}
              className="absolute left-1 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing"
            >
              <Button
                ref={ref}
                disabled={status === "loading"}
                {...props}
                size="icon"
                className={cn(
                  "shadow-lg rounded-full w-12 h-12 bg-white hover:bg-gray-100",
                  isDragging && "scale-105 transition-transform",
                  className
                )}
              >
                <SendHorizontal className="size-5 text-black" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence key={crypto.randomUUID()}>
          {completed && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                ref={ref}
                disabled={status === "loading"}
                {...props}
                className={cn(
                  "size-full rounded-full transition-all duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20",
                  className
                )}
              >
                <AnimatePresence key={crypto.randomUUID()} mode="wait">
                  <StatusIcon status={status} />
                </AnimatePresence>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
)

SlideButton.displayName = "SlideButton"

export default SlideButton
