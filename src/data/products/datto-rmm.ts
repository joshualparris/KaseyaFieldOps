import type { AppModule, Scenario, Flashcard } from '../types';

export const module: AppModule = {
  id: 'datto-rmm',
  name: 'Datto RMM',
  description: 'Remote Monitoring and Management for endpoints.',
  iconName: 'MonitorDot',
  color: 'bg-blue-600',
  order: 1,
};

export const scenarios: Scenario[] = [
  {
    id: 'rmm-offline-endpoint',
    moduleId: 'datto-rmm',
    title: 'Offline Endpoint Triage',
    description: 'A client reports a critical laptop hasn\'t checked in for 6 days.',
    firstStepId: 'step-1',
    steps: {
      'step-1': {
        id: 'step-1',
        text: 'You receive a ticket: "Jane\'s laptop (LAPTOP-014) is offline and hasn\'t checked into Datto RMM in 6 days." What is your first investigative step?',
        options: [
          {
            id: 'opt-1-1',
            text: 'Reboot the device from the Datto RMM console.',
            isCorrect: false,
            feedback: 'The device is offline in RMM, so a remote reboot command will just queue and not execute until it checks in.',
            nextStepId: 'step-1',
          },
          {
            id: 'opt-1-2',
            text: 'Check the device details in Datto RMM for Last Check-In Time and Last Logged In User.',
            isCorrect: true,
            feedback: 'Correct. You need to gather facts first. Is it truly 6 days? Who was using it last?',
            nextStepId: 'step-2',
          },
          {
            id: 'opt-1-3',
            text: 'Call the user immediately to ask if it is plugged in.',
            isCorrect: false,
            feedback: 'While you may need to call them eventually, you should gather evidence silently first to not waste their time.',
            nextStepId: 'step-1',
          }
        ]
      },
      'step-2': {
        id: 'step-2',
        text: 'You see the last check-in was indeed 6 days ago. The last logged-in user was jsmith. What else should you check in the RMM console before reaching out?',
        options: [
          {
            id: 'opt-2-1',
            text: 'Check if there is an active Datto EDR alert for the device.',
            isCorrect: true,
            feedback: 'Good thinking. If EDR isolated the device, that would explain why it is offline in RMM.',
            nextStepId: 'step-3',
          },
          {
            id: 'opt-2-2',
            text: 'Delete the device from RMM and reinstall the agent via Group Policy.',
            isCorrect: false,
            feedback: 'Way too destructive. Deleting the device loses historical data and you don\'t even know if it\'s turned on.',
            nextStepId: 'step-2',
          }
        ]
      },
      'step-3': {
        id: 'step-3',
        text: 'You check Datto EDR, but there are no alerts. You contact Jane. She says she has been on vacation and left the laptop at home, turned off. What is your ticket note?',
        options: [
          {
            id: 'opt-3-1',
            text: 'Close ticket. User on vacation.',
            isCorrect: false,
            feedback: 'Too brief. A good tech notes the evidence gathered and the reason for the offline status.',
            nextStepId: 'step-3',
          },
          {
            id: 'opt-3-2',
            text: 'Investigated offline status for LAPTOP-014. Verified 6 days offline in RMM, no EDR isolations. Contacted user jsmith, who confirmed she is on vacation and device is powered off. No further action needed.',
            isCorrect: true,
            feedback: 'Excellent. You gathered evidence, formed a hypothesis, tested it with the user, and documented clearly.',
          }
        ]
      }
    }
  }
];

export const cards: Flashcard[] = [
  {
    id: 'fc-rmm-1',
    moduleId: 'datto-rmm',
    question: 'What is the primary purpose of Datto RMM?',
    answer: 'Remote Monitoring and Management: managing endpoints, running remote actions, patching, and monitoring device health proactively.',
  },
  {
    id: 'fc-rmm-2',
    moduleId: 'datto-rmm',
    question: 'Where would you look in Datto RMM to see if a device is online?',
    answer: 'The Device Summary page or the Devices list, looking for the green online indicator next to the hostname.',
  }
];
