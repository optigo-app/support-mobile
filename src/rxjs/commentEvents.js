import { Subject } from 'rxjs';

// RxJS Subject for real-time comment updates across support-mobile
export const commentUpdates$ = new Subject();

// Real-time external status changes keyed by call log ID.
export const externalStatusUpdates$ = new Subject();

