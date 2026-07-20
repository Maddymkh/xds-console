export const SessionStatus = {
  ASSIGNED: "assigned",

  MOTION_REVEALED: "motion_revealed",

  PREPARING: "preparing",

  READY_FOR_SPEECH: "ready_for_speech",

  SPEAKING: "speaking",

  SPEECH_EVALUATION: "speech_evaluation",

  INTERVIEW: "interview",

  INTERVIEW_EVALUATION: "interview_evaluation",

  VERTICAL: "vertical",

  VERTICAL_EVALUATION: "vertical_evaluation",

  GENERAL_REMARKS: "general_remarks",

  COMPLETED: "completed",
} as const;
  
  export type SessionStatus =
    (typeof SessionStatus)[keyof typeof SessionStatus];