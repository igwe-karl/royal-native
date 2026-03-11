import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/app/lib/firebase";
import type { IOffer } from "@/utils/types";

const OFFERS_PATH = "orderOffers";

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
        console.log(data, "data dey")

        if (!data || typeof data !== "object") {
          setOffers([]);
          return;
        }
        // Data shape: { [orderId]: { [offerId]: offerData } }
        const list: IOffer[] = [];
        for (const [orderId, orderOffers] of Object.entries(data)) {
          const offersMap = orderOffers as Record<string, Record<string, unknown>>;
          if (!offersMap || typeof offersMap !== "object") continue;
          for (const [offerId, v] of Object.entries(offersMap)) {
            const offer = v as Record<string, unknown>;
            list.push({
              ...offer,
              offerId: (offer.offerId as string) ?? offerId,
              order_id: (offer.orderId as string) ?? orderId,
              amount: (typeof offer.amount === "number" || typeof offer.amount === "string" ? offer.amount : 0) as IOffer["amount"],
              id: offerId,
            } as IOffer);
          }
        }
        setOffers(list);
      },
      (err) => {
        setLoading(false);
        setError(err?.message ?? "Failed to load offers");
        setOffers([]);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return { offers, loading, error };
}
