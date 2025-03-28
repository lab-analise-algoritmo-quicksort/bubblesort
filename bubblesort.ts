import type { IComparable, ISharable, IValuable } from "@/types";

type BubbleSortResponse<EntryType> = {
  content: Array<EntryType>;
  results?: ISharable;
};

/**
 * Sorts an array of entries using the bubble sort algorithm.
 *
 * @param content - An array of entries to sort. Each entry must implement
 *                  both IValuable and IComparable interfaces.
 * @param share - A boolean indicating if sorting metadata should be included
 *                in the response. Defaults to true.
 * @returns An object containing the sorted array of entries and optional
 *          metadata (operations count and performance timing) if share is true.
 */
export function bubblesort<
  EntryType extends IValuable<EntryType["value"]> & IComparable<EntryType>
>(
  content: Array<EntryType>,
  share: boolean = true
): BubbleSortResponse<EntryType> {
  const results: ISharable | undefined = share
    ? {
        operations: 0,
        performanceTiming: Date.now(),
        contentLength: content.length,
      }
    : undefined;

  if (content.length === 1) return { content, results };

  let swapped: boolean;

  for (let operations = 0; operations < content.length - 1; operations++) {
    swapped = false;

    for (let item = 0; item < content.length - 1 - operations; item++) {
      if (item + 1 === content.length) continue;

      const compareCurrent = content[item].compareTo(content[item + 1]);

      if (results) {
        results.operations += 1;
      }

      if (compareCurrent > 0) {
        [content[item], content[item + 1]] = [content[item + 1], content[item]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  if (results) {
    results.performanceTiming = Date.now() - results.performanceTiming;
  }

  return { content, results };
}
