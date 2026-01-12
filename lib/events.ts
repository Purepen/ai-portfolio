// lib/events.ts
export const dispatchSkillQuestion = (skill: string) => {
  window.dispatchEvent(
    new CustomEvent('skill-question', {
      detail: `When in your projects have you used ${skill}?`
    })
  );
};

