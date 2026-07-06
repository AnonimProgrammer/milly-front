"use client";

import { useEffect, useRef } from "react";
import { CustomerTableWsClient } from "./customerTableWsClient";

export function useCustomerTableWs(tableId: string, onOrderEvent: () => void): void {
  const onOrderEventRef = useRef(onOrderEvent);

  useEffect(() => {
    onOrderEventRef.current = onOrderEvent;
  });

  useEffect(() => {
    const client = new CustomerTableWsClient({
      tableId,
      onOrderEvent: () => {
        onOrderEventRef.current();
      },
    });

    client.connect();

    return () => {
      client.disconnect();
    };
  }, [tableId]);
}
