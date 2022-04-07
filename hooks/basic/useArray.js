import invariant from "invariant"
import { useMethods } from "./useMethods"

const arrayMethods = {
    push: (state, ...items) => state.concat(items),
    pop: (state) => state.slice(-1),
    slice: (state, start, end) => state.slice(start, end),
    empty: () => [],
    set: (_, newState) => newState,
    remove: (state, item) => {
        const index = state.indexOf(item)
        if (index < 0) return state
        return [...state.slice(0, index), ...state.slice(index + 1)]
    }
}

export const useArray = (initialValue) => {
    invariant(Array.isArray(initialValue), "initial value must be an array at the useArray hook.")
    return useMethods(initialValue, arrayMethods)
}