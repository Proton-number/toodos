import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { TabsContent } from "./ui/tabs";
import React, { useEffect, useState, useRef } from "react";
import { Trash2, Pause, Play, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocalStorage } from "@uidotdev/usehooks";

interface FocusSectionProps {
  formatTime: () => string;
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export default function FocusSection({
  formatTime,
  isRunning,
  startTimer,
  pauseTimer,
  resetTimer,
}: FocusSectionProps) {
  return (
    <TabsContent value="Focus">
      <section
        className="relative overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #111827 60%, #0f172a 100%)",
          minHeight: "420px",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Ambient glow blob */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "320px",
            height: "320px",
            background: isRunning
              ? "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            transition: "background 1.2s ease",
            pointerEvents: "none",
          }}
        />

        {/* Subtle grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <div className="relative flex flex-col items-center justify-center gap-8 px-8 py-14">
          {/* Header */}
          <div className="text-center space-y-1">
            <p
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(99,102,241,0.8)",
              }}
            >
              Focus Session
            </p>
            <h2
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "13px",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.3)",
                fontStyle: "italic",
              }}
            >
              The world is quiet. You are here.
            </h2>
          </div>

          {/* Timer display */}
          <div
            style={{
              fontFamily: "'Courier New', 'Lucida Console', monospace",
              fontSize: "clamp(48px, 10vw, 80px)",
              fontWeight: "300",
              letterSpacing: "0.05em",
              color: isRunning
                ? "rgba(255,255,255,0.95)"
                : "rgba(255,255,255,0.45)",
              transition: "color 0.6s ease",
              textShadow: isRunning
                ? "0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.2)"
                : "none",
              lineHeight: 1,
            }}
          >
            {formatTime()}
          </div>

          {/* Thin divider */}
          <div
            style={{
              width: "40px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)",
            }}
          />

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Play button */}
            <button
              onClick={startTimer}
              disabled={isRunning}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: isRunning
                  ? "rgba(255,255,255,0.04)"
                  : "linear-gradient(135deg, #6366f1, #4f46e5)",
                border: "1px solid",
                borderColor: isRunning
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
                color: isRunning ? "rgba(255,255,255,0.2)" : "white",
                cursor: isRunning ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                boxShadow: isRunning
                  ? "none"
                  : "0 4px 20px rgba(99,102,241,0.4)",
              }}
            >
              <Play size={18} />
            </button>

            {/* Pause button */}
            <button
              onClick={pauseTimer}
              disabled={!isRunning}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: !isRunning
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.1)",
                border: "1px solid",
                borderColor: !isRunning
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.15)",
                color: !isRunning
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(255,255,255,0.85)",
                cursor: !isRunning ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Pause size={18} />
            </button>

            {/* Reset button */}
            <button
              onClick={resetTimer}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(255,255,255,0.08)";
              }}
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Status label */}
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: isRunning
                ? "rgba(99,102,241,0.7)"
                : "rgba(255,255,255,0.15)",
              transition: "color 0.6s ease",
            }}
          >
            {isRunning ? "● Running" : "Paused"}
          </p>
        </div>
      </section>
    </TabsContent>
  );
}
