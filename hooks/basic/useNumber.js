import invariant from "invariant"
import { useMethods } from "./useMethods"

const numberMethods = {
    add: (state, value) => state + value,
    sub: (state, value) => state - value,
    set: (_, newValue) => newValue,
}

export const useNumber = (initialValue) => {
    invariant(typeof initialValue === 'number', "initial value must be a number at the useNumber hook.")
    return useMethods(initialValue, numberMethods)
}