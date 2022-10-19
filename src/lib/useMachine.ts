import { onDestroy } from "svelte";
import { readable } from "svelte/store";
import { interpret, State, type AnyStateMachine } from "xstate";

/**
 * Xstate's useMachine from '@xstate/svelte' but re-implemented to understand what it does. Available under the MIT license from [XState's repository](https://github.com/statelyai/xstate/tree/main/packages/xstate-svelte).
 * @param machine - An XState machine
 * @param options - The options object for the machine
 */
export function useMachine(machine: AnyStateMachine, options?: any) {
  const {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
    state: rehydratedState,
    ...interpreterOptions
  } = options;

  const machineConfig = {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
  };

  const resolvedMachine = machine.withConfig(machineConfig, () => ({
    ...machine.context,
    ...context,
  }));

  const service = interpret(resolvedMachine, interpreterOptions).start(
    rehydratedState ? new State(rehydratedState) : undefined
  );

  onDestroy(() => service.stop());

  const store = readable(service.initialState, (set) => {
    return service.subscribe((state) => {
      if (state.changed) {
        set(state);
      }
    }).unsubscribe;
  });

  return { state: store, send: service.send, service };
}
