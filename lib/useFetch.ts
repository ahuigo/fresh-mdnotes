import { useEffect, useRef, useState } from "preact/hooks";

interface Options<T> {
  initValue?: T;
  //// deno-lint-ignore ban-types
  onError?: (text: string) => void;
}

interface RequestOptions<T> extends RequestInit {
  initValue?: T;
  dataType?: "json" | "text";
  filterKey?: string;
  //// deno-lint-ignore ban-types
  onError?: (text: string) => void;
}

const defaultOptions = {
  dataType: "json",
  // deno-lint-ignore no-explicit-any
} as RequestOptions<any>;

export default function useFetch<T>(
  url: RequestInfo | URL,
  options: RequestOptions<T> = defaultOptions as RequestOptions<T>,
): [T, boolean] {
  const [state, setState] = useState<T>(
    options.initValue!,
  );
  const isLoadingRef = useRef(false);
  useEffect(() => {
    fetch(url, options).then(async (d) => {
      isLoadingRef.current = true;
      if (options.dataType === "text") {
        // deno-lint-ignore no-explicit-any
        const r = await d.text() as any;
        setState(r);
      } else {
        const r = await d.json();
        if (options.filterKey) {
          setState(r[options.filterKey] as T);
        } else {
          setState(r as T);
        }
      }
    }).catch(async (res) => {
      if (options.onError) options.onError(await res.text());
      else throw res;
    });
  }, []);
  return [state, isLoadingRef.current] as [T, boolean];
}
/*
export function usePromise<T, K extends keyof T>(
  factory: () => Promise<T>,
  options: Options<T[K]>,
  filterKey: K,
): [K extends keyof T ? T[K] : T, boolean];
export function usePromise<T>(
  factory: () => Promise<T>,
  options: Options<T>,
): [T, boolean];
*/

export function usePromise<T, K extends keyof T | undefined = undefined>(
  factory: () => Promise<T>,
  options: Options<K extends keyof T ? T[K] : T> = {},
  filterKey?: K,
): [K extends keyof T ? T[K] : T, boolean] {
  type R = K extends keyof T ? T[K] : T;
  const [state, setState] = useState<R>(
    options.initValue!,
  );

  const isLoadingRef = useRef(false);
  useEffect(() => {
    factory().then((r) => {
      if (filterKey) {
        // deno-lint-ignore no-explicit-any
        setState((r as any)[filterKey] as unknown as R);
      } else {
        setState(r as unknown as R);
      }
    }).catch((res) => {
      if (options.onError) options.onError(res);
      else throw res;
    });
  }, []);
  return [state, isLoadingRef.current] as [R, boolean];
}

export function usePromise2<
  T,
  K extends keyof T | undefined = undefined,
  R = K extends keyof T ? T[K] : T,
>(
  factory: () => Promise<T>,
  options: Options<R> = {},
  filterKey?: K,
): [R, boolean] {
  const [state, setState] = useState<R>(
    options.initValue!,
  );
  const isLoadingRef = useRef(false);
  useEffect(() => {
    factory().then((r) => {
      if (filterKey) {
        // deno-lint-ignore no-explicit-any
        setState((r as any)[filterKey] as unknown as R);
      } else {
        setState(r as unknown as R);
      }
    }).catch((res) => {
      if (options.onError) options.onError(res);
      else throw res;
    });
  }, []);
  return [state, isLoadingRef.current] as [R, boolean];
}

export function usePromise3<T>(
  factory: () => Promise<T>,
  options: Options<T> = {},
  deps: unknown[] = [],
): [T, boolean] {
  type R = T;
  const [state, setState] = useState<R>(
    options.initValue!,
  );
  const isLoadingRef = useRef(false);
  useEffect(() => {
    factory().then((r) => {
      setState(r as unknown as R);
    }).catch((res) => {
      if (options.onError) options.onError(res);
      else throw res;
    });
  }, deps);
  return [state, isLoadingRef.current] as [R, boolean];
}
