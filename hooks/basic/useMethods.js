import { useState, useMemo } from 'react'

export const useMethods = (initialValue, methods) => {
    const [value, setValue] = useState(initialValue)
    const boundMethods = useMemo(() => Object.entries(methods).reduce((methods, [name, fn]) => (
        methods[name] = (...args) => setValue(state => fn(state, ...args)), methods
    ), {}), [methods])

    return [value, boundMethods]
}