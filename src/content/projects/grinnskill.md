---
title: GrinnSkill
tagline: A student skill-exchange web application for the Grinnell College community.
stack: Java, Spring Boot, JPA, H2, React, TypeScript
repo: TODO
---

GrinnSkill is a student skill-exchange web application built as the team project for CSC 324: Software Development at Grinnell College. This case study focuses on the parts of the project I contributed to.

![GrinnSkill overview screenshot](TODO)

## My Contributions

GrinnSkill was a team effort, and I worked alongside my teammates on several parts of the application. My main contributions were:

- **User and database foundations.** I worked on the user and database foundations that other features of the application build on.
- **Grinnell-only login and email verification.** I contributed to restricting login to Grinnell College users and to six-digit email verification, with verification codes sent using Resend.
- **Offer and exchange workflows.** I worked on the workflows for making offers and carrying out exchanges, including private chat between the students involved and the confirmation steps for completing or cancelling an exchange.
- **Design and illustration.** I created hand-drawn illustrations for the skill categories and contributed to the prototype design.

The sections below go into more detail on each of these areas.

## Motivation

TODO: Describe the problem GrinnSkill addresses and why the team chose it. Use the team's own project proposal or problem statement as the source.

## Needfinding

TODO: Summarize how the team learned about student needs (methods used, who was involved, and what was learned). Only include findings that are documented in the team's records.

- TODO: Link to needfinding notes or artifacts.
- TODO: Key insights, quoted or paraphrased from documented sources.

## Prototype

I created hand-drawn category designs and prototypes for GrinnSkill.

![Hand-drawn category design sketches](TODO)

![Prototype screens](TODO)

- TODO: Describe what the prototypes explored and how they were used by the team.
- TODO: Note any changes made between the prototype and the implemented application.
- [Prototype files or scans](TODO)

## Architecture

GrinnSkill uses a Java Spring Boot backend with JPA for persistence and an H2 database, and a React + TypeScript frontend.

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript |
| Backend | Java, Spring Boot |
| Persistence | JPA, H2 |
| Email delivery (verification codes) | Resend |

![Architecture diagram](TODO)

TODO: Describe how the frontend and backend communicate and how the main domain entities relate to each other.

## Implementation

My contributions to the implementation:

### User and database foundations

I contributed to the user and database foundations of the application.

- TODO: Describe the specific entities, repositories, or schema work.
- [Related commits or pull requests](TODO)

### Grinnell-only login

I contributed to restricting login to Grinnell College users.

- TODO: Describe how the restriction works.
- [Related commits or pull requests](TODO)

### Six-digit email verification with Resend

I contributed to six-digit email verification, with codes sent using Resend.

![Email verification screen](TODO)

- TODO: Describe the verification flow.
- [Related commits or pull requests](TODO)

### Offer workflows

I contributed to the offer workflows.

![Offer workflow screen](TODO)

- TODO: Describe the workflow steps and states.
- [Related commits or pull requests](TODO)

### Private chat

I contributed to private chat.

![Private chat screen](TODO)

- TODO: Describe the chat feature.
- [Related commits or pull requests](TODO)

### Exchange completion and cancellation

I contributed to completing and cancelling exchanges.

- TODO: Describe the completion and cancellation behavior.
- [Related commits or pull requests](TODO)

### Unread notifications

I contributed to unread notifications.

![Unread notifications UI](TODO)

- TODO: Describe how unread notifications are tracked and shown.
- [Related commits or pull requests](TODO)

## Testing

TODO: Describe how the features above were tested (unit tests, integration tests, manual testing, code review). Do not include results that are not recorded.

- TODO: Link to test files or test runs.
- [Test-related commits or pull requests](TODO)

## Future Work

TODO: List planned or possible next steps for GrinnSkill, based on the team's backlog or retrospective.
