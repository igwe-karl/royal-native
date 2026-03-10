import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "@/app/lib/firebase";
import type { IOffer } from "@/utils/types";

const OFFERS_PATH = "offers";

export function useOffers() {
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const offersRef = ref(database, OFFERS_PATH);
    const unsubscribe = onValue(
      offersRef,
      (snapshot) => {
        setLoading(false);
        setError(null);
        const data = snapshot.val();
        if (!data || typeof data !== "object") {
          setOffers([]);
          return;
        }
        const list: IOffer[] = Object.entries(data).map(([id, value]) => ({
          ...(value as Record<string, unknown>),
          id,
        })) as IOffer[];
        setOffers(list);
      },
      (err) => {
        setLoading(false);
        setError(err?.message ?? "Failed to load offers");
        setOffers([]);
      }
    );
    return () => {
      off(offersRef);
    };
  }, []);

  return { offers, loading, error };
}
