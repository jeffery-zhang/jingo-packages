/**
 * Invokes callback every `delay` ms periodically
 * @param {() => void | Promise<void>} callback
 * @param {number} delay
 * @param {boolean} leading invoke callback immediately or not
 * @returns {[() => void, () => void]} [start, stop]
 */
export declare function useInterval(callback: () => void | Promise<void>, delay: number, leading?: boolean): [() => void, () => void];
