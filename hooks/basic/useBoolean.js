import invariant from "invariant"
import { useMethods } from "./useMethods"

const booleanMethods = {
    set: (_, newValue) => newValue,
    setTrue: () => true,
    setFalse: () => false,
    toggle: (state) => !state
}

export const useBoolean = (initialValue) => {
    invariant(typeof initialValue === 'boolean', "initial value must be a boolean at the useBoolean hook.")
    return useMethods(initialValue, booleanMethods)
}