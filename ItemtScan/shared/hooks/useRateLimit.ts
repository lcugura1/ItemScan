import { useCallback, useState } from "react";

const MAX = 5;
const LOCKOUT = 15 * 60 * 1000; // 15 min

export function useRateLimit() {
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  const isLocked = lockedUntil != null && Date.now() < lockedUntil;
  const remaining = isLocked
    ? Math.ceil((lockedUntil! - Date.now()) / 1000)
    : 0;

  const recordFail = useCallback(() => {
    setAttempts((n) => {
      if (n + 1 >= MAX) {
        setLockedUntil(Date.now() + LOCKOUT);
        return 0;
      }
      return n + 1;
    });
  }, []);

  const reset = useCallback(() => {
    setAttempts(0);
    setLockedUntil(null);
  }, []);

  return { isLocked, remaining, attempts, recordFail, reset };
}
